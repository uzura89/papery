import { LuCrown, LuUser2 } from "react-icons/lu";

import { Card } from "../atoms/card/Card";
import { PageSection, PageTitle, PageWrapper } from "../wrappers/PageShell";
import useSettingStore from "../../store/setting/settingStore";
import SettingSectionPremium from "../organisms/settings/SettingSectionPremium";
import SettingSectionAccount from "../organisms/settings/SettingSectionAccount";

export default function AccountPage() {
  return (
    <PageWrapper>
      <div className="container-tiny">
        <PageTitle title="Account" />

        <div className="flex flex-col gap-4">
          <SectionCard>
            <PageSection title="Subscription" icon={<LuCrown />}>
              <SettingSectionPremium />
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
