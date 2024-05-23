import { useState, useEffect, useRef } from "react";

import { BlankButton } from "../../atoms/buttons/BlankButton";
import { Card } from "../../atoms/card/Card";
import Textarea from "../../atoms/input/Textarea";
import useTagSelectionStore from "../../../store/entry/tagSelectionStore";
import { LuTrash, LuMoreVertical } from "react-icons/lu";
import Dropdown from "../../molecules/selection/Dropdown";
import clsx from "clsx";
import { text } from "body-parser";

export default function TemplateForm(props: {
  initName: string;
  initBodies: string[];
  onClickSave: (title: string, bodies: string[]) => void;
  onClickCancel: () => void;
  onClickDelete?: () => void;
}) {
  const [name, setName] = useState(props.initName);
  const [bodies, setBodies] = useState(props.initBodies);

  /**
   * Helper Functions
   */

  function initializeState() {
    setName(props.initName);
    setBodies(props.initBodies);
  }

  function hasChanged() {
    return (
      name !== props.initName || bodies.join("") !== props.initBodies.join("")
    );
  }

  /**
   * Event Handlers
   */

  function onClickAdd() {
    setBodies([...bodies, ""]);
  }

  function onChangeBody(index: number, value: string) {
    setBodies(bodies.map((b, i) => (i === index ? value : b)));
  }

  function onDeleteBody(index: number) {
    setBodies(bodies.filter((b, i) => i !== index));
  }

  function handleClickSave() {
    if (name.trim().length === 0) {
      alert("Template name cannot be empty.");
      return;
    }
    if (bodies.length === 0) {
      alert("Template bodies cannot be empty.");
      return;
    }
    props.onClickSave(name, bodies);
  }

  function handleClickCancel() {
    if (hasChanged()) {
      const response = window.confirm(
        "Are you sure you want to discard changes?"
      );
      if (!response) return;
    }
    props.onClickCancel();
  }

  function handleClickDelete() {
    if (props.onClickDelete) {
      const response = window.confirm("Are you sure you want to delete?");
      if (!response) return;

      props.onClickDelete();
    }
  }

  useEffect(() => {
    initializeState();
  }, [props.initName, props.initBodies]);

  return (
    <Card>
      <div className="relative padding-x-sm pt-5 pb-1">
        <div className="font-bold text-fore text-sm mb-2">Name</div>
        <input
          className="form text-lg w-full font-bold text-fore py-1.5"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Template name"
        />

        {/* New Template Button */}
        <div className="mt-4">
          <div className="font-bold text-fore text-sm mb-2">Entries</div>

          {/* Template Bodies */}
          <div className="flex flex-col">
            {bodies.map((body, index) => (
              <div className="mb-3" key={index}>
                <TemplateBody
                  index={index}
                  body={body}
                  onChange={onChangeBody}
                  onDelete={onDeleteBody}
                />
              </div>
            ))}
          </div>

          <div className="mt-1">
            <BlankButton onClick={onClickAdd}>+ Add Entry</BlankButton>
          </div>
        </div>

        {/* Buttons */}
        <div className="border-t border-border mt-6 flex justify-between py-4">
          {/* Left */}
          <div>
            {props.onClickDelete && (
              <button
                className="btn btn-text text-foreDanger"
                onClick={handleClickDelete}
              >
                Delete
              </button>
            )}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <button
              className={clsx("btn btn-text")}
              onClick={handleClickCancel}
            >
              Cancel
            </button>
            <button className="btn" onClick={handleClickSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

/**
 * Body Editor
 */

function TemplateBody(props: {
  index: number;
  body: string;
  onChange: (index: number, value: string) => void;
  onDelete: (index: number) => void;
}) {
  const tagSelectionStore = useTagSelectionStore();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const onKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // open tag selection modal
    if (e.key === "#") {
      if (!textareaRef.current) return;
      tagSelectionStore.openModal(textareaRef, (newBody: string) =>
        props.onChange(props.index, newBody)
      );
    }
  };

  return (
    <Card key={props.index}>
      <div className="relative pt-3 pb-4 px-6">
        <div className="absolute top-[14px] right-4">
          <BodyOption onClickDelete={() => props.onDelete(props.index)} />
        </div>

        <Textarea
          textareaRef={textareaRef}
          value={props.body}
          onChange={(e) => props.onChange(props.index, e.target.value)}
          placeholder="Write template body..."
          extensible
          height={50}
          onKeyUp={onKeyUp}
        />
      </div>
    </Card>
  );
}

/**
 * Body Option
 */

function BodyOption(props: { onClickDelete: () => void }) {
  const items = [
    {
      text: "Delete",
      onClick: props.onClickDelete,
      icon: <LuTrash />,
      isDanger: true,
    },
  ];

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
