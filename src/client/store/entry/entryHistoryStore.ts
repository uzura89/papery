import { create } from "zustand";

import { callFetchEntryHistories } from "../../api/entry/callFetchEntryHistories";
import { EntryHistoryType } from "../../../common/types/entryHistory.types";
import useEntryStore from "./entryStore";
import { extractTagsFromBody } from "../../../common/modules/tag/extractTagsFromBody";
import useEntrySearchStore from "./entrySearchStore";

const useEntryHistoryStore = create<{
  // data
  year: string;
  entryHistories: EntryHistoryType[];
  calendarDates: {
    month: number;
    startDayOfMonth: number;
    dateCnt: number;
  }[];
  // api states
  loading: boolean;
  error: string | null;
  // data loader
  setYearAndFetchEntryHistories: (year: string) => void;
  refreshEntryHistories: () => void;
  fetchEntryHistories: (year: string, tags: string[]) => void;
}>((set, get) => ({
  year: new Date().getFullYear().toString(),
  entryHistories: [],
  calendarDates: [],
  loading: false,
  error: null,
  unsavedEntryId: null,
  setYearAndFetchEntryHistories: async (year: string) => {
    const searchText = useEntrySearchStore.getState().searchText;
    const tags = searchText ? extractTagsFromBody(searchText) : [];

    // set calendar dates
    const calendarDates = makeCalendarDates(year, new Date());
    set({ year, calendarDates });

    // fetch entry histories
    get().fetchEntryHistories(year, tags);
  },
  refreshEntryHistories: async () => {
    const searchText = useEntrySearchStore.getState().searchText;
    const tags = searchText ? extractTagsFromBody(searchText) : [];

    get().fetchEntryHistories(get().year, tags);
  },
  fetchEntryHistories: async (year: string, tags: string[]) => {
    set({ year, loading: true, error: null });

    // fetch entry histories
    const response = await callFetchEntryHistories({ year, tags });

    if (response.error) {
      set({ loading: false, error: response.error.message });
    } else {
      set({
        entryHistories: response.data.entryHistories,
        loading: false,
      });
    }
  },
}));

export default useEntryHistoryStore;

/**
 * makeCalendarDates
 */

function makeCalendarDates(year: string, today: Date) {
  const calendarDates = [];

  for (let month = 0; month < 12; month++) {
    // check if this month includes today
    const isToday =
      month === today.getMonth() && year === today.getFullYear().toString();

    // calc start day of month and date count
    const startDayOfMonth = new Date(parseInt(year, 10), month, 1).getDay();
    const dateCnt = isToday
      ? today.getDate()
      : new Date(parseInt(year, 10), month + 1, 0).getDate();

    // save
    calendarDates.push({ month, startDayOfMonth, dateCnt });

    // if this month includes today, cut off here
    if (isToday) {
      break;
    }
  }
  return calendarDates;
}
