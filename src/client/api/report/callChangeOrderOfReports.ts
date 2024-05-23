import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_CHANGE_ORDER_OF_REPORTS } from "../../../common/constants";

/**
 * Definition
 */

export const callChangeOrderOfReports = action;

const METHOD = "POST";
const ENDPOINT = CONS_ENDPOINT_CHANGE_ORDER_OF_REPORTS;

type ExpectedReqType = {
  orderInfo: { id: string; order: number }[];
};

type ExpectedResType = {};

function checkData(data: any) {
  return typeof data === "object";
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
