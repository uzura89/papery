import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_CREATE_TEMPLATE } from "../../../common/constants";
import { TemplateBaseType } from "../../../common/types";

/**
 * Definition
 */

export const callCreateTemplate = action;

const METHOD = "POST";
const ENDPOINT = CONS_ENDPOINT_CREATE_TEMPLATE;

type ExpectedReqType = TemplateBaseType;

type ExpectedResType = {};

function checkData(data: any) {
  return typeof data !== "undefined";
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
