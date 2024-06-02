import { useEffect, useRef, useState } from "react";

import useTagSelectionStore from "../../../store/entry/tagSelectionStore";
import useTagStore from "../../../store/tag/tagStore";
import { TagItem } from "../../atoms/tag/TagItem";
import BottomModal from "../../molecules/modal/BottomModal";
import { useClickOutsideEffect } from "../../../modules/ui/useOutsideClick";

export function TagSelectionModal() {
  // store
  const tagSelectionStore = useTagSelectionStore();
  const tagStore = useTagStore();
  // state
  const [tagInput, setTagInput] = useState("");
  // refs
  const numberOfHash = useRef(0);
  const windowRef = useRef<HTMLDivElement>(null);
  // variables
  const matchingTags = tagStore.tags.filter((tag) =>
    tag.text.toLowerCase().includes(tagInput.toLowerCase())
  );

  /**
   * User Actions
   */

  function onClickTag(tagText: string) {
    tagSelectionStore.addTagToEntry(tagText);
    // close modal
    tagSelectionStore.closeModal();
  }

  function closeModal() {
    tagSelectionStore.closeModal();
  }

  function updateTagInput() {
    if (!tagSelectionStore.textareaRef) return;
    if (!tagSelectionStore.textareaRef.current) return;
    const body = tagSelectionStore.textareaRef.current.value;
    // get tag input
    const _tagInput = getTagInput(tagSelectionStore.cursorPosition, body);
    setTagInput(_tagInput);
  }

  function onKeyUp(e: KeyboardEvent) {
    if (e.key === " " || e.key === "Enter") {
      closeModal();
    }
    updateTagInput();
    // close modal if number of # is less than
    if (getNumberOfHash(tagSelectionStore.textareaRef) < numberOfHash.current) {
      closeModal();
    }
  }

  /**
   * Effect
   */

  useEffect(() => {
    if (tagSelectionStore.modalOpen) {
      updateTagInput();
      window.addEventListener("keyup", onKeyUp);
      numberOfHash.current = getNumberOfHash(tagSelectionStore.textareaRef);
    }
  }, [tagSelectionStore.modalOpen]);

  useClickOutsideEffect(windowRef, closeModal, tagSelectionStore.modalOpen);

  /**
   * Render
   */

  return (
    <BottomModal
      visible={tagSelectionStore.modalOpen && matchingTags.length > 0}
      closeModal={closeModal}
      width="100%"
      height="25%"
      title="Add Tag"
    >
      <div className="flex gap-2 flex-wrap" ref={windowRef}>
        {matchingTags.map((tag) => {
          return (
            <div
              key={tag.id}
              className="clickable"
              onClick={() => onClickTag(tag.text)}
            >
              <TagItem text={tag.text} color={tag.color} />
            </div>
          );
        })}
      </div>
    </BottomModal>
  );
}

/**
 * getTagInput
 */

function getTagInput(cursorPosition: number, body: string) {
  const bodyAfterCursor = body.slice(cursorPosition, body.length);
  const tagInput = bodyAfterCursor.split(/[\s\n]/)[0];
  return tagInput;
}

function getNumberOfHash(
  textareaRef: React.RefObject<HTMLTextAreaElement> | undefined
) {
  if (!textareaRef) return 0;
  if (!textareaRef.current) return 0;

  const body = textareaRef.current.value;
  const numberOfHash = body.split("#").length - 1;
  return numberOfHash;
}
