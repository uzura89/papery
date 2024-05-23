import { create } from "zustand";

const useUiStore = create<{
  // data
  isCalendarVisible: boolean;
  // data loader
  toggleCalendarVisibility: () => void;
}>((set, get) => ({
  // data
  isCalendarVisible: false,
  // data loader
  toggleCalendarVisibility: () => {
    set((state) => ({
      isCalendarVisible: !state.isCalendarVisible,
    }));
  },
}));

export default useUiStore;
