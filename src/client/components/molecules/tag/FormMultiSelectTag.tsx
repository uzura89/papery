import { useRef, useState } from "react";
import { getTagColor } from "../../../../common/constants/tag.cons";
import useTagStore from "../../../store/tag/tagStore";
import { TagItem } from "../../atoms/tag/TagItem";
import { useClickOutsideEffect } from "../../../modules/ui/useOutsideClick";

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
        <div className="absolute top-11 left-0 z-10 bg-card shadow-md w-full rounded-md py-2 max-h-[160px] overflow-y-scroll border border-borderLight">
          {allTags.map((tag) => {
            return (
              <div
                key={tag.id}
                className="py-1 px-3 flex items-center gap-2 clickable-opacity hover:bg-textHoverBg"
                onClick={() => onClickTag(tag.id)}
              >
                <input
                  className="pointer-events-none"
                  type="checkbox"
                  checked={props.tagIds.includes(tag.id)}
                  onChange={() => {}}
                />
                <TagItem text={tag.text} color={tag.color} noBgColor />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
