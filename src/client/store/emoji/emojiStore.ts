import { create } from "zustand";

const useEmojiStore = create<{
  // emoji modal
  emojiModalOpen: boolean;
  cursorPosition: number;
  textareaRef: React.RefObject<HTMLTextAreaElement> | undefined;
  changeBodyCallback: any;
  openEmojiModal: (
    textareaRef: React.RefObject<HTMLTextAreaElement>,
    changeBodyCallback: any
  ) => void;
  addEmojiToEntry: (emoji: string) => void;
  closeEmojiModal: () => void;
}>((set, get) => ({
  // emoji modal
  emojiModalOpen: false,
  cursorPosition: 0,
  textareaRef: undefined,
  changeBodyCallback: null,
  openEmojiModal: (textareaRef, changeBodyCallback) => {
    set({
      emojiModalOpen: true,
      cursorPosition: textareaRef.current!.selectionStart,
      textareaRef,
      changeBodyCallback,
    });
  },
  addEmojiToEntry: (emoji) => {
    const textareaRef = get().textareaRef;
    if (textareaRef === undefined) return;

    // make new body with tag
    const currentBody = textareaRef.current!.value;
    const cursorPosition = get().cursorPosition;
    const newBody =
      currentBody.slice(0, cursorPosition) +
      emoji +
      currentBody.slice(cursorPosition, currentBody.length);

    // call change body callback
    const changeBodyCallback = get().changeBodyCallback;
    changeBodyCallback && changeBodyCallback(newBody);

    // focus on the textarea
    textareaRef.current!.focus();
    setTimeout(() => {
      const emojiLength = emoji.length;
      const cursorAfterTag = get().cursorPosition + emojiLength;
      textareaRef.current!.setSelectionRange(cursorAfterTag, cursorAfterTag);
    }, 100);
  },
  closeEmojiModal: () => {
    set({ emojiModalOpen: false });
  },
}));

export default useEmojiStore;
