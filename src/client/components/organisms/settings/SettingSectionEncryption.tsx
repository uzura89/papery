import useSettingStore from "../../../store/setting/settingStore";
import PremiumIcon from "../../atoms/marks/PremiumIcon";
import Switcher from "../../atoms/input/Switcher";
import useUserStore from "../../../store/user/userStore";
import useUiStore from "../../../store/ui/uiStore";
import { CONS_MODAL_UPGRADE } from "../../../../common/constants";

export default function SettingSectionEncryption() {
  const settingStore = useSettingStore();
  const userStore = useUserStore();
  const uiStore = useUiStore();
  const isPremium = userStore.checkIfPremium();

  function onSelectTextSearchEnabled(enabled: boolean) {
    if (enabled) {
      // confirm
      const response = window.confirm(
        "[Notice] With this setting enabled, your entries will NOT be encrypted on the server. Do you want to continue?"
      );
      if (!response) return;

      // premium check
      if (!isPremium) {
        window.alert("This feature is only available for premium users.");
        uiStore.setVisibleModal(CONS_MODAL_UPGRADE);
        return;
      }
    }
    settingStore.updateTextSearch(enabled);
  }

  if (!settingStore.theme) return null;

  return (
    <div className="">
      <SettingItem label="Text Search" needPremium isPremium={isPremium}>
        <div className="w-[100px]">
          <Switcher
            enabled={settingStore.textSearchEnabled}
            onChange={onSelectTextSearchEnabled}
            enabledText="Enabled"
            disabledText="Disabled"
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
          <PremiumIcon isPremium={props.isPremium} />
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
