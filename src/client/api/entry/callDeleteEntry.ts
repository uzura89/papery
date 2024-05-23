import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_DELETE_ENTRY } from "../../../common/constants";

/**
 * Definition
 */

export const callDeleteEntry = action;

const METHOD = "POST";
const ENDPOINT = CONS_ENDPOINT_DELETE_ENTRY;

type ExpectedReqType = {
  id: string;
};

type ExpectedResType = {
  entryId: string;
};

function checkData(data: any) {
  return typeof data.entryId === "string";
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
