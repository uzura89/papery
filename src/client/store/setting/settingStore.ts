import { create } from "zustand";

import { callFetchEntriesCsv } from "../../api/entry/callFetchEntriesCsv";
import { downloadCSV } from "../../modules/csv/downloadCsv";
import { PremiumPlanType } from "../../../common/types/premium.types";
import { callFetchPremiumPlans } from "../../api/premium/callFetchPremiumPlans";
import { callFetchSetting } from "../../api/setting/callFetchSetting";
import { callUpdateTheme } from "../../api/setting/callUpdateTheme";
import { CONS_SETTING_THEME_LIGHT } from "../../../common/constants/setting.cons";

const useSettingStore = create<{
  fetchSetting: () => void;
  // download entries
  isDownloading: boolean;
  downloadEntries: () => void;
  // preimum plans
  premiumPlans: PremiumPlanType[];
  fetchPremiumPlans: () => void;
  // theme
  theme: string | undefined;
  updateTheme: (theme: string) => void;
}>((set, get) => ({
  fetchSetting: async () => {
    const response = await callFetchSetting({});
    if (response.error) return;

    // update theme
    set({ theme: response.data.setting.theme || CONS_SETTING_THEME_LIGHT });
  },
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
  // theme
  theme: undefined,
  updateTheme: async (theme) => {
    set({ theme });

    // try updating theme in db
    await callUpdateTheme({ theme });
  },
}));

export default useSettingStore;
