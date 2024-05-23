import { create } from "zustand";

const useTagSelectionStore = create<{
  // data
  modalOpen: boolean;
  cursorPosition: number;
  textareaRef: React.RefObject<HTMLTextAreaElement> | undefined;
  changeBodyCallback: any;
  openModal: (
    textareaRef: React.RefObject<HTMLTextAreaElement>,
    changeBodyCallback: any
  ) => void;
  closeModal: () => void;
  // placeCursor: (cursorPosition: number) => void;
  addTagToEntry: (tagText: string) => void;
}>((set, get) => ({
  modalOpen: false,
  entryId: "",
  cursorPosition: 0,
  textareaRef: undefined,
  changeBodyCallback: null,
  openModal: (textareaRef, changeBodyCallback) => {
    set({
      modalOpen: true,
      cursorPosition: textareaRef.current!.selectionStart,
      textareaRef,
      changeBodyCallback,
    });
  },
  closeModal: () => {
    set({ modalOpen: false });
  },
  addTagToEntry: (tagText) => {
    const textareaRef = get().textareaRef;
    if (textareaRef === undefined) return;

    // make new body with tag
    const newBody = placeTagInText(
      textareaRef.current!.value,
      tagText,
      get().cursorPosition
    );

    // call change body callback
    const changeBodyCallback = get().changeBodyCallback;
    changeBodyCallback && changeBodyCallback(newBody);

    // focus on the textarea
    textareaRef.current!.focus();
    setTimeout(() => {
      const cursorAfterTag = get().cursorPosition + tagText.length + 2;
      textareaRef.current!.setSelectionRange(cursorAfterTag, cursorAfterTag);
    }, 100);
  },
}));

export default useTagSelectionStore;

/**
 * Helper function
 */

function placeTagInText(body: string, tagText: string, cursorPosition: number) {
  return (
    body.slice(0, cursorPosition) +
    `${tagText}` +
    " " +
    removeDuplicate(body.slice(cursorPosition), tagText)
  );
}

function removeDuplicate(str: string, tag: string) {
  // get match length
  let matchLength = 0;
  for (let i = 0; i < tag.length; i++) {
    if (str[i] === undefined || tag[i] === undefined) break;

    if (str[i].toLowerCase() === tag[i].toLowerCase()) {
      matchLength++;
    } else {
      break;
    }
  }

  // remove duplicate
  return str.slice(matchLength);
}
