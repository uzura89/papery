import { PremiumPlanType } from "../../../common/types/premium.types";

// price id
const CONS_PREMIUM_ID_MONTHLY = "price_1PNS4QEpwRiLHKc45qbVkGcB";
const CONS_PREMIUM_ID_YEARLY = "price_1PNS6gEpwRiLHKc4zzwfsP2v";
const CONS_PREMIUM_ID_LIFETIME = "price_1PNS8GEpwRiLHKc48VKxemYI";

const CONS_PREMIUM_ID_MONTHLY_STG = "price_1PNWBnEpwRiLHKc4LPGzEVtB";
const CONS_PREMIUM_ID_YEARLY_STG = "price_1PNWC1EpwRiLHKc4HdZyCr16";
const CONS_PREMIUM_ID_LIFETIME_STG = "price_1PNWCJEpwRiLHKc4fwS7H7Xb";

export const getPremiumPlans = (env: string): PremiumPlanType[] => {
  const isProd = env === "production";

  return [
    {
      id: isProd ? CONS_PREMIUM_ID_MONTHLY : CONS_PREMIUM_ID_MONTHLY_STG,
      title: "Monthly",
      price: 3,
      isRecurring: true,
    },
    {
      id: isProd ? CONS_PREMIUM_ID_YEARLY : CONS_PREMIUM_ID_YEARLY_STG,
      title: "Yearly",
      price: 24,
      isRecurring: true,
    },
    {
      id: isProd ? CONS_PREMIUM_ID_LIFETIME : CONS_PREMIUM_ID_LIFETIME_STG,
      title: "Lifetime",
      price: 72,
      isRecurring: false,
    },
  ];
};
