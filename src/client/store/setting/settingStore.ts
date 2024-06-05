import { create } from "zustand";

import { callFetchEntriesCsv } from "../../api/entry/callFetchEntriesCsv";
import { downloadCSV } from "../../modules/csv/downloadCsv";
import { PremiumPlanType } from "../../../common/types/premium.types";
import { callFetchPremiumPlans } from "../../api/premium/callFetchPremiumPlans";
import { CONS_SETTING_THEME_LIGHT } from "../../../common/constants/setting.cons";
import { callFetchSetting } from "../../api/setting/callFetchSetting";
import { callUpdateTheme } from "../../api/setting/callUpdateTheme";

const useSettingStore = create<{
  fetchSetting: () => void;
  // download entries
  isDownloading: boolean;
  downloadEntries: () => void;
  // preimum plans
  premiumPlans: PremiumPlanType[];
  fetchPremiumPlans: () => void;
  // theme
  theme: string;
  updateTheme: (theme: string) => void;
}>((set, get) => ({
  fetchSetting: async () => {
    const response = await callFetchSetting({});
    if (response.error) return;

    // update theme
    set({ theme: response.data.setting.theme });
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
  theme: CONS_SETTING_THEME_LIGHT,
  updateTheme: async (theme) => {
    const currentTheme = get().theme;
    // update theme in store
    set({ theme });

    // try updating theme in db
    const response = await callUpdateTheme({ theme });
    if (response.error) {
      // set({ theme: currentTheme });
      // if (response.error.code === 403) {
      //   window.alert("Please upgrade to premium to change theme.");
      // }
      return;
    }
  },
}));

export default useSettingStore;
