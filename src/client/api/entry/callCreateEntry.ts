import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_CREATE_ENTRY } from "../../../common/constants";

/**
 * Definition
 */

export const callCreateEntry = action;

const METHOD = "POST";
const ENDPOINT = CONS_ENDPOINT_CREATE_ENTRY;

type ExpectedReqType = {
  id: string;
  body: string;
  date: string;
};

type ExpectedResType = {
  id: string;
};

function checkData(data: any) {
  return typeof data.id === "string";
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
