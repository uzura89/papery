import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_CREATE_REPORT } from "../../../common/constants";
import { ReportBaseType } from "../../../common/types";

/**
 * Definition
 */

export const callCreateReport = action;

const METHOD = "POST";
const ENDPOINT = CONS_ENDPOINT_CREATE_REPORT;

type ExpectedReqType = {
  reportBase: ReportBaseType;
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
