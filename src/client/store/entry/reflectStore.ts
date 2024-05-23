import { create } from "zustand";

import { ReflectionType } from "../../../common/types/reflect.types";
import { callFetchReflections } from "../../api/entry/callFetchReflections";

const useReflectStore = create<{
  reflections: ReflectionType[];
  isLoaded: boolean;
  fetchReflections: (today: string) => void;
}>((set, get) => ({
  reflections: [],
  isLoaded: false,
  fetchReflections: async (today: string) => {
    const response = await callFetchReflections({ today });
    if (response.error) return;

    const { reflections } = response.data;

    set({ reflections, isLoaded: true });
  },
}));

export default useReflectStore;
