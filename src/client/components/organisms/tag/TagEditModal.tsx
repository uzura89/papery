import { useState, useEffect } from "react";
import { TagType } from "../../../../common/types/tag.types";
import useTagStore from "../../../store/tag/tagStore";
import Modal from "../../molecules/modal/Modal";
import { ModalCloseButton } from "../../molecules/modal/ModalCloseButton";
import { ModalFooter } from "../../molecules/modal/ModalFooter";
import { ModalHeader } from "../../molecules/modal/ModalHeader";
import { TagForm } from "./TagForm";

export function TagEditModal(props: {
  visible: boolean;
  selectedTag: TagType;
  closeModal: () => void;
}) {
  // store
  const tagStore = useTagStore();
  // state
  const [newText, setNewText] = useState(props.selectedTag.text);
  const [newColor, setNewColor] = useState(props.selectedTag.color);

  function closeModal() {
    setNewText("");
    setNewColor("");
    props.closeModal();
  }

  function onClickSave() {
    const tagWithSameText = tagStore.tags
      .filter((t) => t.id !== props.selectedTag.id)
      .find((tag) => tag.text === newText);

    if (tagWithSameText) {
      const response = window.confirm(
        "The same tag name already exists. Do you want to combine them?"
      );
      if (response) {
        tagStore.combineTags(
          props.selectedTag.id,
          props.selectedTag.text,
          newText
        );
      }
    } else {
      tagStore.updateTag(props.selectedTag.id, newText, newColor);
    }

    closeModal();
  }

  function onClickDelete() {
    const confirm = window.confirm("Are you sure you want to delete this tag?");
    if (!confirm) return;

    tagStore.deleteTag(props.selectedTag.id);

    closeModal();
  }

  /**
   * Effect
   */

  useEffect(() => {
    setNewColor(props.selectedTag.color);
    setNewText(props.selectedTag.text);
  }, [props.visible]);

  /*
   * Render
   */

  return (
    <Modal visible={props.visible} closeModal={closeModal} width="380px">
      {/* header */}
      <ModalCloseButton onClick={closeModal} />
      <ModalHeader title="Edit Tag" />

      {/* Forms */}
      <TagForm
        name={newText}
        color={newColor}
        setName={setNewText}
        setColor={setNewColor}
      />

      {/* footer butons */}
      <ModalFooter>
        <div>
          <button
            className="btn btn-text text-foreDanger"
            onClick={onClickDelete}
          >
            Delete
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn btn-text text-foreLight" onClick={closeModal}>
            Cancel
          </button>
          <button className="btn" onClick={onClickSave}>
            Save
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
