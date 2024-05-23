import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_FETCH_REPORT_DATA } from "../../../common/constants";
import { ReportDataType, ReportQueryType } from "../../../common/types";

/**
 * Definition
 */

export const callFetchReportData = action;

const METHOD = "GET";
const ENDPOINT = CONS_ENDPOINT_FETCH_REPORT_DATA;

type ExpectedReqType = ReportQueryType;

type ExpectedResType = {
  reportData: ReportDataType;
};

function checkData(data: any) {
  return typeof data.reportData === "object";
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
