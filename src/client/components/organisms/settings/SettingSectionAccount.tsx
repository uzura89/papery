import clsx from "clsx";
import { useState } from "react";

import { callDeleteUser } from "../../../api/user/callDeleteUser";
import { CONS_PATH_SIGNUP } from "../../../../common/constants";
import Modal from "../../molecules/modal/Modal";
import { ModalHeader } from "../../molecules/modal/ModalHeader";
import { ModalFooter } from "../../molecules/modal/ModalFooter";

export default function SettingSectionAccount() {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  function onClickDelete() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  async function onDelete() {
    setLoading(true);

    const response = await callDeleteUser({});
    if (response.error) {
      window.confirm("Something went wrong");
      return;
    }
    window.confirm("Account deleted successfully");
    // go to signup page
    window.location.href = CONS_PATH_SIGNUP;

    setLoading(false);
  }

  return (
    <div>
      <button
        className={clsx("btn btn-danger gap-1.5", loading && "btn-disabled")}
        onClick={onClickDelete}
      >
        Delete Account
      </button>

      <DeleteAccountModal
        visible={modalVisible}
        onDelete={onDelete}
        onClose={closeModal}
      />
    </div>
  );
}

/**
 * Modal
 */

function DeleteAccountModal(props: {
  visible: boolean;
  onDelete: () => void;
  onClose: () => void;
}) {
  const [input, setInput] = useState("");

  function isInputValid() {
    return input === "delete";
  }

  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function onClickDelete() {
    if (isInputValid()) {
      props.onDelete();
    } else {
      alert("Please type 'delete' to confirm");
    }
  }

  return (
    <Modal visible={props.visible} width="360px" closeModal={props.onClose}>
      <ModalHeader title="Delete Account" />

      <div className="padding-x-sm py-4">
        <p className="text-foreSecondary mb-4">
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>

        <input
          className="form form-md"
          type="text"
          placeholder="Type 'delete' to confirm"
          value={input}
          onChange={onChangeInput}
        />
      </div>

      <ModalFooter>
        <button onClick={props.onClose} className="btn btn-text text-foreLight">
          Cancel
        </button>
        <button
          onClick={onClickDelete}
          className={clsx(
            "btn btn-danger",
            !isInputValid() ? "opacity-50" : ""
          )}
        >
          Delete Account
        </button>
      </ModalFooter>
    </Modal>
  );
}
