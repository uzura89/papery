import { create } from "zustand";

import { extractTagsFromBody } from "../../../common/modules/tag/extractTagsFromBody";

const useEntrySearchStore = create<{
  searchText: string;
  changeSearchText: (text: string) => void;
  addTagToSearchText: (tag: string) => void;
  addDateToSearchText: (date: string) => void;
  addDateRangeToSearchText: (fromDate: string, toDate: string) => void;
}>((set, get) => ({
  searchText: "",
  changeSearchText: (text: string) => {
    set({ searchText: text });
  },
  addTagToSearchText: (tag: string) => {
    // if search text includes tag, do nothing
    const sameTagExist = get()
      .searchText.split(" ")
      .some((t) => t === `#${tag}`);
    if (sameTagExist) {
      return;
    }

    // add tag to search text
    const text = get().searchText;
    const newText = text + " #" + tag;
    set({ searchText: newText });
  },
  addDateToSearchText: (date: string) => {
    const searchText = get().searchText;

    // if the date is already in the search text, remove it
    if (searchText.split(" ").some((word) => word === date)) {
      const searchTextWithoutDate = searchText.replace(date, "").trim();
      set({ searchText: searchTextWithoutDate });
      return;
    }

    // add the date to the search text
    const tagsInSearchText = extractTagsFromBody(searchText);
    const newSearchText = `${tagsInSearchText
      .map((t) => `#${t}`)
      .join(" ")} ${date}`;

    set({ searchText: newSearchText });
  },
  addDateRangeToSearchText: (fromDate: string, toDate: string) => {
    const searchText = get().searchText;

    // add the date range to the search text
    const tagsInSearchText = extractTagsFromBody(searchText);
    const newSearchText = `${tagsInSearchText
      .map((t) => `#${t}`)
      .join(" ")} ${fromDate}~${toDate}`;

    set({ searchText: newSearchText });
  },
}));

export default useEntrySearchStore;
