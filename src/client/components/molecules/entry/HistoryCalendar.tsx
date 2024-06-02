import clsx from "clsx";

import { convertMonthToString } from "../../../../common/modules/date/convertMonthToString";
import {
  CalendarDateType,
  EntryHistoryType,
} from "../../../../common/types/entryHistory.types";
import {
  addZero,
  convertDateToString,
} from "../../../../common/modules/date/convertDateToString";

export function HistoryCalendar(props: {
  loading: boolean;
  year: string;
  calendarDates: CalendarDateType[];
  entryHistories: EntryHistoryType[];
  searchText: string;
  scrollToRef: React.RefObject<HTMLDivElement>;
  onClickDate: (date: string) => void;
  onClickMonth: (month: number) => void;
}) {
  const today = convertDateToString(new Date());

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
            year={props.year}
            month={month}
            entryHistoriesOfMonth={entryHistoriesOfMonth}
            searchText={props.searchText}
            today={today}
            scrollToRef={props.scrollToRef}
            onClickDate={props.onClickDate}
            onClickMonth={props.onClickMonth}
          />
        );
      })}
    </div>
  );
}

function DatesInMonth(props: {
  year: string;
  month: CalendarDateType;
  entryHistoriesOfMonth: EntryHistoryType[];
  searchText: string;
  today: string;
  scrollToRef: React.RefObject<HTMLDivElement>;
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

  const isCurrentMonth =
    new Date().getMonth() === props.month.month &&
    new Date().getFullYear() === parseInt(props.year);

  return (
    <div className="pb-3">
      <div
        className="font-black font-serif  mb-3 text-sm clickable inline-block select-none"
        onClick={onClickMonth}
        ref={isCurrentMonth ? props.scrollToRef : null}
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

          const date = `${props.year}-${addZero(
            props.month.month + 1
          )}-${addZero(index + 1)}`;

          const isToday = date === props.today;

          return (
            <div key={index}>
              <DateItemWrapper key={index + blankDays}>
                <DateItem
                  date={date}
                  entryHistory={entryHistory}
                  onClickDate={props.onClickDate}
                  isSelected={props.searchText.includes(date)}
                />
              </DateItemWrapper>
              <div
                className={clsx(
                  "text-foreLight w-full text-center h-[10px] text-[10px] mb-0.5"
                )}
              >
                <span
                  className={clsx(
                    "rounded-full px-1.5",
                    isToday ? "bg-[#e35b35df] font-bold text-white" : ""
                  )}
                >
                  {index + 1}
                </span>
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
    <div className={clsx("h-9 md:h-7 rounded-sm overflow-hidden relative")}>
      {props.children}
    </div>
  );
}

function DateItem(props: {
  date: string;
  entryHistory: EntryHistoryType | undefined;
  isSelected: boolean;
  onClickDate: (date: string) => void;
}) {
  const onClickDate = () => {
    props.onClickDate(props.date);
  };

  const renderDateItemContent = () => {
    if (props.entryHistory === undefined) {
      return <div className="h-full bg-backDark"></div>;
    }

    const emojis = props.entryHistory.primaryEmojis.filter((e) => e !== "");
    return (
      <div
        className={clsx(
          "h-full flex items-center justify-center select-none bg-card"
        )}
      >
        <EmojiItems emojis={emojis} />
      </div>
    );
  };

  return (
    <div
      className={clsx(
        "h-full clickable border w-full rounded-[4px] overflow-hidden",
        props.isSelected ? "border-foreSecondary" : "border-transparent"
      )}
      onClick={onClickDate}
    >
      {renderDateItemContent()}
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
