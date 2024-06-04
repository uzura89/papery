import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_FETCH_PREMIUM_PLANS } from "../../../common/constants";
import { PremiumPlanType } from "../../../common/types/premium.types";

/**
 * Definition
 */

export const callFetchPremiumPlans = action;

const METHOD = "GET";
const ENDPOINT = CONS_ENDPOINT_FETCH_PREMIUM_PLANS;

type ExpectedReqType = {};

type ExpectedResType = {
  premiumPlans: PremiumPlanType[];
};

function checkData(data: any) {
  return typeof data.premiumPlans === "object";
}

/**
 * Action
 */

async function action(params: ExpectedReqType) {
  const response = await callApi(ENDPOINT, {
    method: METHOD,
    data: params,
  });

  return handleResponse<ExpectedResType>(response, checkData);
}
