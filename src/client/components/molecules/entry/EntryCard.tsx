import { useEffect, useRef } from "react";

import DatePicker from "react-datepicker";
import {
  LuCheck,
  LuCheckCircle,
  LuFileEdit,
  LuHash,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuList,
  LuMoreVertical,
  LuPin,
  LuPinOff,
  LuSave,
  LuSquare,
  LuTrash,
} from "react-icons/lu";

import "react-datepicker/dist/react-datepicker.css";

import Dropdown from "../selection/Dropdown";
import Textarea from "../../atoms/input/Textarea";
import useEntryStore from "../../../store/entry/entryStore";
import useTagSelectionStore from "../../../store/entry/tagSelectionStore";
import useEntrySearchStore from "../../../store/entry/entrySearchStore";
import EntryCardContent from "../../atoms/entry/EntryCardContent";
import EntryCardWrapper from "../../atoms/entry/EntryCardWrapper";

export function EntryCard(props: {
  id: string;
  date: string;
  body: string;
  draft: boolean;
  pinned: boolean;
  onChangeEntry: (id: string, body: string, date: string) => void;
  onPublishEntry: (id: string, body: string, date: string) => void;
  onDraftEntry: (id: string) => void;
  onDeleteEntry: (id: string) => void;
  onTogglePin: (id: string, pinned: boolean) => void;
  saveToServer: (id: string, body: string, date: string) => void;
  isUnsaved: boolean;
}) {
  // refs
  const entryRef = useRef<{ id: string; body: string; date: string }>({
    id: props.id,
    body: props.body,
    date: props.date,
  });
  const intervalRef = useRef<NodeJS.Timeout>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const stopApplyChangeInterval = () => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
  };

  const saveToServer = () => {
    props.saveToServer(
      entryRef.current.id,
      entryRef.current.body,
      entryRef.current.date
    );
  };

  const applyChangeAfterDelay = () => {
    stopApplyChangeInterval();

    intervalRef.current = setTimeout(() => {
      saveToServer();
    }, 1000);
  };

  /**
   * Event Handlers
   */

  const handleChangeBody = (body: string) => {
    props.onChangeEntry(props.id, body, props.date);
    entryRef.current.body = body;
    applyChangeAfterDelay();
  };

  const handleChangeDate = (date: string) => {
    props.onChangeEntry(props.id, props.body, date);
    entryRef.current.date = date;
    applyChangeAfterDelay();
  };

  const handleDeleteEntry = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    stopApplyChangeInterval();
    props.onDeleteEntry(props.id);
  };

  const handlePublishEntry = () => {
    stopApplyChangeInterval();
    props.onPublishEntry(props.id, props.body, props.date);
  };

  const handleDraftEntry = () => {
    stopApplyChangeInterval();
    props.onDraftEntry(props.id);

    // focus and set cursor to the end
    setTimeout(() => {
      textareaRef.current?.focus();
      const len = textareaRef.current?.value.length || 0;
      textareaRef.current?.setSelectionRange(len, len);
    }, 500);
  };

  const handleTogglePin = () => {
    props.onTogglePin(props.id, !props.pinned);
  };

  return (
    <EntryCardWrapper>
      <div className="absolute top-[14px] right-4">
        <CardOptions
          draft={props.draft}
          pinned={props.pinned}
          onClickDelete={handleDeleteEntry}
          onClickEdit={handleDraftEntry}
          onClickTogglePin={handleTogglePin}
        />
      </div>
      {props.draft ? (
        <EntryCardDraft
          textareaRef={textareaRef}
          id={props.id}
          date={props.date}
          body={props.body}
          isUnsaved={props.isUnsaved}
          pinned={props.pinned}
          onChangeBody={handleChangeBody}
          onChangeDate={handleChangeDate}
          onPublish={handlePublishEntry}
          saveToServer={saveToServer}
        />
      ) : (
        <EntryCardPublished
          id={props.id}
          date={props.date}
          body={props.body}
          pinned={props.pinned}
          onDraft={handleDraftEntry}
        />
      )}
    </EntryCardWrapper>
  );
}

/**
 * Card Options
 */

function CardOptions(props: {
  draft: boolean;
  pinned: boolean;
  onClickDelete: () => void;
  onClickEdit: () => void;
  onClickTogglePin: () => void;
}) {
  const items = [
    {
      text: props.pinned ? "Unpin" : "Pin to top",
      onClick: props.onClickTogglePin,
      icon: props.pinned ? <LuPinOff /> : <LuPin />,
      isDanger: false,
    },
    {
      text: "Delete",
      onClick: props.onClickDelete,
      icon: <LuTrash />,
      isDanger: true,
    },
  ];

  if (!props.draft) {
    items.unshift({
      text: "Edit",
      onClick: props.onClickEdit,
      icon: <LuFileEdit />,
      isDanger: false,
    });
  }

  return (
    <div className="">
      <Dropdown items={items} width="130px" top={30}>
        <button className="clickable-text rounded-md w-8 h-8 flex justify-center items-center">
          <LuMoreVertical className="text-lg text-foreLighter" />
        </button>
      </Dropdown>
    </div>
  );
}

/**
 * Entry Card Draft
 */

function EntryCardDraft(props: {
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

    if (checked) {
      const newLine = thisLine.replace(uncheckedRegex, checkedText);
      const newBody =
        props.body.slice(0, startOfline) +
        newLine +
        props.body.slice(endOfLine);
      props.onChangeBody(newBody);

      putCursorToPoistion(cursorPosition);
      return;
    } else {
      const newLine = thisLine.replace(checkedRegex, uncheckedText);
      const newBody =
        props.body.slice(0, startOfline) +
        newLine +
        props.body.slice(endOfLine);
      props.onChangeBody(newBody);

      putCursorToPoistion(cursorPosition);
      return;
    }
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
          className="text-xs translate-y-[-1.5px] text-foreLight"
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
 * Entry Card Published
 */

function EntryCardPublished(props: {
  id: string;
  date: string;
  body: string;
  pinned: boolean;
  onDraft: () => void;
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

  useEffect(() => {
    setTimeout(() => {
      addOnClickToTags();
    }, 100);
  }, [null]);

  return <EntryCardContent divRef={divRef} body={props.body} />;
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
