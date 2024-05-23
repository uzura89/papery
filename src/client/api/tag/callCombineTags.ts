import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_COMBINE_TAGS } from "../../../common/constants";

/**
 * Definition
 */

export const callCombineTags = action;

const METHOD = "POST";
const ENDPOINT = CONS_ENDPOINT_COMBINE_TAGS;

type ExpectedReqType = {
  id: string;
  newText: string;
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
