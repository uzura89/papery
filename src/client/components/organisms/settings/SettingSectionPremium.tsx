import { LuCog, LuCrown } from "react-icons/lu";

import {
  CONS_MODAL_UPGRADE,
  CONS_URL_CUSTOMER_PORTAL,
} from "../../../../common/constants";
import useUiStore from "../../../store/ui/uiStore";
import useUserStore from "../../../store/user/userStore";
import { CONS_PREMIUM_TYPE_LIFETIME } from "../../../../common/constants/setting.cons";
import { convertDateToEnglishString } from "../../../../common/modules/date/convertDateToReadableString";

export default function SettingSectionPremium() {
  const userStore = useUserStore();
  const uiStore = useUiStore();

  function onClickUpgrade() {
    uiStore.setVisibleModal(CONS_MODAL_UPGRADE);
  }

  function onClickManage() {
    window.open(CONS_URL_CUSTOMER_PORTAL);
  }

  if (userStore.loading) return null;

  if (userStore.checkIfPremium()) {
    return (
      <div>
        {/* Subscriptoin info */}
        {userStore.data.user.subscriptionCancelAtPeriodEnd ? (
          <div className="">
            Your subscription will end on{" "}
            <span className="font-bold text-forePositive">
              {convertDateToEnglishString(
                new Date(userStore.data.user.subscriptionCurrentPeriodEnd || 0)
              )}
            </span>
            .
          </div>
        ) : (
          <div className="">
            You are subscribed to{" "}
            <span className="font-bold text-forePositive">
              {userStore.data.user.purchasePlan}
            </span>{" "}
            plan.
          </div>
        )}

        {/* Customer portal link */}
        {userStore.data.user.purchasePlan !== CONS_PREMIUM_TYPE_LIFETIME && (
          <button
            className="btn btn-white gap-1.5 mt-3"
            onClick={onClickManage}
          >
            <LuCog className="text-foreLight" /> Manage Subscription
          </button>
        )}
      </div>
    );
  }

  return (
    <button className="btn btn-primary gap-1.5" onClick={onClickUpgrade}>
      <LuCrown />
      Upgrade to Premium
    </button>
  );
}
