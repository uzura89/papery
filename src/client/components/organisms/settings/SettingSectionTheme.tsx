import { LuMoon, LuSun } from "react-icons/lu";

import { CONS_SETTING_THEME_MAP } from "../../../../common/constants/setting.cons";
import useSettingStore from "../../../store/setting/settingStore";
import { FormSelection } from "../../atoms/input/FormSelection";
import PremiumIcon from "../../atoms/marks/PremiumIcon";

export default function SettingSectionTheme() {
  const settingStore = useSettingStore();

  function onSelectTheme(theme: string) {
    settingStore.updateTheme(theme);
  }

  if (!settingStore.theme) return null;

  return (
    <div className="">
      <SettingItem label="Theme">
        <div className="w-28">
          <FormSelection
            maxHeight={200}
            onSelect={onSelectTheme}
            selectedId={settingStore.theme}
            selection={{
              ids: Object.keys(CONS_SETTING_THEME_MAP),
              texts: Object.values(CONS_SETTING_THEME_MAP),
              icons: [<LuSun />, <LuMoon />],
            }}
          />
        </div>
      </SettingItem>
    </div>
  );
}

function SettingItem(props: {
  label: string;
  children: React.ReactNode;
  needPremium?: boolean;
  isPremium?: boolean;
}) {
  function renderPremiumIcon() {
    if (props.needPremium) {
      return (
        <span className="ml-1.5">
          <PremiumIcon isPremium={true} />
        </span>
      );
    }
  }

  return (
    <div className="">
      <div className="font-bold text-sm mb-1.5">
        {props.label}
        {renderPremiumIcon()}
      </div>
      {props.children}
    </div>
  );
}
