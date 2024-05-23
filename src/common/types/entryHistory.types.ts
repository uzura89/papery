export type EntryHistoryType = {
  date: string;
  entryCnt: number;
  primaryEmojis: string[];
  created?: Date;
};

export type CalendarDateType = {
  month: number;
  startDayOfMonth: number;
  dateCnt: number;
};
