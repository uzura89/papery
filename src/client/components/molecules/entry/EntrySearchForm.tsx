import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { LuSearch, LuX } from "react-icons/lu";

import useEntrySearchStore from "../../../store/entry/entrySearchStore";
import useEntryStore from "../../../store/entry/entryStore";
import {
  InputDropdownItem,
  InputDropdownWindow,
} from "../../atoms/input/InputDropdown";
import { TagItem } from "../../atoms/tag/TagItem";
import useTagStore from "../../../store/tag/tagStore";
import { TagType } from "../../../../common/types";
import { useClickOutsideEffect } from "../../../modules/ui/useOutsideClick";

export default function EntrySearchForm() {
  // stores
  const entryStore = useEntryStore();
  const entrySearchStore = useEntrySearchStore();
  // refs
  const searchTextRef = useRef<string>("");
  searchTextRef.current = entrySearchStore.searchText;
  const intervalRef = useRef<NodeJS.Timeout | null>();
  const inputDivRef = useRef<HTMLDivElement>(null);
  // states
  const [dropdownVisible, setDropdownVisible] = useState(false);

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

  const onFocus = () => {
    setDropdownVisible(true);
  };

  const onTextSelected = (text: string) => {
    entrySearchStore.changeSearchText(text);
    searchTextRef.current = text;

    entryStore.fetchEntriesBySearchText(text);
  };

  useClickOutsideEffect(
    inputDivRef,
    () => setDropdownVisible(false),
    dropdownVisible
  );

  return (
    <div className="w-[220px]" ref={inputDivRef}>
      <EntrySearchFormInput
        searchInput={entrySearchStore.searchText}
        onChangeText={onChangeText}
        clearText={clearText}
        onFocus={onFocus}
      />

      {dropdownVisible && (
        <SearchSuggestions
          searchText={entrySearchStore.searchText}
          onTextSelected={onTextSelected}
        />
      )}
    </div>
  );
}

/**
 * Sub Components
 */

function EntrySearchFormInput(props: {
  searchInput: string;
  onChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearText: () => void;
  onFocus: () => void;
}) {
  return (
    <div
      className={clsx(
        "flex items-center justify-stretch gap-2 border px-4 py-1.5 text-sm rounded-full w-full bg-card relative",
        props.searchInput.length > 0
          ? "border-foreLight"
          : "border-border opacity-90"
      )}
    >
      <div>
        <LuSearch className="text-foreLighter" />
      </div>
      <input
        onChange={props.onChangeText}
        value={props.searchInput}
        type="text"
        placeholder="Date or tags..."
        className={clsx(
          "bg-transparent overflow-hidden text-foreSecondary placeholder:text-foreLight"
        )}
        onFocus={props.onFocus}
      />

      <button
        onClick={props.clearText}
        className={clsx(
          "absolute right-1.5 clickable btn-text h-6 w-6 rounded-full p-0 flex items-center justify-center",
          !props.searchInput && "hidden"
        )}
      >
        <LuX className="text-foreLighter" />
      </button>
    </div>
  );
}

function SearchSuggestions(props: {
  searchText: string;
  onTextSelected: (text: string) => void;
}) {
  const tagStore = useTagStore();

  const [filteredTags, setFilteredTags] = useState<TagType[]>([]);

  const filterTagsByText = () => {
    if (props.searchText === "") {
      setFilteredTags(tagStore.tags);
      return;
    }

    const filteredTags = tagStore.tags.filter((tag) => {
      return tag.text.toLowerCase().includes(props.searchText.toLowerCase());
    });
    setFilteredTags(filteredTags);
  };

  const onClickTag = (text: string) => {
    props.onTextSelected(`#${text}`);
  };

  useEffect(() => {
    filterTagsByText();
  }, [props.searchText]);

  if (filteredTags.length === 0) {
    return null;
  }

  return (
    <div className="w-full relative">
      <InputDropdownWindow top="5px" maxHeight="200px" radius="0.7rem">
        {filteredTags.map((tag) => {
          return (
            <InputDropdownItem key={tag.id} id={tag.text} onClick={onClickTag}>
              <TagItem text={tag.text} color={tag.color} noBgColor />
            </InputDropdownItem>
          );
        })}
      </InputDropdownWindow>
    </div>
  );
}
