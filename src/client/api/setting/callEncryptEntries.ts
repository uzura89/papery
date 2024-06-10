import { CONS_ENDPOINT_ENCRYPT_ENTRIES } from "../../../common/constants";
import callApi, { handleResponse } from "../../modules/api/callApi";

/**
 * Definition
 */

export const callEncryptEntries = action;

const METHOD = "POST";
const ENDPOINT = CONS_ENDPOINT_ENCRYPT_ENTRIES;

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
