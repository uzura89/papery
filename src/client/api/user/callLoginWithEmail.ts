import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_LOGIN_WITH_EMAIL } from "../../../common/constants";

/**
 * Definition
 */

export const callLoginWithEmail = action;

const METHOD = "POST";
const ENDPOINT = CONS_ENDPOINT_LOGIN_WITH_EMAIL;

type ExpectedReqType = {
  email: string;
  password: string;
};

type ExpectedResType = {
  accessToken: string;
};

function checkData(data: any) {
  return typeof data.accessToken === "string";
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
