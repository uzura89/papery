import { create } from "zustand";
import { v4 } from "uuid";

import { callCreateEntry } from "../../api/entry/callCreateEntry";
import { callUpdateEntry } from "../../api/entry/callUpdateEntry";
import { callPublishEntry } from "../../api/entry/callPublishEntry";
import { callFetchRecentEntries } from "../../api/entry/callFetchRecentEntries";
import { callDraftEntry } from "../../api/entry/callDraftEntry";
import { callDeleteEntry } from "../../api/entry/callDeleteEntry";
import { callTogglePinOfEntry } from "../../api/entry/callTogglePinOfEntry";
import useEntryHistoryStore from "./entryHistoryStore";
import { callFetchEntriesByText } from "../../api/entry/callFetchEntriesByText";
import useTagStore from "../tag/tagStore";
import { extractPrimaryEmoji } from "../../../common/modules/emoji/extractPrimaryEmoji";
import EventTracker from "../../modules/analytics/EventTracker";
import { EntryType } from "../../../common/types/entry.types";
import useEntrySearchStore from "./entrySearchStore";
import { CONS_ERROR_CODE_FORBIDDEN } from "../../../common/constants/api.cons";
import useReportStore from "../report/reportStore";
import useUiStore from "../ui/uiStore";
import { CONS_MODAL_UPGRADE } from "../../../common/constants";
import { set } from "mongoose";

const useEntryStore = create<{
  loading: boolean;
  error: string | null;
  unsavedEntryId: string | null;
  // fetch recent entries
  entries: EntryType[];
  defaultEntries: EntryType[];
  fetchRecentEntries: () => void;
  fetchEntriesBySearchText: (text?: string) => void;
  // local update
  applyChangeLocalEntry: (tempId: string, body: string, date: string) => void;
  reorderEntries: () => void;
  // server update
  createEntry: (body: string, date: string) => void;
  updateEntry: (id: string, body: string, date: string) => Promise<void>;
  togglePin: (id: string, pinned: boolean) => Promise<void>;
  publishEntry: (id: string, body: string, date: string) => Promise<void>;
  draftEntry: (id: string) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  // on tag change
  updateTagInEntries: (tagId: string, newText: string) => void;
  syncToServerEntries: () => void;
}>((set, get) => ({
  loading: false,
  error: null,
  unsavedEntryId: null,
  entries: [],
  fetchRecentEntries: async () => {
    set({ loading: true, error: null });

    // fetch recent entries
    const response = await callFetchRecentEntries({});

    if (response.error) {
      set({ loading: false, error: response.error.message });
    } else {
      // add entries to local state
      const entries = response.data.entries.map((entry, index) => {
        return {
          id: entry.id,
          date: entry.date,
          body: entry.body,
          draft: entry.draft,
          pinned: entry.pinned,
          changedTS: Date.now(),
        };
      });

      set({ loading: false, entries, defaultEntries: entries });
    }
  },
  defaultEntries: [],
  fetchEntriesBySearchText: async (text?: string) => {
    const searchText = text || useEntrySearchStore.getState().searchText;

    if (searchText.trim() === "") {
      set({ entries: get().defaultEntries, loading: false });
      useEntryHistoryStore.getState().refreshEntryHistories();
      return;
    }

    // fetch entry histories too
    set({ loading: true, error: null });

    // fetch recent entries
    const response = await callFetchEntriesByText({ text: searchText });

    if (response.error) {
      set({ loading: false, error: response.error.message });
    } else {
      // add entries to local state
      const entries = response.data.entries.map((entry, index) => {
        return {
          id: entry.id,
          date: entry.date,
          body: entry.body,
          draft: entry.draft,
          pinned: entry.pinned,
          changedTS: Date.now(),
        };
      });
      set({
        loading: false,
        entries,
      });
    }
    useEntryHistoryStore.getState().refreshEntryHistories();
  },
  createEntry: async (body: string, date: string) => {
    // add new entry to local state
    const id = v4();
    const newEntry = {
      id,
      date,
      body,
      draft: true,
      pinned: false,
      changedTS: Date.now(),
    };
    const entries = [newEntry, ...get().entries];
    const defaultEntries = [newEntry, ...get().defaultEntries];
    set({ entries, defaultEntries });

    // call create entry API
    const response = await callCreateEntry({ body, date, id });

    // handle response
    if (response.error) {
      set({ loading: false, error: response.error.message });
    }

    // report need to be refreshed
    useReportStore.getState().changeNeedRefresh(true);
  },
  applyChangeLocalEntry: (id: string, body: string, date: string) => {
    // update updatingEntryId
    set({ unsavedEntryId: id });

    // update local state (entries)
    const entries = get().entries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, body, date, changedTS: Date.now() };
      }
      return entry;
    });

    // update local state (defaultEntries)
    const defaultEntries = get().defaultEntries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, body, date, changedTS: Date.now() };
      }
      return entry;
    });

    set({ entries, defaultEntries });
  },
  updateEntry: async (id: string, body: string, date: string) => {
    if (!id) return;

    set({ unsavedEntryId: null });

    // call update entry API
    const response = await callUpdateEntry({ id, body, date });
    if (response.error) {
      if (response.error.code === CONS_ERROR_CODE_FORBIDDEN) return;
      set({ error: response.error.message });
      set({ unsavedEntryId: id });
      window.alert(response.error.message);
    }
  },
  togglePin: async (id: string, pinned: boolean) => {
    if (!id) return;

    // update local state (entries)
    const entries = get().entries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, pinned, changedTS: Date.now() };
      }
      return entry;
    });

    // update local state (defaultEntries)
    const defaultEntries = get().defaultEntries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, pinned, changedTS: Date.now() };
      }
      return entry;
    });

    set({ entries, defaultEntries });

    // call toggle pin API
    const response = await callTogglePinOfEntry({ id, pinned });
    if (response.error) {
      set({ error: response.error.message });
    }

    // reorder entries
    get().reorderEntries();

    // report need to be refreshed
    useReportStore.getState().changeNeedRefresh(true);
  },
  publishEntry: async (id: string, body: string, date: string) => {
    if (!id) return;

    // update draft state locally (entries)
    const entries = get().entries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, draft: false, date, changedTS: Date.now() };
      }
      return entry;
    });
    // update draft state locally (defaultEntries)
    const defaultEntries = get().defaultEntries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, draft: false, date, changedTS: Date.now() };
      }
      return entry;
    });
    set({ entries, defaultEntries });

    // create tags if needed
    await useTagStore.getState().createTagsFromBody(body);

    // call publish entry API
    const response = await callPublishEntry({ id, body, date });
    // handle response
    if (response.error) {
      set({ error: response.error.message });

      // update draft state locally (entries)
      const entries = get().entries.map((entry) => {
        if (entry.id === id) {
          return { ...entry, draft: true, changedTS: Date.now() };
        }
        return entry;
      });
      // update draft state locally (defaultEntries)
      const defaultEntries = get().defaultEntries.map((entry) => {
        if (entry.id === id) {
          return { ...entry, draft: true, changedTS: Date.now() };
        }
        return entry;
      });
      set({ entries, defaultEntries });

      const answer = window.confirm(response.error.message);
      if (answer) {
        useUiStore.getState().setVisibleModal(CONS_MODAL_UPGRADE);
      }

      return;
    }

    // reorder entries
    get().reorderEntries();

    // fetch refreshEntryHistories
    useEntryHistoryStore.getState().refreshEntryHistories();

    // check if emoji is used
    const emoji = extractPrimaryEmoji(body);
    if (emoji) {
      EventTracker.addEmoji();
    }

    // report need to be refreshed
    useReportStore.getState().changeNeedRefresh(true);
  },
  draftEntry: async (id: string) => {
    if (!id) return;

    // update draft state locally (entries)
    const entries = get().entries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, draft: true, changedTS: Date.now() };
      }
      return entry;
    });
    // update draft state locally (defaultEntries)
    const defaultEntries = get().defaultEntries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, draft: true, changedTS: Date.now() };
      }
      return entry;
    });
    set({ entries, defaultEntries });

    // call publish entry API
    const response = await callDraftEntry({ id });
    if (response.error) {
      set({ error: response.error.message });
    }

    // report need to be refreshed
    useReportStore.getState().changeNeedRefresh(true);
  },
  deleteEntry: async (id: string) => {
    if (!id) return;

    // remove entry from local state (entries)
    const entries = get().entries.filter((entry) => entry.id !== id);
    // remove entry from local state (defaultEntries)
    const defaultEntries = get().defaultEntries.filter(
      (entry) => entry.id !== id
    );
    set({ entries, defaultEntries });

    // call delete entry API
    const response = await callDeleteEntry({ id });
    if (response.error) {
      set({ error: response.error.message });
    }

    // refresh entry histories
    useEntryHistoryStore.getState().refreshEntryHistories();

    // report need to be refreshed
    useReportStore.getState().changeNeedRefresh(true);
  },
  reorderEntries: () => {
    const entries = sortEntries(get().entries);
    const defaultEntries = sortEntries(get().defaultEntries);

    set({ entries, defaultEntries });
  },
  updateTagInEntries: (oldText: string, newText: string) => {
    // update local state (entries)
    const entries = get().entries.map((entry) => {
      const newBody = entry.body.replace(`#${oldText}`, `#${newText}`);
      return { ...entry, body: newBody };
    });
    // update local state (defaultEntries)
    const defaultEntries = get().defaultEntries.map((entry) => {
      const newBody = entry.body.replace(`#${oldText}`, `#${newText}`);
      return { ...entry, body: newBody };
    });
    set({ entries, defaultEntries });

    // report need to be refreshed
    useReportStore.getState().changeNeedRefresh(true);
  },
  syncToServerEntries: async () => {
    const searchText = useEntrySearchStore.getState().searchText;
    const isSearchTextEmpty = searchText.trim() === "";

    if (!isSearchTextEmpty) {
      // fetch recent entries
      const response = await callFetchEntriesByText({ text: searchText });

      if (response.error) {
        set({ loading: false, error: response.error.message });
      } else {
        // add entries to local state
        const entries = response.data.entries.map((entry, index) => {
          return {
            id: entry.id,
            date: entry.date,
            body: entry.body,
            draft: entry.draft,
            pinned: entry.pinned,
            changedTS: Date.now(),
          };
        });
        set({
          loading: false,
          entries,
        });
      }
    }

    // fetch recent entries
    const response = await callFetchRecentEntries({});

    if (response.error) {
      set({ loading: false, error: response.error.message });
    } else {
      // add entries to local state
      const entries = response.data.entries.map((entry, index) => {
        return {
          id: entry.id,
          date: entry.date,
          body: entry.body,
          draft: entry.draft,
          pinned: entry.pinned,
          changedTS: Date.now(),
        };
      });

      if (isSearchTextEmpty) {
        set({ entries, defaultEntries: entries });
      } else {
        set({ defaultEntries: entries });
      }
    }
  },
}));

export default useEntryStore;

/**
 * Helper Functions
 */

function sortEntries(entries: EntryType[]) {
  const draftEntries = entries.filter((entry) => entry.draft);
  const pinnedEntries = entries.filter((entry) => entry.pinned && !entry.draft);
  const publishedEntries = entries.filter(
    (entry) => !entry.draft && !entry.pinned
  );

  draftEntries.sort((a, b) => b.date.localeCompare(a.date));
  pinnedEntries.sort((a, b) => b.date.localeCompare(a.date));
  publishedEntries.sort((a, b) => b.date.localeCompare(a.date));

  const sortedEntries = [
    ...draftEntries,
    ...pinnedEntries,
    ...publishedEntries,
  ];

  return sortedEntries;
}
