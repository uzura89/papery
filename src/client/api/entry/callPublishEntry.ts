import { EntrySchemaType } from "./../../../common/types/entry.types";
import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_PUBLISH_ENTRY } from "../../../common/constants";

/**
 * Definition
 */

export const callPublishEntry = action;

const METHOD = "POST";
const ENDPOINT = CONS_ENDPOINT_PUBLISH_ENTRY;

type ExpectedReqType = {
  id: string;
  body: string;
  date: string;
};

type ExpectedResType = {
  entry: EntrySchemaType;
};

function checkData(data: any) {
  return typeof data.entry === "object";
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
