import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_TOGGLE_PIN_OF_ENTRY } from "../../../common/constants";

/**
 * Definition
 */

export const callTogglePinOfEntry = action;

const METHOD = "POST";
const ENDPOINT = CONS_ENDPOINT_TOGGLE_PIN_OF_ENTRY;

type ExpectedReqType = {
  id: string;
  pinned: boolean;
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
