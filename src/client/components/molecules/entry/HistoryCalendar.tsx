import clsx from "clsx";

import { convertMonthToString } from "../../../../common/modules/date/convertMonthToString";
import {
  CalendarDateType,
  EntryHistoryType,
} from "../../../../common/types/entryHistory.types";

export function HistoryCalendar(props: {
  loading: boolean;
  year: string;
  calendarDates: CalendarDateType[];
  entryHistories: EntryHistoryType[];
  searchText: string;
  onClickDate: (date: string) => void;
  onClickMonth: (month: number) => void;
}) {
  return (
    <div className="flex flex-col-reverse">
      {props.calendarDates.map((month) => {
        const entryHistoriesOfMonth = props.entryHistories.filter(
          (entryHistory) => {
            const date = new Date(entryHistory.date);
            const monthOfHistory = date.getMonth();
            const monthOfCalendar = month.month;

            return monthOfHistory === monthOfCalendar;
          }
        );
        return (
          <DatesInMonth
            key={month.month}
            month={month}
            entryHistoriesOfMonth={entryHistoriesOfMonth}
            searchText={props.searchText}
            onClickDate={props.onClickDate}
            onClickMonth={props.onClickMonth}
          />
        );
      })}
    </div>
  );
}

function DatesInMonth(props: {
  month: CalendarDateType;
  entryHistoriesOfMonth: EntryHistoryType[];
  searchText: string;
  onClickDate: (date: string) => void;
  onClickMonth: (month: number) => void;
}) {
  function onClickMonth() {
    props.onClickMonth(props.month.month);
  }

  // const blankDays =
  //   props.month.startDayOfMonth === 0 ? 6 : props.month.startDayOfMonth - 1;
  const blankDays = props.month.startDayOfMonth;
  const actualDays = props.month.dateCnt;

  return (
    <div className="pb-3">
      <div
        className="font-black font-serif  mb-3 text-sm clickable inline-block select-none"
        onClick={onClickMonth}
      >
        {convertMonthToString(props.month.month)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: blankDays }).map((_, index) => {
          return (
            <DateItemWrapper key={index}>
              <div className="bg-transparent" key={index} />
            </DateItemWrapper>
          );
        })}
        {Array.from({ length: actualDays }).map((_, index) => {
          const entryHistory = props.entryHistoriesOfMonth.find(
            (entryHistory) => {
              const date = new Date(entryHistory.date);
              return date.getDate() === index + 1;
            }
          );

          return (
            <div key={index}>
              <DateItemWrapper key={index + blankDays}>
                <DateItem
                  entryHistory={entryHistory}
                  onClickDate={props.onClickDate}
                  isSelected={
                    entryHistory
                      ? props.searchText.includes(entryHistory.date)
                      : false
                  }
                />
              </DateItemWrapper>
              <div className="text-[10px] text-fore opacity-50 w-full text-center">
                {index + 1}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DateItemWrapper(props: { children: React.ReactNode }) {
  return (
    <div className="h-9 md:h-7 rounded-sm overflow-hidden relative">
      {props.children}
    </div>
  );
}

function DateItem(props: {
  entryHistory: EntryHistoryType | undefined;
  isSelected: boolean;
  onClickDate: (date: string) => void;
}) {
  if (props.entryHistory === undefined) {
    return <div className="h-full bg-backDark"></div>;
  }

  const onClickDate = () => {
    if (!props.entryHistory) return;
    props.onClickDate(props.entryHistory.date);
  };

  const emojis = props.entryHistory.primaryEmojis.filter((e) => e !== "");

  return (
    <div
      className={clsx(
        "h-full flex items-center justify-center clickable select-none border bg-card",
        props.isSelected ? "border-foreSecondary" : "border-transparent"
      )}
      onClick={onClickDate}
    >
      <EmojiItems emojis={emojis} />
    </div>
  );
}

function EmojiItems(props: { emojis: string[] }) {
  const emojis = props.emojis.length === 0 ? ["🗒"] : props.emojis.slice(0, 4);

  function getEmojiStyle(emojiLength: number) {
    if (emojiLength === 1) {
      return {
        fontSize: "1rem",
        width: "100%",
      };
    } else if (emojiLength === 2) {
      return {
        fontSize: "0.6rem",
        width: "45%",
      };
    } else {
      return {
        fontSize: "0.48rem",
        width: "45%",
      };
    }
  }

  return (
    <div className="flex items-center justify-center flex-wrap">
      {emojis.map((emoji, index) => {
        return (
          <div
            key={index}
            className="flex items-center justify-center"
            style={getEmojiStyle(emojis.length)}
          >
            {emoji}
          </div>
        );
      })}
    </div>
  );
}
