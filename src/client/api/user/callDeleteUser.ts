import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_DELETE_USER } from "../../../common/constants";

/**
 * Definition
 */

export const callDeleteUser = action;

const METHOD = "POST";
const ENDPOINT = CONS_ENDPOINT_DELETE_USER;

type ExpectedReqType = {};

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
