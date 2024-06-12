import { Fragment, useState } from "react";
import clsx from "clsx";

import { CONS_MODAL_UPGRADE } from "../../../../common/constants";
import useSettingStore from "../../../store/setting/settingStore";
import useUiStore from "../../../store/ui/uiStore";
import Modal from "../../molecules/modal/Modal";
import { ModalFooter } from "../../molecules/modal/ModalFooter";
import { ModalHeader } from "../../molecules/modal/ModalHeader";
import { callCreateCheckoutSession } from "../../../api/premium/callCreateCheckoutSession";

export default function UpgradeModal() {
  const uiStore = useUiStore();
  const settingStore = useSettingStore();
  // local state
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [loading, setLoading] = useState(false);

  function closeModal() {
    uiStore.setVisibleModal(null);
  }

  async function onClickProceed() {
    setLoading(true);
    const selectedPlan = settingStore.premiumPlans[selectedIndex];

    const response = await callCreateCheckoutSession({
      priceId: selectedPlan.id,
    });
    if (response.error) {
      window.alert(response.error.message);
      setLoading(false);
      return;
    }

    window.location.href = response.data.checkoutUrl;
  }

  return (
    <Modal
      closeModal={closeModal}
      width="390px"
      visible={uiStore.visibleModal === CONS_MODAL_UPGRADE}
    >
      <ModalHeader title="Upgrade to Premium" />
      <div className="padding-x-sm">
        <Label text="Benefits" />
        <Benefits />

        <Label text="Plans" />
        <div className="flex gap-3">
          {settingStore.premiumPlans.map((plan, index) => (
            <PlanCard
              key={plan.id}
              selected={selectedIndex === index}
              onSelectPlan={() => setSelectedIndex(index)}
              title={plan.title}
              price={plan.price}
              isRecurring={plan.isRecurring}
            />
          ))}
        </div>

        <ul className="text-foreSecondary text-sm mb-5">
          {selectedIndex === 0 && (
            <li>
              * The subscription will automatically renew every month until you
              cancel.
            </li>
          )}
          {selectedIndex === 1 && (
            <Fragment>
              <li>* Save 33% with yearly plan</li>
              <li>
                * The subscription will automatically expire after 1 year.
              </li>
            </Fragment>
          )}
        </ul>
      </div>

      <ModalFooter>
        <button
          onClick={onClickProceed}
          className={clsx("btn btn-primary w-full", loading && "btn-disabled")}
        >
          Proceed
        </button>
      </ModalFooter>
    </Modal>
  );
}

function Label(props: { text: string }) {
  return (
    <div className="text-foreLight text-sm font-bold mt-3 mb-3">
      {props.text}
    </div>
  );
}

function Benefits() {
  return (
    <div className="">
      <div className="text-foreSecondary">
        <ul className="list-disc list-inside">
          <li className="">🗒 Create more than 2 entries per day</li>
          <li className="">📔 Save more than 1 template</li>
          <li className="">📊 Save more than 1 report</li>
          <li className="">🔍 Search entries by text</li>
          <li className="">😊 Customize emoji palette</li>

          <li className="">And all the future updates...</li>
        </ul>
      </div>
    </div>
  );
}

function PlanCard(props: {
  selected: boolean;
  onSelectPlan: () => void;
  title: string;
  price: number;
  isRecurring: boolean;
}) {
  return (
    <div
      onClick={props.onSelectPlan}
      className={clsx(
        "cursor-pointer border-[1.5px] rounded-md p-3 mb-4 w-full flex flex-col items-center gap-1",
        props.selected ? "border-[#34c388]" : "border-borderLight"
      )}
    >
      <div className="font-bold text-[#1db480] text-sm">{props.title}</div>
      <div className="text-foreSecondary text-2xl font-bold">
        ${props.price}
        <span className="text-xs mb-1 font-normal ml-1">
          {props.title === "Yearly" && "/ year"}
          {props.title === "Monthly" && "/ month"}
        </span>
      </div>

      <div
        className={clsx(
          "text-foreSecondary bg-textHoverBg text-xs rounded-full py-0.5 px-2 font-medium mt-2"
        )}
      >
        {props.isRecurring ? "Auto renew" : "Auto expire"}
      </div>
    </div>
  );
}
