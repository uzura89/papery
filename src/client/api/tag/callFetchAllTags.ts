import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_FETCH_ALL_TAGS } from "../../../common/constants";
import { TagSchemaType } from "../../../common/types/tag.types";

/**
 * Definition
 */

export const callFetchAllTags = action;

const METHOD = "GET";
const ENDPOINT = CONS_ENDPOINT_FETCH_ALL_TAGS;

type ExpectedReqType = {};

type ExpectedResType = {
  tags: TagSchemaType[];
};

function checkData(data: any) {
  return typeof data.tags !== "undefined";
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
