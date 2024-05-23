import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_FETCH_REFLECTIONS } from "../../../common/constants";
import { ReflectionType } from "../../../common/types/reflect.types";

/**
 * Definition
 */

export const callFetchReflections = action;

const METHOD = "GET";
const ENDPOINT = CONS_ENDPOINT_FETCH_REFLECTIONS;

type ExpectedReqType = {
  today: string;
};

type ExpectedResType = {
  reflections: ReflectionType[];
};

function checkData(data: any) {
  return typeof data.reflections === "object";
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
