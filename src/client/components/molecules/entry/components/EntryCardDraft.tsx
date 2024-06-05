import { useEffect, useRef } from "react";
import {
  LuSave,
  LuCheckCircle,
  LuCheck,
  LuHash,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuList,
  LuSquare,
} from "react-icons/lu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import useTagSelectionStore from "../../../../store/entry/tagSelectionStore";
import Textarea from "../../../atoms/input/Textarea";
import { toggleCheckboxInBody } from "./modules/toggleCheckboxInBody";

export function EntryCardDraft(props: {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  id: string;
  date: string;
  body: string;
  isUnsaved: boolean;
  pinned: boolean;
  onChangeBody: (body: string) => void;
  onChangeDate: (date: string) => void;
  onPublish: () => void;
  saveToServer: () => void;
}) {
  const tagSelectionStore = useTagSelectionStore();
  const scrolledByUserRef = useRef(true);

  const onChangeDate = (date: Date) => {
    const YYYY_MM_DD = date.toISOString().split("T")[0];
    props.onChangeDate(YYYY_MM_DD);
  };

  const openTagSelectionModal = () => {
    if (!props.textareaRef.current) return;
    tagSelectionStore.openModal(props.textareaRef, (newBody: string) => {
      props.onChangeBody(newBody);
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // publish
    if ((e.key === "Enter" && e.metaKey) || (e.key === "Enter" && e.ctrlKey)) {
      props.onPublish();
      tagSelectionStore.closeModal();
    }
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // open tag selection modal
    if (e.key === "#") {
      openTagSelectionModal();
    }
  };

  const putCursorToPoistion = (cursorPosition: number) => {
    setTimeout(() => {
      if (!props.textareaRef.current) return;
      props.textareaRef.current.focus();
      props.textareaRef.current?.setSelectionRange(
        cursorPosition,
        cursorPosition
      );
    }, 100);
  };

  const addCheckToBody = (checked: boolean) => {
    if (!props.textareaRef.current) return;
    const cursorPosition = props.textareaRef.current.selectionStart;
    const [startOfline, endOfLine] = getCurrentLine(props.textareaRef.current);
    const thisLine = props.body.slice(startOfline, endOfLine);

    const checkedText = "[x]";
    const uncheckedText = "[ ]";
    const checkedRegex = /\[x\]/g;
    const uncheckedRegex = /\[\s*\]/g;

    // check if the line does not have [x] or [ ]
    if (!checkedRegex.test(thisLine) && !uncheckedRegex.test(thisLine)) {
      addTextToBody(checked ? checkedText + " " : uncheckedText + " ");
      return;
    }

    const newBody = toggleCheckboxInBody(props.body, startOfline, endOfLine);
    props.onChangeBody(newBody);
    putCursorToPoistion(cursorPosition);
  };

  const addHeadingToLine = (heading: string) => {
    if (!props.textareaRef.current) return;
    const [startOfline, endOfLine] = getCurrentLine(props.textareaRef.current);
    const thisLine = props.body.slice(startOfline, endOfLine);

    // remove existing heading
    const removedHeading = thisLine.replace(/^#+\s/, "");
    // add new heading
    const newLine = heading + removedHeading;

    // replace the line with new heading
    const newBody =
      props.body.slice(0, startOfline) + newLine + props.body.slice(endOfLine);
    props.onChangeBody(newBody);

    putCursorToPoistion(startOfline + newLine.length);
  };

  const addBulletToLine = () => {
    if (!props.textareaRef.current) return;
    const [startOfline, endOfLine] = getCurrentLine(props.textareaRef.current);
    const thisLine = props.body.slice(startOfline, endOfLine);

    // remove existing bullet
    const removedBullet = thisLine.replace(/^\s*-\s/, "");
    // add new bullet
    const newLine = "- " + removedBullet;

    // replace the line with new bullet
    const newBody =
      props.body.slice(0, startOfline) + newLine + props.body.slice(endOfLine);
    props.onChangeBody(newBody);

    putCursorToPoistion(startOfline + newLine.length);
  };

  const addTextToBody = (text: string) => {
    const textLength = text.length;

    if (!props.textareaRef.current) return;
    const cursorPosition = props.textareaRef.current.selectionStart;
    const body = props.body;
    const newBody =
      body.slice(0, cursorPosition) + text + body.slice(cursorPosition);
    props.onChangeBody(newBody);

    putCursorToPoistion(cursorPosition + textLength);
  };

  const onClickAddTag = () => {
    // add # to current cursor position
    addTextToBody("#");

    // place cursor after #, and open tag selection modal
    setTimeout(() => {
      // open tag selection modal
      openTagSelectionModal();
    }, 200);
  };

  return (
    <div>
      {/* Date */}
      <div className="flex items-center h-[2em]">
        {props.pinned && <span className="mr-1.5">📍</span>}
        <span className="text-foreLighter text-xs mr-1">Date:</span>
        <DatePicker
          className="text-xs translate-y-[-1.5px] text-foreLight bg-inherit"
          dateFormat="yyyy-MM-dd"
          selected={props.date ? new Date(props.date) : new Date()}
          onChange={onChangeDate}
        />
      </div>

      {/* Body */}
      <div className="text-md mt-2 text-foreEntry">
        <Textarea
          textareaRef={props.textareaRef}
          value={props.body}
          onChange={(e) => props.onChangeBody(e.target.value)}
          placeholder="Write something here..."
          extensible
          height={50}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-2 gap-3 flex-col items-stretch sm:flex-row sm:items-center">
        {/* Left section */}
        <TextPallete
          onClickAddTag={onClickAddTag}
          addCheckToBody={addCheckToBody}
          addHeadingToLine={addHeadingToLine}
          addBulletToLine={addBulletToLine}
        />

        {/* Right section */}
        <div className="flex items-center gap-3 justify-end">
          {props.isUnsaved ? (
            <button
              className="btn btn-text text-fore"
              onClick={props.saveToServer}
            >
              <LuSave className="18px mr-1.5" />
              Save
            </button>
          ) : (
            <span
              className="btn btn-text btn-disabled"
              onClick={props.saveToServer}
            >
              <LuCheckCircle className="18px mr-1.5" />
              Saved
            </span>
          )}

          <button className="btn" onClick={props.onPublish}>
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Text Pallete
 */

function TextPallete(props: {
  onClickAddTag: () => void;
  addCheckToBody: (checked: boolean) => void;
  addHeadingToLine: (heading: string) => void;
  addBulletToLine: () => void;
}) {
  return (
    <div className="flex h-full items-end">
      <TextPalleteButton onClick={props.onClickAddTag}>
        <LuHash />
      </TextPalleteButton>

      <TextPalleteButton onClick={() => props.addHeadingToLine("# ")}>
        <LuHeading1 />
      </TextPalleteButton>

      <TextPalleteButton onClick={() => props.addHeadingToLine("## ")}>
        <LuHeading2 />
      </TextPalleteButton>

      <TextPalleteButton onClick={() => props.addHeadingToLine("### ")}>
        <LuHeading3 />
      </TextPalleteButton>

      <TextPalleteButton onClick={() => props.addCheckToBody(false)}>
        <LuSquare />
      </TextPalleteButton>

      <TextPalleteButton onClick={() => props.addCheckToBody(true)}>
        <LuCheck />
      </TextPalleteButton>

      <TextPalleteButton onClick={() => props.addBulletToLine()}>
        <LuList />
      </TextPalleteButton>
    </div>
  );
}

/**
 * Text Pallete Button
 */

function TextPalleteButton(props: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      className="btn btn-text btn-small text-foreLight"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

/**
 * Helper functions
 */

function getCurrentLine(textarea: HTMLTextAreaElement) {
  // Get the current cursor position
  const cursorPosition = textarea.selectionStart;

  // Get the text from the textarea
  const text = textarea.value;

  // Find the start of the line
  let startOfLine = text.lastIndexOf("\n", cursorPosition - 1) + 1;

  // Find the end of the line
  let endOfLine = text.indexOf("\n", cursorPosition);
  if (endOfLine === -1) {
    // This means the cursor is on the last line which might not end with a newline character
    endOfLine = text.length;
  }

  // Extract the line text
  return [startOfLine, endOfLine];
}
