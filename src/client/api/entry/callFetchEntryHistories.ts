import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_FETCH_ENTRY_HISTORIES } from "../../../common/constants";
import { EntryHistoryType } from "../../../common/types/entryHistory.types";

/**
 * Definition
 */

export const callFetchEntryHistories = action;

const METHOD = "GET";
const ENDPOINT = CONS_ENDPOINT_FETCH_ENTRY_HISTORIES;

type ExpectedReqType = {
  year: string;
  tags: string[];
};

type ExpectedResType = {
  entryHistories: EntryHistoryType[];
};

function checkData(data: any) {
  return typeof data.entryHistories === "object";
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
