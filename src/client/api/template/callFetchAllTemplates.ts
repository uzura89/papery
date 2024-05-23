import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_FETCH_ALL_TEMPLATES } from "../../../common/constants";
import { TemplateBaseType } from "../../../common/types";

/**
 * Definition
 */

export const callFetchAllTemplates = action;

const METHOD = "GET";
const ENDPOINT = CONS_ENDPOINT_FETCH_ALL_TEMPLATES;

type ExpectedReqType = {};

type ExpectedResType = {
  templates: TemplateBaseType[];
};

function checkData(data: any) {
  return typeof data.templates !== "undefined";
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
