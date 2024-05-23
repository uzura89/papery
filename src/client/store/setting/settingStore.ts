import { create } from "zustand";
import { callFetchEntriesCsv } from "../../api/entry/callFetchEntriesCsv";
import { downloadCSV } from "../../modules/csv/downloadCsv";

const useSettingStore = create<{
  isDownloading: boolean;
  downloadEntries: () => void;
}>((set, get) => ({
  isDownloading: false,
  downloadEntries: async () => {
    set({ isDownloading: true });

    const response = await callFetchEntriesCsv({});

    if (response.error) {
      window.alert(response.error.message);
      return;
    }

    // download csv
    downloadCSV(response.data.csvContent);

    // download entries
    set({ isDownloading: false });
  },
}));

export default useSettingStore;
