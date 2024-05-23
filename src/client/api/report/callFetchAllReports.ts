import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_FETCH_ALL_REPORTS } from "../../../common/constants";
import { ReportBaseType } from "../../../common/types";

/**
 * Definition
 */

export const callFetchAllReports = action;

const METHOD = "GET";
const ENDPOINT = CONS_ENDPOINT_FETCH_ALL_REPORTS;

type ExpectedReqType = {};

type ExpectedResType = {
  reports: ReportBaseType[];
};

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
