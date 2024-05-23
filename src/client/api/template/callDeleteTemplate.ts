import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_DELETE_TEMPLATE } from "../../../common/constants";

/**
 * Definition
 */

export const callDeleteTemplate = action;

const METHOD = "POST";
const ENDPOINT = CONS_ENDPOINT_DELETE_TEMPLATE;

type ExpectedReqType = {
  id: string;
};

type ExpectedResType = {};

function checkData(data: any) {
  return typeof data !== "undefined";
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
