import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_UPDATE_THEME } from "../../../common/constants";

/**
 * Definition
 */

export const callUpdateTheme = action;

const METHOD = "POST";
const ENDPOINT = CONS_ENDPOINT_UPDATE_THEME;

type ExpectedReqType = {
  theme: string;
};

type ExpectedResType = {
  theme: string;
};

function checkData(data: any) {
  return typeof data.theme === "string";
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
