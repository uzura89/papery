import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_VERIFY_EMAIL } from "../../../common/constants";

/**
 * Definition
 */

export const callVerifyEmail = action;

const METHOD = "POST";
const ENDPOINT = CONS_ENDPOINT_VERIFY_EMAIL;

type ExpectedReqType = {
  email: string;
  code: string;
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
