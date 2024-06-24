import { useRef } from "react";

import { calcDateDiffs } from "../../../../common/modules/date/calcDateDiffs";
import { convertDateToDayOfWeek } from "../../../../common/modules/date/convertDateToDayOfWeek";
import { convertDateToReadableString } from "../../../../common/modules/date/convertDateToReadableString";
import { convertDateToString } from "../../../../common/modules/date/convertDateToString";
import useEntryStore from "../../../store/entry/entryStore";
import { EntryCard } from "../../molecules/entry/EntryCard";
import { EntryType } from "../../../../common/types/entry.types";
import { convertDateStringToLocalDate } from "../../../../common/modules/date/convertDateStringToLocalDate";

export function Entries() {
  // store
  const entryStore = useEntryStore();
  // refs
  const prevHeaderLabelId = useRef<string>("");
  prevHeaderLabelId.current = "";
  const prevHeaderYear = useRef<string>("");
  prevHeaderYear.current = "";
  const prevDate = useRef<string>("");
  prevDate.current = "";
  const prevEntry = useRef<EntryType | null>(null);
  prevEntry.current = null;

  const saveToServer = (id: string, body: string, date: string) => {
    entryStore.updateEntry(id, body, date);
  };

  /**
   * Event Handlers
   */

  // on change entry
  const onChangeEntry = (id: string, body: string, date: string) => {
    entryStore.applyChangeLocalEntry(id, body, date);
  };
  const onPublishEntry = (id: string, body: string, date: string) => {
    const dateToApply = date ? date : convertDateToString(new Date());
    entryStore.publishEntry(id, body, dateToApply);
  };
  const onDraftEntry = (id: string) => {
    entryStore.draftEntry(id);
  };
  const onDeleteEntry = (id: string) => {
    entryStore.deleteEntry(id);
  };
  const onTogglePin = (id: string, pinned: boolean) => {
    entryStore.togglePin(id, pinned);
  };

  const renderDateIndicator = (dateDiff: number) => {
    if (dateDiff === 0) {
      return (
        <div className="shrink-0 h-[8px] w-[8px] rounded-full bg-[#d05632d6] inline-block mr-[7px]" />
      );
    }
    if (dateDiff === 1) {
      return (
        <div className="shrink-0 h-[8px] w-[8px] rounded-full bg-foreLighter inline-block mr-[7px]" />
      );
    }
    return null;
  };

  const getHeaderLabel = (draft: boolean, date: string, pinned: boolean) => {
    if (draft) return { id: "draft", jsx: null, year: "" };
    if (pinned) return { id: "pinned", jsx: <span>📍 Pinned</span>, year: "" };

    const { monthDay, year } = convertDateToReadableString(
      convertDateStringToLocalDate(date)
    );
    const dateDiff = calcDateDiffs(new Date(), new Date(date));

    return {
      id: monthDay,
      year,
      jsx: (
        <div className="flex items-center">
          <span className="inline-flex items-center">
            {renderDateIndicator(dateDiff)}
            {monthDay}
          </span>
          {/* <span className="text-xs ml-2">{year}</span> */}
          <span className="text-xs ml-2">
            ({convertDateToDayOfWeek(new Date(date))})
          </span>
        </div>
      ),
    };
  };

  /**
   * Render
   */

  const renderDateHeader = (draft: boolean, date: string, pinned: boolean) => {
    const headerLabel = getHeaderLabel(draft, date, pinned);

    if (headerLabel.id === prevHeaderLabelId.current) return null;

    prevHeaderLabelId.current = headerLabel.id;

    const isNewYear = prevHeaderYear.current !== headerLabel.year;

    prevHeaderYear.current = headerLabel.year;

    return (
      <div className="text-lg mb-4 text-foreSecondary font-serif font-bold">
        {isNewYear && (
          <div className="text-sm mt-2 pb-2 pt-4 border-t border-border">
            {headerLabel.year}
          </div>
        )}

        {headerLabel.jsx}
      </div>
    );
  };

  const renderDateDiff = (thisEntry: EntryType) => {
    // calculate diff and update prevEntry
    const diffDays = getDateDiff(prevEntry.current, thisEntry);
    prevEntry.current = thisEntry;

    // return
    if (diffDays <= 1) return null;

    return (
      <div className="text-xs text-foreLighter my-0.5 text-center">
        ({diffDays} days)
      </div>
    );
  };

  function getDateDiff(_prevEntry: EntryType | null, _thisEntry: EntryType) {
    if (_prevEntry === null) return 0;
    if (_prevEntry.draft || _prevEntry.pinned) return 0;
    return calcDateDiffs(new Date(_prevEntry.date), new Date(_thisEntry.date));
  }

  return (
    <div className="flex flex-col gap-4 pb-10">
      {entryStore.entries.map((entry) => {
        return (
          <div key={entry.draft + entry.id}>
            {renderDateDiff(entry)}
            {renderDateHeader(entry.draft, entry.date, entry.pinned)}
            <div className="fadein-up" key={entry.id}>
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
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
