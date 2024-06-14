import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import useEntryStore from "../../store/entry/entryStore";
import { EntryType } from "../../../common/types";
import { callFetchEntryById } from "../../api/entry/callFetchEntryById";
import BackButton from "../atoms/buttons/BackButton";
import { EntryCard } from "../molecules/entry/EntryCard";
import { convertDateToString } from "../../../common/modules/date/convertDateToString";
import { TagSelectionModal } from "../organisms/entry/TagSelectionModal";

export default function EntryPage() {
  const { entryId } = useParams();
  // stores
  const entryStore = useEntryStore();
  // local state
  const [entry, setEntry] = useState<EntryType | null>(null);
  // refs
  const scrollerRef = useRef<HTMLDivElement>(null);

  /**
   * Loader
   */

  async function fetchEntry(_entryId: string) {
    // fetch entry
    const response = await callFetchEntryById({
      id: _entryId,
    });
    // set entry
    if (response.error) {
      console.error(response.error);
    } else {
      setEntry(response.data.entry);
    }
  }

  /**
   * On Change Entry
   */

  const saveToServer = (id: string, body: string, date: string) => {
    entryStore.updateEntry(id, body, date);
  };

  const onChangeEntry = (id: string, body: string, date: string) => {
    entryStore.applyChangeLocalEntry(id, body, date);

    if (entry !== null) {
      setEntry({
        ...entry,
        body: body,
        date: date,
      });
    }
  };
  const onPublishEntry = (id: string, body: string, date: string) => {
    const dateToApply = date ? date : convertDateToString(new Date());
    entryStore.publishEntry(id, body, dateToApply);

    if (entry !== null) {
      setEntry({
        ...entry,
        draft: false,
        body: body,
        date: dateToApply,
      });
    }
  };
  const onDraftEntry = (id: string) => {
    entryStore.draftEntry(id);

    if (entry !== null) {
      setEntry({
        ...entry,
        draft: true,
      });
    }
  };
  const onDeleteEntry = (id: string) => {
    entryStore.deleteEntry(id);
    closeWindow();
  };

  const onTogglePin = (id: string, pinned: boolean) => {
    entryStore.togglePin(id, pinned);

    if (entry !== null) {
      setEntry({
        ...entry,
        pinned,
      });
    }
  };

  /**
   * User Actions
   */

  function closeWindow() {
    // close this window
    window.close();
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      closeWindow();
    }
  }

  /**
   * Effects
   */

  useEffect(() => {
    if (!entryId) return;
    const entry = entryStore.entries.find((entry) => entry.id === entryId);
    if (entry) {
      setEntry(entry);
    } else {
      fetchEntry(entryId);
    }
  }, [entryId]);

  useEffect(() => {
    window.addEventListener("keydown", onKeydown);

    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [null]);

  /**
   * Render
   */

  if (entry === null) return <div>Loading...</div>;

  return (
    <div className="fixed top-0 left-0 w-full h-[100vh] bg-back flex flex-col justify-stretch">
      <div className="container-full h-12 lg:h-16 flex items-center shrink-0">
        <BackButton onClick={closeWindow} label="Close" />
      </div>
      <div className="container-tiny w-full grow overflow-hidden">
        <div className="h-full relative w-full">
          <div
            className="h-full overflow-y-scroll no-scrollbar pb-10"
            ref={scrollerRef}
          >
            <EntryCard
              id={entry.id}
              date={entry.date}
              body={entry.body}
              draft={entry.draft}
              pinned={entry.pinned}
              isUnsaved={entryStore.unsavedEntryId === entry.id}
              onChangeEntry={onChangeEntry}
              onPublishEntry={onPublishEntry}
              onDraftEntry={onDraftEntry}
              onDeleteEntry={onDeleteEntry}
              onTogglePin={onTogglePin}
              saveToServer={saveToServer}
              withDate={true}
            />
          </div>
          <TagSelectionModal />
        </div>
      </div>
    </div>
  );
}
