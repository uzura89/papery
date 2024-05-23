import clsx from "clsx";
import { useEffect, useRef } from "react";
import { LuClock, LuDownload } from "react-icons/lu";

import { PageTitle, PageWrapper } from "../wrappers/PageShell";
import useReflectStore from "../../store/entry/reflectStore";
import { convertDateToString } from "../../../common/modules/date/convertDateToString";
import { ReflectionType } from "../../../common/types/reflect.types";
import EntryCardWrapper from "../atoms/entry/EntryCardWrapper";
import EntryCardContent from "../atoms/entry/EntryCardContent";
import { convertDateToReadableString } from "../../../common/modules/date/convertDateToReadableString";
import { convertDateToDayOfWeek } from "../../../common/modules/date/convertDateToDayOfWeek";
import useEntrySearchStore from "../../store/entry/entrySearchStore";
import useEntryStore from "../../store/entry/entryStore";
import { useNavigate } from "react-router-dom";
import { CONS_PATH_HOME } from "../../../common/constants";

export default function ReflectPage() {
  const reflectStore = useReflectStore();

  useEffect(() => {
    if (!reflectStore.isLoaded) {
      const today = convertDateToString(new Date());
      reflectStore.fetchReflections(today);
    }
  }, [reflectStore.isLoaded]);

  return (
    <PageWrapper>
      <div className="container-tiny">
        <PageTitle title="Reflection" />

        <div>
          {reflectStore.reflections.map((reflection, index) => {
            return (
              <ReflectionItem key={reflection.title} reflection={reflection} />
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
}

function ReflectionItem({ reflection }: { reflection: ReflectionType }) {
  const navigate = useNavigate();
  // stores
  const entryStore = useEntryStore();
  const entrySearchStore = useEntrySearchStore();

  const divRef = useRef<HTMLDivElement>(null);
  const { monthDay, year } = convertDateToReadableString(
    new Date(reflection.date)
  );

  function onClickDate() {
    entrySearchStore.changeSearchText(reflection.date);
    entryStore.fetchEntriesBySearchText();
    navigate(CONS_PATH_HOME);
  }

  return (
    <div className="border-t border-borderLight pt-4">
      {/* Header */}
      <div className="font-bold flex flex-col items-start">
        {/* Title */}
        <div
          className={clsx(
            "text-xs text-white/95 uppercase tracking-wide mb-1.5 rounded-md py-1 px-1.5 inline-flex items-center gap-1.5 bg-fillPrimaryLight"
            // "bg-backDark px-1.5"
          )}
        >
          <LuClock /> {reflection.title}
        </div>
        {/* Date */}
        <div
          className="font-serif mb-3 text-foreSecondary clickable"
          onClick={onClickDate}
        >
          <span className="text-xs mr-2">{year},</span>
          <span>{monthDay}</span>
          <span className="text-xs ml-2">
            ({convertDateToDayOfWeek(new Date(reflection.date))})
          </span>
        </div>
      </div>

      {/* Entries */}
      <div className="flex flex-col gap-4 pb-5">
        {reflection.entries.length === 0 && (
          <div className="flex items-center gap-2">
            <span className="text-foreLighter text-sm">
              No entries for this date
            </span>
          </div>
        )}

        {reflection.entries.map((entry) => {
          return (
            <EntryCardWrapper key={entry.id}>
              <EntryCardContent divRef={divRef} body={entry.body} />
            </EntryCardWrapper>
          );
        })}
      </div>
    </div>
  );
}
