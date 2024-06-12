import useSettingStore from "../../../store/setting/settingStore";
import PremiumIcon from "../../atoms/marks/PremiumIcon";
import Switcher from "../../atoms/input/Switcher";
import useUserStore from "../../../store/user/userStore";
import useUiStore from "../../../store/ui/uiStore";
import {
  CONS_MODAL_EDIT_EMOJI_PALETTE,
  CONS_MODAL_UPGRADE,
} from "../../../../common/constants";
import useEmojiStore from "../../../store/emoji/emojiStore";
import EditEmojiPaletteModal from "../emoji/EditEmojiPaletteModal";

export default function SettingSectionEntry() {
  const settingStore = useSettingStore();
  const emojiStore = useEmojiStore();
  const userStore = useUserStore();
  const uiStore = useUiStore();
  const isPremium = userStore.checkIfPremium();

  function onSelectTextSearchEnabled(enabled: boolean) {
    if (enabled) {
      // confirm
      const response = window.confirm(
        "[Notice] With this setting enabled, all your entries will NOT be encrypted on the server. Do you want to continue?"
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

  function openEditEmojiPaletteModal() {
    uiStore.setVisibleModal(CONS_MODAL_EDIT_EMOJI_PALETTE);
  }

  if (!settingStore.theme) return null;

  return (
    <div className="flex flex-col gap-3">
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
      <div className="w-full h-[1px] bg-borderLight" />
      <SettingItem
        label="Emoji Palette"
        needPremium
        isPremium={userStore.checkIfPremium()}
      >
        <div className="text-foreLight text-sm mt-3 mb-0.5 max-h-[20px] overflow-hidden">
          {settingStore.emojiPalette}
        </div>

        <div className="mt-4">
          <button className="btn" onClick={openEditEmojiPaletteModal}>
            Customize Emoji Palette
          </button>
        </div>
      </SettingItem>

      <EditEmojiPaletteModal />
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
