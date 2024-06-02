import { useRef, useEffect } from "react";
import useEntrySearchStore from "../../../../store/entry/entrySearchStore";
import useEntryStore from "../../../../store/entry/entryStore";
import EntryCardContent from "../../../atoms/entry/EntryCardContent";
import { toggleCheckboxInBody } from "./modules/toggleCheckboxInBody";

export function EntryCardPublished(props: {
  id: string;
  date: string;
  body: string;
  pinned: boolean;
  onDraft: () => void;
  onUpdateBody: (newBody: string) => void;
}) {
  const entryStore = useEntryStore();
  const entrySearchStore = useEntrySearchStore();
  // ref
  const divRef = useRef<HTMLDivElement>(null);

  function addOnClickToTags() {
    if (!divRef.current) return;
    // const tagNavigation = document.querySelectorAll(".clickable-tag");
    // get all tags within divRef
    const tagNavigation = divRef.current.querySelectorAll(".clickable-tag");

    tagNavigation.forEach((tag) => {
      tag.addEventListener("click", (e) => {
        e.preventDefault();
        const tagText = tag.getAttribute("data");
        if (!tagText) return;
        entrySearchStore.addTagToSearchText(tagText);
        entryStore.fetchEntriesBySearchText();
      });
    });
  }

  function addOnClickToCheckboxes() {
    if (!divRef.current) return;
    const checkboxes = divRef.current.querySelectorAll(".clickable-checkbox");

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("click", (e) => {
        e.preventDefault();
        const lineIndex = checkbox.getAttribute("data");

        if (!lineIndex) return;

        const [startOfLine, endOfLine] = getStartAndEndOfLine(
          props.body,
          parseInt(lineIndex)
        );
        const newBody = toggleCheckboxInBody(
          props.body,
          startOfLine,
          endOfLine
        );
        props.onUpdateBody(newBody);
      });
    });
  }

  useEffect(() => {
    setTimeout(() => {
      addOnClickToTags();
    }, 100);
  }, [null]);

  useEffect(() => {
    setTimeout(() => {
      addOnClickToCheckboxes();
    }, 100);
  }, [props.body]);

  return <EntryCardContent divRef={divRef} body={props.body} />;
}

/**
 * Helper Functions
 */

function getStartAndEndOfLine(text: string, lineIndex: number) {
  const lines = text.split("\n");
  const linesBefore = lines.slice(0, lineIndex);
  const startOfLine = linesBefore.join("\n").length;
  const endOfLine = startOfLine + lines[lineIndex].length;

  return [startOfLine, endOfLine];
}
