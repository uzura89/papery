import { EntrySchemaType } from "./../../../common/types/entry.types";
import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_FETCH_ENTRIES_BY_TEXT } from "../../../common/constants";

/**
 * Definition
 */

export const callFetchEntriesByText = action;

const METHOD = "GET";
const ENDPOINT = CONS_ENDPOINT_FETCH_ENTRIES_BY_TEXT;

type ExpectedReqType = {
  text: string;
};

type ExpectedResType = {
  entries: EntrySchemaType[];
};

function checkData(data: any) {
  return typeof data.entries !== "undefined";
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
