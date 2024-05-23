import clsx from "clsx";
import { useRef, useState } from "react";
import { LuSearch, LuX } from "react-icons/lu";

import useEntryStore from "../../../store/entry/entryStore";
import { BlankButton } from "../../atoms/buttons/BlankButton";
import { TagSelectionModal } from "./TagSelectionModal";
import { Entries } from "./Entries";
import useEntrySearchStore from "../../../store/entry/entrySearchStore";
import AddEntryModal from "./AddEntryModal";

export function EntriesSection() {
  const entryStore = useEntryStore();
  // local states
  const [newEntryModalVisible, setNewEntryModalVisible] = useState(false);

  return (
    <div className="h-full flex flex-col justify-stretch relative">
      {/* Search */}
      <div className="">
        <EntrySearchForm />
        <div className="mt-4 md:mt-6" />
      </div>

      <div
        className="h-full no-scrollbar"
        style={{
          overflowY: "scroll",
        }}
      >
        {/* New Entry */}
        <div className="pt-5 md:pt-7 border-t border-borderLight">
          <div className="w-full mb-5 md:mb-7 flex gap-3">
            <BlankButton onClick={() => setNewEntryModalVisible(true)}>
              + New Entry
            </BlankButton>
          </div>
        </div>

        {/* Entries */}
        <div className={clsx(entryStore.loading && "opacity-70")}>
          <Entries />
        </div>
      </div>

      <TagSelectionModal />
      <AddEntryModal
        visible={newEntryModalVisible}
        closeModal={() => setNewEntryModalVisible(false)}
      />
    </div>
  );
}

/**
 * Search Entries Form
 */

function EntrySearchForm() {
  // stores
  const entryStore = useEntryStore();
  const entrySearchStore = useEntrySearchStore();
  // refs
  const searchTextRef = useRef<string>("");
  searchTextRef.current = entrySearchStore.searchText;
  const intervalRef = useRef<NodeJS.Timeout | null>();

  const fetchEntriesWithDelay = () => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }

    intervalRef.current = setTimeout(() => {
      entryStore.fetchEntriesBySearchText(searchTextRef.current);
    }, 1000);
  };

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    entrySearchStore.changeSearchText(e.target.value);
    searchTextRef.current = e.target.value;

    fetchEntriesWithDelay();
  };

  const clearText = () => {
    entrySearchStore.changeSearchText("");
    searchTextRef.current = "";
    entryStore.fetchEntriesBySearchText("");
  };

  return (
    <div
      className={clsx(
        "flex items-center justify-stretch gap-2 border px-4 py-1.5 text-sm rounded-full w-[220px] bg-white relative",
        entrySearchStore.searchText.length > 0
          ? "border-foreLight"
          : "border-border opacity-90"
      )}
    >
      <div>
        <LuSearch className="text-foreLighter" />
      </div>
      <input
        onChange={onChangeText}
        value={entrySearchStore.searchText}
        type="text"
        placeholder="Date or tags..."
        className={clsx("bg-transparent overflow-hidden text-foreSecondary")}
      />

      <button
        onClick={clearText}
        className={clsx(
          "absolute right-1.5 clickable btn-text h-6 w-6 rounded-full p-0 flex items-center justify-center",
          !entrySearchStore.searchText && "hidden"
        )}
      >
        <LuX className="text-foreLighter" />
      </button>
    </div>
  );
}
