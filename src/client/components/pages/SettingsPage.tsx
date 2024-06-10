import clsx from "clsx";
import { LuCog, LuCrown, LuDownload, LuPalette, LuUser2 } from "react-icons/lu";

import { Card } from "../atoms/card/Card";
import { PageSection, PageTitle, PageWrapper } from "../wrappers/PageShell";
import useSettingStore from "../../store/setting/settingStore";
import SettingSectionPremium from "../organisms/settings/SettingSectionPremium";
import SettingSectionAccount from "../organisms/settings/SettingSectionAccount";
import SettingSectionTheme from "../organisms/settings/SettingSectionTheme";
import SettingSectionEncryption from "../organisms/settings/SettingSectionEncryption";

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
            <PageSection title="General" icon={<LuCog />}>
              <SettingSectionEncryption />
            </PageSection>
          </SectionCard>

          <SectionCard>
            <PageSection title="Style" icon={<LuPalette />}>
              <SettingSectionTheme />
            </PageSection>
          </SectionCard>

          <SectionCard>
            <PageSection title="Subscription" icon={<LuCrown />}>
              <SettingSectionPremium />
            </PageSection>
          </SectionCard>

          <SectionCard>
            <PageSection title="Download" icon={<LuDownload />}>
              <button
                onClick={onClickDownloadEntries}
                className={clsx(
                  "btn gap-1.5",
                  settingStore.isDownloading ? "btn-disabled" : ""
                )}
              >
                Download Entries (CSV)
              </button>
            </PageSection>
          </SectionCard>

          <SectionCard>
            <PageSection title="Account" icon={<LuUser2 />}>
              <SettingSectionAccount />
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
