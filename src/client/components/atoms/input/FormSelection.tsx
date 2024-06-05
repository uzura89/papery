import { ReactNode, useRef, useState } from "react";
import clsx from "clsx";

import { useClickOutsideEffect } from "../../../modules/ui/useOutsideClick";
import { LuChevronDown } from "react-icons/lu";

export function FormSelection(props: {
  selection: {
    ids: string[];
    icons?: React.ReactNode[];
    texts: string[];
  };
  selectedId: string;
  onSelect: (id: string) => void;
  maxHeight: number;
}) {
  // refs
  const formRef = useRef<HTMLDivElement>(null);
  // states
  const [selectionVisible, setSelectionVisible] = useState(false);
  // selectedIndex
  const selectedIndex = props.selection.ids.indexOf(props.selectedId);
  const selectedItem = getItemByIndex(props.selection, selectedIndex);

  function onClickForm() {
    setSelectionVisible(!selectionVisible);
  }

  function onClickOutside() {
    setSelectionVisible(false);
  }

  function handleSelect(id: string) {
    props.onSelect(id);
    setSelectionVisible(false);
  }

  /**
   * Render
   */

  useClickOutsideEffect(formRef, onClickOutside, selectionVisible);

  return (
    <div className="relative" ref={formRef}>
      <div
        onClick={onClickForm}
        className="cursor-pointer form form-sm flex justify-between items-center select-none"
      >
        <Item text={selectedItem.text} icon={selectedItem.icon} />

        <div className="text-foreLight">
          <LuChevronDown />
        </div>
      </div>

      {selectionVisible && (
        <SelectionList
          selection={props.selection}
          selectedId={props.selectedId}
          onSelect={handleSelect}
          maxHeight={props.maxHeight}
        />
      )}
    </div>
  );
}

function SelectionList(props: {
  selection: {
    ids: string[];
    icons?: React.ReactNode[];
    texts: string[];
  };
  selectedId: string;
  onSelect: (id: string) => void;
  maxHeight: number;
}) {
  return (
    <div
      className={clsx(
        "w-full absolute z-10 bg-card rounded-md shadow-md",
        "overflow-y-auto"
      )}
      style={{ maxHeight: props.maxHeight + "px" }}
    >
      {props.selection.ids.map((id, index) => {
        const item = getItemByIndex(props.selection, index);
        return (
          <div
            key={item.id}
            onClick={() => props.onSelect(item.id)}
            className="p-2 hover:bg-textHoverBg cursor-pointer"
          >
            <Item text={item.text} icon={item.icon} />
          </div>
        );
      })}
    </div>
  );
}

function Item(props: { text: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center">
      <div className="mr-2">{props.icon}</div>
      <div className="text-sm">{props.text}</div>
    </div>
  );
}

function getItemByIndex(
  selection: { ids: string[]; icons?: React.ReactNode[]; texts: string[] },
  index: number
) {
  const selectedId = selection.ids[index];
  const selectedText = selection.texts[index];
  const selectedIcon =
    selection.icons && selection.icons.length > index ? (
      selection.icons[index]
    ) : (
      <></>
    );
  return {
    id: selectedId,
    text: selectedText,
    icon: selectedIcon,
  };
}
