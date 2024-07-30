import { convertDateToString } from "../../../../common/modules/date/convertDateToString";
import useEntryStore from "../../../store/entry/entryStore";
import { EntryCard } from "../../molecules/entry/EntryCard";

export function PinnedEntriesSection() {
  // stores
  const entryStore = useEntryStore();
  // data
  const pinnedEntries = entryStore.defaultEntries.filter(
    (entry) => entry.pinned && !entry.draft
  );

  // event handlers

  const saveToServer = (id: string, body: string, date: string) => {
    entryStore.updateEntry(id, body, date);
  };

  const onDraftEntry = (id: string) => {
    entryStore.draftEntry(id);
  };

  const onTogglePin = (id: string, pinned: boolean) => {
    entryStore.togglePin(id, pinned);
  };

  // on change entry
  const onChangeEntry = (id: string, body: string, date: string) => {
    entryStore.applyChangeLocalEntry(id, body, date);
  };

  const onDeleteEntry = (id: string) => {
    entryStore.deleteEntry(id);
  };

  return (
    <div className="h-full flex flex-col justify-stretch relative">
      <div className="font-serif font-bold text-foreSecondary mb-5">
        📍 Pinned
      </div>
      <div className="flex flex-col gap-5 overflow-y-scroll pb-10 no-scrollbar">
        {pinnedEntries.map((entry) => {
          return (
            <div key={entry.id} className="">
              <EntryCard
                id={entry.id}
                date={entry.date}
                body={entry.body}
                draft={entry.draft}
                pinned={entry.pinned}
                onChangeEntry={onChangeEntry}
                onPublishEntry={() => {}}
                onDraftEntry={onDraftEntry}
                onDeleteEntry={onDeleteEntry}
                onTogglePin={onTogglePin}
                saveToServer={saveToServer}
                isUnsaved={entryStore.unsavedEntryId === entry.id}
                smallWindow={true}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
