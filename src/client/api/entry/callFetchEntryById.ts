import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_FETCH_ENTRY_BY_ID } from "../../../common/constants";
import { EntryType } from "../../../common/types";

/**
 * Definition
 */

export const callFetchEntryById = action;

const METHOD = "GET";
const ENDPOINT = CONS_ENDPOINT_FETCH_ENTRY_BY_ID;

type ExpectedReqType = {
  id: string;
};

type ExpectedResType = {
  entry: EntryType;
};

function checkData(data: any) {
  return typeof data.entry === "object";
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
