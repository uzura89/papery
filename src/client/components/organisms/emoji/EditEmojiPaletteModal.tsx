import { useEffect, useRef, useState } from "react";

import { useClickOutsideEffect } from "../../../modules/ui/useOutsideClick";
import useEmojiStore from "../../../store/emoji/emojiStore";
import Modal from "../../molecules/modal/Modal";
import { ModalHeader } from "../../molecules/modal/ModalHeader";
import useSettingStore from "../../../store/setting/settingStore";
import { ModalFooter } from "../../molecules/modal/ModalFooter";
import useUserStore from "../../../store/user/userStore";
import useUiStore from "../../../store/ui/uiStore";
import {
  CONS_MODAL_EDIT_EMOJI_PALETTE,
  CONS_MODAL_UPGRADE,
} from "../../../../common/constants";

export default function EditEmojiPaletteModal() {
  // store
  const emojiStore = useEmojiStore();
  const settingStore = useSettingStore();
  const userStore = useUserStore();
  const uiStore = useUiStore();
  // refs
  const windowRef = useRef<HTMLDivElement>(null);
  // local state
  const [emojiPalette, setEmojiPalette] = useState<string>(
    settingStore.emojiPalette
  );
  // constants
  const isPremium = userStore.checkIfPremium();
  const isVisible = uiStore.visibleModal === CONS_MODAL_EDIT_EMOJI_PALETTE;

  /**
   * User Actions
   */

  function onChangeEmojiPalette(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (!isPremium) {
      const response = window.confirm(
        "Please upgrade to customize your emoji palette."
      );
      if (response) {
        uiStore.setVisibleModal(CONS_MODAL_UPGRADE);
      }
      return;
    }

    setEmojiPalette(e.target.value);
  }

  function closeModal() {
    uiStore.setVisibleModal("");
  }

  function onResetEmojiPalette() {
    const response = window.confirm(
      "Are you sure you want to reset your emoji palette? Your custome emoji palette will be lost."
    );
    if (!response) return;

    settingStore.resetEmojiPalette();
  }

  function onSaveEmojiPalette() {
    settingStore.updateEmojiPalette(emojiPalette);
    closeModal();
  }

  useClickOutsideEffect(windowRef, closeModal, isVisible);

  useEffect(() => {
    setEmojiPalette(settingStore.emojiPalette);
  }, [settingStore.emojiPalette]);

  /**
   * Render
   */

  if (!settingStore.emojiPalette) return null;

  return (
    <Modal visible={isVisible} closeModal={closeModal} width="600px">
      <ModalHeader title="Emoji Palette" />
      <div className="padding-x-sm py-4">
        <p className="mb-3">*Please separate each emoji with a space.</p>
        <textarea
          className="form w-full h-[50vh]"
          value={emojiPalette}
          onChange={onChangeEmojiPalette}
          placeholder="Enter your emoji palette here..."
        />
      </div>

      <ModalFooter>
        <button className="btn btn-danger" onClick={onResetEmojiPalette}>
          Reset to Default
        </button>
        <button className="btn btn-primary" onClick={onSaveEmojiPalette}>
          Save
        </button>
      </ModalFooter>
    </Modal>
  );
}
