import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_CREATE_TAG } from "../../../common/constants";
import { TagSchemaType } from "../../../common/types/tag.types";

/**
 * Definition
 */

export const callCreateTag = action;

const METHOD = "POST";
const ENDPOINT = CONS_ENDPOINT_CREATE_TAG;

type ExpectedReqType = {
  id: string;
  text: string;
  color: string;
};

type ExpectedResType = {
  tag: TagSchemaType;
};

function checkData(data: any) {
  return typeof data.tag !== "undefined";
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
