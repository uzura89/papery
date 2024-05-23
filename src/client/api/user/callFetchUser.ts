import callApi, { handleResponse } from "../../modules/api/callApi";
import { CONS_ENDPOINT_FETCH_USER } from "../../../common/constants";
import { UserSchemaType } from "../../../common/types";

type ExpectedDataType = {
  user: UserSchemaType;
};

function checkData(data: any) {
  return typeof data.user.userParmId === "string";
}

export default async function callFetchUser(accessToken?: string) {
  const response = await callApi(CONS_ENDPOINT_FETCH_USER, {
    method: "GET",
    accessToken,
  });

  return handleResponse<ExpectedDataType>(response, checkData);
}
