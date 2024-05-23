import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_FETCH_ENTRIES_CSV } from "../../../common/constants";

/**
 * Definition
 */

export const callFetchEntriesCsv = action;

const METHOD = "GET";
const ENDPOINT = CONS_ENDPOINT_FETCH_ENTRIES_CSV;

type ExpectedReqType = {};

type ExpectedResType = {
  csvContent: string;
};

function checkData(data: any) {
  return typeof data.csvContent !== undefined;
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
