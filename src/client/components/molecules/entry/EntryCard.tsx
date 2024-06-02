import { useRef } from "react";
import {
  LuFileEdit,
  LuMoreVertical,
  LuPin,
  LuPinOff,
  LuTrash,
} from "react-icons/lu";

import Dropdown from "../selection/Dropdown";
import EntryCardWrapper from "../../atoms/entry/EntryCardWrapper";
import { EntryCardDraft } from "./components/EntryCardDraft";
import { EntryCardPublished } from "./components/EntryCardPublished";

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

  const handleUpdateBody = (newBody: string) => {
    props.onChangeEntry(props.id, newBody, props.date);
    entryRef.current.body = newBody;
    saveToServer();
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
          onUpdateBody={handleUpdateBody}
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
