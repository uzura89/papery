import clsx from "clsx";
import { LuDownload } from "react-icons/lu";

import { Card } from "../atoms/card/Card";
import { PageSection, PageTitle, PageWrapper } from "../wrappers/PageShell";
import useSettingStore from "../../store/setting/settingStore";
import SettingSectionPremium from "../organisms/settings/SettingSectionPremium";

export default function SettingsPage() {
  const settingStore = useSettingStore();

  function onClickDownloadEntries() {
    settingStore.downloadEntries();
  }

  return (
    <PageWrapper>
      <div className="container-tiny">
        <PageTitle title="Settings" />

        <div className="flex flex-col gap-4">
          <SectionCard>
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
          </SectionCard>

          <SectionCard>
            <PageSection title="Subscription">
              <SettingSectionPremium />
            </PageSection>
          </SectionCard>
        </div>
      </div>
    </PageWrapper>
  );
}

function SectionCard(props: { children: React.ReactNode }) {
  return (
    <div>
      <Card>
        <div className="p-4 flex flex-col gap-4">{props.children}</div>
      </Card>
    </div>
  );
}
