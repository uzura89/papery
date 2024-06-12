import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_UPDATE_EMOJI_PALETTE } from "../../../common/constants";

/**
 * Definition
 */

export const callUpdateEmojiPalette = action;

const METHOD = "POST";
const ENDPOINT = CONS_ENDPOINT_UPDATE_EMOJI_PALETTE;

type ExpectedReqType = {
  emojiPalette: string;
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
