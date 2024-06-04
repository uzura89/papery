import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../organisms/Header";
import useUserStore from "../../store/user/userStore";
import useEntryStore from "../../store/entry/entryStore";
import useTagStore from "../../store/tag/tagStore";
import useTemplateStore from "../../store/template/templateStore";
import useReportStore from "../../store/report/reportStore";
import UpgradeModal from "../organisms/premium/UpgradeModal";
import useSettingStore from "../../store/setting/settingStore";

export function AppShell() {
  const userStore = useUserStore();
  const entryStore = useEntryStore();
  const tagStore = useTagStore();
  const templateStore = useTemplateStore();
  const reportStore = useReportStore();
  const settingStore = useSettingStore();

  useEffect(() => {
    if (userStore.data.user.userParmId) {
      tagStore.fetchAllTags();
      entryStore.fetchRecentEntries();
      templateStore.fetchAllTemplates();
      reportStore.fetchAllReports();
    }
  }, [userStore.data.user.userParmId]);

  useEffect(() => {
    userStore.fetchUser();
    settingStore.fetchPremiumPlans();
  }, [null]);

  return (
    <div>
      <div className="bg-back h-[100vh] text-fore flex flex-col justify-stretch items-stretch">
        <div className="mb-4 md:mb-10">
          <Header />
        </div>
        <div className="grow overflow-hidden">
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </div>

      <UpgradeModal />
    </div>
  );
}
