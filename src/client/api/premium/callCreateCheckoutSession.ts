import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_CREATE_CHECKOUT_SESSION } from "../../../common/constants";

/**
 * Definition
 */

export const callCreateCheckoutSession = action;

const METHOD = "POST";
const ENDPOINT = CONS_ENDPOINT_CREATE_CHECKOUT_SESSION;

type ExpectedReqType = {
  priceId: string;
};

type ExpectedResType = {
  checkoutUrl: string;
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
