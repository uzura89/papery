import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_LOGIN_WITH_GOOGLE } from "../../../common/constants";

type ExpectedDataType = {
  accessToken: string;
};

function dataCheck(data: any) {
  return typeof data.accessToken === "string";
}

export default async function callLoginWithGoogle(code: any) {
  const response = await callApi(CONS_ENDPOINT_LOGIN_WITH_GOOGLE, {
    method: "POST",
    data: { code },
  });

  return handleResponse<ExpectedDataType>(response, dataCheck);
}
