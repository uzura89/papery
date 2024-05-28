import clsx from "clsx";
import { useState } from "react";

import useEntryStore from "../../../store/entry/entryStore";
import { BlankButton } from "../../atoms/buttons/BlankButton";
import { TagSelectionModal } from "./TagSelectionModal";
import { Entries } from "./Entries";
import AddEntryModal from "./AddEntryModal";
import EntrySearchForm from "../../molecules/entry/EntrySearchForm";

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
