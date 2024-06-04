import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_CANCEL_SUBSCRIPTION } from "../../../common/constants";

/**
 * Definition
 */

export const callCancelSubscription = action;

const METHOD = "POST";
const ENDPOINT = CONS_ENDPOINT_CANCEL_SUBSCRIPTION;

type ExpectedReqType = {};

type ExpectedResType = {
  cancelOnPeriodEnd: boolean;
  subscriptionRenewalDate: number;
};

function checkData(data: any) {
  return typeof data.checkoutUrl === "string";
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
