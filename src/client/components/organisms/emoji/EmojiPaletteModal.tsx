import { useRef } from "react";

import { useClickOutsideEffect } from "../../../modules/ui/useOutsideClick";
import useEmojiStore from "../../../store/emoji/emojiStore";
import Modal from "../../molecules/modal/Modal";
import { ModalHeader } from "../../molecules/modal/ModalHeader";
import useSettingStore from "../../../store/setting/settingStore";

export default function EmojiPaletteModal() {
  // store
  const emojiStore = useEmojiStore();
  const settingStore = useSettingStore();
  // refs
  const windowRef = useRef<HTMLDivElement>(null);
  // constants
  const isVisible = emojiStore.emojiModalOpen;

  /**
   * User Actions
   */

  function closeModal() {
    emojiStore.closeEmojiModal();
  }

  function onClickEmoji(emoji: string) {
    emojiStore.addEmojiToEntry(emoji);
    // close modal
    closeModal();
  }

  useClickOutsideEffect(windowRef, closeModal, isVisible);
  /**
   * Render
   */

  if (!settingStore.emojiPalette) return null;

  return (
    <Modal visible={isVisible} closeModal={closeModal} width="600px">
      <div className="bg-backLight">
        <ModalHeader title="Emoji Palette" />
        <div className="padding-x-sm py-4">
          {settingStore.emojiPalette.split("\n").map((line, index) => {
            const hasEmoji = /\p{Extended_Pictographic}/u.test(line);

            if (!hasEmoji) {
              return (
                <div key={index} className="text-foreLight text-sm mt-3 mb-0.5">
                  {line}
                </div>
              );
            }

            const emojiArray = line.split(" ");

            return (
              <div
                key={index}
                className="grid gap-1 grid-cols-6 lg:grid-cols-12"
              >
                {emojiArray.map((emoji, index) => {
                  if (emoji.match(/\s/) || emoji === "") return null;
                  return (
                    <div
                      key={index}
                      className="clickable-text min-w-[1.5em] min-h-[1.5em] rounded-md flex items-center justify-center text-2xl lg:text-3xl"
                      onClick={() => onClickEmoji(emoji)}
                    >
                      {emoji}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
