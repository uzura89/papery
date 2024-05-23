import { useState, useEffect } from "react";
import { CONS_TAG_COLOR_LIST } from "../../../../common/constants/tag.cons";
import useTagStore from "../../../store/tag/tagStore";
import Modal from "../../molecules/modal/Modal";
import { ModalCloseButton } from "../../molecules/modal/ModalCloseButton";
import { ModalFooter } from "../../molecules/modal/ModalFooter";
import { ModalHeader } from "../../molecules/modal/ModalHeader";
import { TagForm } from "./TagForm";

export function TagCreateModal(props: {
  visible: boolean;
  closeModal: () => void;
}) {
  // store
  const tagStore = useTagStore();
  // state
  const [newText, setNewText] = useState("");
  const [newColor, setNewColor] = useState(CONS_TAG_COLOR_LIST[0]);

  function closeModal() {
    setNewText("");
    setNewColor("");
    props.closeModal();
  }

  function onClickAdd() {
    const tagWithSameText = tagStore.tags.find((tag) => tag.text === newText);

    if (tagWithSameText) {
      window.alert("The same tag name already exists.");
      closeModal();
    }
    tagStore.createTag(newText, newColor);
    closeModal();
  }

  /**
   * Effect
   */

  useEffect(() => {
    setNewColor(CONS_TAG_COLOR_LIST[0]);
    setNewText("");
  }, [props.visible]);

  /*
   * Render
   */

  return (
    <Modal visible={props.visible} closeModal={closeModal} width="380px">
      {/* header */}
      <ModalCloseButton onClick={closeModal} />
      <ModalHeader title="Create Tag" />

      {/* Forms */}
      <TagForm
        name={newText}
        color={newColor}
        setName={setNewText}
        setColor={setNewColor}
      />

      {/* footer butons */}
      <ModalFooter>
        <div></div>
        <div className="flex items-center gap-3">
          <button className="btn btn-text text-foreLight" onClick={closeModal}>
            Cancel
          </button>
          <button className="btn" onClick={onClickAdd}>
            Add
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
