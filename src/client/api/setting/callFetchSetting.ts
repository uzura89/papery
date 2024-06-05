import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_FETCH_SETTING } from "../../../common/constants";
import { SettingType } from "../../../common/types/setting.types";

/**
 * Definition
 */

export const callFetchSetting = action;

const METHOD = "GET";
const ENDPOINT = CONS_ENDPOINT_FETCH_SETTING;

type ExpectedReqType = {};

type ExpectedResType = {
  setting: SettingType;
};

function checkData(data: any) {
  return typeof data.setting === "object";
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
