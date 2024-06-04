import { create } from "zustand";

import { callFetchEntriesCsv } from "../../api/entry/callFetchEntriesCsv";
import { downloadCSV } from "../../modules/csv/downloadCsv";
import { PremiumPlanType } from "../../../common/types/premium.types";
import { callFetchPremiumPlans } from "../../api/premium/callFetchPremiumPlans";

const useSettingStore = create<{
  // download entries
  isDownloading: boolean;
  downloadEntries: () => void;
  // preimum plans
  premiumPlans: PremiumPlanType[];
  fetchPremiumPlans: () => void;
}>((set, get) => ({
  // download entries
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
  // premium plans
  premiumPlans: [],
  fetchPremiumPlans: async () => {
    const response = await callFetchPremiumPlans({});
    if (response.error) {
      window.alert(response.error.message);
      return;
    }

    set({ premiumPlans: response.data.premiumPlans });
  },
}));

export default useSettingStore;
