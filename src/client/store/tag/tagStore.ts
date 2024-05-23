import { v4 } from "uuid";
import { create } from "zustand";

import { TagType } from "../../../common/types/tag.types";
import { callFetchAllTags } from "../../api/tag/callFetchAllTags";
import { callCreateTag } from "../../api/tag/callCreateTag";
import { CONS_TAG_COLOR_LIST } from "../../../common/constants/tag.cons";
import { extractTagsFromBody } from "../../../common/modules/tag/extractTagsFromBody";
import { callUpdateTag } from "../../api/tag/callUpdateTag";
import { callDeleteTag } from "../../api/tag/callDeleteTag";
import useEntryStore from "../entry/entryStore";
import { callCombineTags } from "../../api/tag/callCombineTags";
import useReportStore from "../report/reportStore";

const useTagStore = create<{
  // data
  tags: TagType[];
  // api states
  loading: boolean;
  error: string | null;
  tagLoaded: boolean;
  // data loader
  fetchAllTags: () => Promise<void>;
  createTagsFromBody: (body: string) => Promise<void>;
  createTag: (text: string, color: string) => Promise<void>;
  updateTag: (id: string, newText: string, newColor: string) => Promise<void>;
  deleteTag: (id: string) => Promise<void>;
  combineTags: (id: string, oldText: string, newText: string) => void;
}>((set, get) => ({
  // data
  tags: [],
  // api states
  loading: false,
  error: null,
  tagLoaded: false,
  // data loader
  fetchAllTags: async () => {
    set({ loading: true, error: null });
    const response = await callFetchAllTags({});
    if (response.error) {
      set({ loading: false, error: response.error.message, tagLoaded: false });
    } else {
      set({ loading: false, tags: response.data.tags, tagLoaded: true });
    }
  },
  createTagsFromBody: async (body: string) => {
    const newTags: TagType[] = getOnlyNewTags(body, get().tags);

    // update local state
    set({ tags: [...get().tags, ...newTags] });

    // create tags on server
    newTags.forEach((tag) => {
      callCreateTag({
        id: tag.id,
        text: tag.text,
        color: tag.color,
      });
    });

    // report need to be refreshed
    useReportStore.getState().changeNeedRefresh(true);
  },
  createTag: async (text: string, color: string) => {
    // update local state
    const newTag: TagType = {
      id: v4(),
      text,
      color,
    };
    set({
      tags: [...get().tags, newTag],
    });

    // create tag on server
    await callCreateTag({
      id: newTag.id,
      text: newTag.text,
      color: newTag.color,
    });

    // report need to be refreshed
    useReportStore.getState().changeNeedRefresh(true);
  },
  updateTag: async (id: string, newText: string, newColor: string) => {
    // get old text
    const oldText = get().tags.find((tag) => tag.id === id)?.text;
    if (!oldText) return;

    // update local state
    const newTags = get().tags.map((tag) => {
      if (tag.id !== id) return tag;
      return { ...tag, text: newText, color: newColor };
    });
    set({
      tags: newTags,
    });

    // call updateTagInEntries in entryStore
    useEntryStore.getState().updateTagInEntries(oldText, newText);
    // update tag on server
    await callUpdateTag({ id, newText, newColor });

    // report need to be refreshed
    useReportStore.getState().changeNeedRefresh(true);
  },
  deleteTag: async (id: string) => {
    // update local state
    set({
      tags: get().tags.filter((tag) => tag.id !== id),
    });

    // delete tag on server
    await callDeleteTag({ id });

    // report need to be refreshed
    useReportStore.getState().changeNeedRefresh(true);
  },
  combineTags: async (id: string, oldText: string, newText: string) => {
    // update tags locally
    const newTags = get().tags.filter((tag) => tag.id !== id);
    set({
      tags: newTags,
    });

    // update entries locally
    useEntryStore.getState().updateTagInEntries(oldText, newText);

    // combine tags on server
    await callCombineTags({ id, newText });

    // report need to be refreshed
    useReportStore.getState().changeNeedRefresh(true);
  },
}));

export default useTagStore;

/**
 * Helper functions
 */

function getOnlyNewTags(body: string, tags: TagType[]): TagType[] {
  const newTags = extractTagsFromBody(body).filter(
    (tag) => !tags.map((tag) => tag.text).includes(tag)
  );

  const nextTagColors = getNextTagColors(tags, newTags.length);

  return newTags.map((text, index) => {
    return {
      id: v4(),
      text,
      color: nextTagColors[index],
    };
  });
}

function getNextTagColors(usedTags: TagType[], howMany: number): string[] {
  const usedColors = usedTags.map((tag) => tag.color);

  const tagColorMap: { color: string; count: number }[] = [];

  // count used colors
  CONS_TAG_COLOR_LIST.forEach((color) => {
    const count = usedColors.filter((usedColor) => usedColor === color).length;
    tagColorMap.push({ color, count });
  });

  // sort from least used to most used
  tagColorMap.sort((a, b) => a.count - b.count);

  // get colors
  const nextColors: string[] = [];
  for (let i = 0; i < howMany; i++) {
    const cappedIndex = i % tagColorMap.length;
    nextColors.push(tagColorMap[cappedIndex].color);
  }

  return nextColors;
}
