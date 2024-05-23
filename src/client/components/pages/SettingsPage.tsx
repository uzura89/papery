import clsx from "clsx";
import { LuDownload } from "react-icons/lu";

import { Card } from "../atoms/card/Card";
import { PageSection, PageTitle, PageWrapper } from "../wrappers/PageShell";
import useSettingStore from "../../store/setting/settingStore";

export default function SettingsPage() {
  const settingStore = useSettingStore();

  function onClickDownloadEntries() {
    settingStore.downloadEntries();
  }

  return (
    <PageWrapper>
      <div className="container-tiny">
        <PageTitle title="Settings" />
        <Card>
          <div className="p-4 flex flex-col gap-4">
            <PageSection title="Download">
              <button
                onClick={onClickDownloadEntries}
                className={clsx(
                  "btn gap-1.5",
                  settingStore.isDownloading ? "btn-disabled" : ""
                )}
              >
                <LuDownload /> Download Entries (CSV)
              </button>
            </PageSection>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
