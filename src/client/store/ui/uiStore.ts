import { create } from "zustand";

const useUiStore = create<{
  // calendar for mobile
  isCalendarVisible: boolean;
  toggleCalendarVisibility: () => void;
  // modals
  visibleModal: string | null;
  setVisibleModal: (modal: string | null) => void;
}>((set, get) => ({
  // calendar modal
  isCalendarVisible: false,
  toggleCalendarVisibility: () => {
    set((state) => ({
      isCalendarVisible: !state.isCalendarVisible,
    }));
  },
  // premium modal
  visibleModal: null,
  setVisibleModal: (modal) => {
    set({ visibleModal: modal });
  },
}));

export default useUiStore;
