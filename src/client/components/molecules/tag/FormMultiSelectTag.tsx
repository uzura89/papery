import { useRef, useState } from "react";

import useTagStore from "../../../store/tag/tagStore";
import { TagItem } from "../../atoms/tag/TagItem";
import { useClickOutsideEffect } from "../../../modules/ui/useOutsideClick";
import {
  InputDropdownItem,
  InputDropdownWindow,
} from "../../atoms/input/InputDropdown";

export default function FormMultiSelectTag(props: {
  tagIds: string[];
  onChange: (tagIds: string[]) => void;
}) {
  const tagStore = useTagStore();
  // local states
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // variables
  const allTags = tagStore.tags;
  const selectedTags = allTags.filter((tag) => props.tagIds.includes(tag.id));
  // refs
  const dropdownRef = useRef(null);

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function onClickTag(tagId: string) {
    if (props.tagIds.includes(tagId)) {
      props.onChange(props.tagIds.filter((id) => id !== tagId));
    } else {
      props.onChange([...props.tagIds, tagId]);
    }
  }

  useClickOutsideEffect(
    dropdownRef,
    () => setIsDropdownOpen(false),
    isDropdownOpen
  );

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selected tags */}
      <div
        className="form min-h-10 clickable-opacity flex items-center flex-wrap px-2 gap-1 select-none"
        onClick={toggleDropdown}
      >
        {selectedTags.length === 0 && (
          <span className="text-foreLight text-sm">Select tags</span>
        )}
        {selectedTags.map((tag) => {
          return <TagItem text={tag.text} color={tag.color} key={tag.id} />;
        })}
      </div>

      {/* Tag Select dropdown */}
      {isDropdownOpen && (
        <InputDropdownWindow top="45px">
          {allTags.map((tag) => {
            return (
              <InputDropdownItem id={tag.id} key={tag.id} onClick={onClickTag}>
                <input
                  className="pointer-events-none"
                  type="checkbox"
                  checked={props.tagIds.includes(tag.id)}
                  onChange={() => {}}
                />
                <TagItem text={tag.text} color={tag.color} noBgColor />
              </InputDropdownItem>
            );
          })}
        </InputDropdownWindow>
      )}
    </div>
  );
}
