import axios from "axios";

import { getAccessToken } from "../auth/AccessTokenUtils";
import { CONS_ERROR_MESSAGE_API_DEFAULT } from "../../../common/constants/api.cons";
import { CONS_QUERY_PARAM_DEMO } from "../../../common/constants";

interface SuccessResponse {
  error: null;
  data: any;
}

interface ErrorResponse {
  error: {
    message: string;
    code: number | undefined;
  };
  data: null;
}

export default async function callApi(
  url: string,
  options: {
    method: string;
    data?: any;
    accessToken?: string;
  }
): Promise<SuccessResponse | ErrorResponse> {
  const dataOption =
    options.method === "GET"
      ? { params: options.data }
      : { data: options.data };

  try {
    const response = await axios(url, {
      method: options.method,
      ...dataOption,
      headers: {
        Authorization: options.accessToken || getAccessToken(),
        "X-Demo-User":
          new URLSearchParams(window.location.search).get(
            CONS_QUERY_PARAM_DEMO
          ) === "true"
            ? true
            : undefined,
      },
      paramsSerializer: (params) => {
        return new URLSearchParams(params).toString();
      },
    });

    return {
      error: null,
      data: response.data,
    };
  } catch (err) {
    const errorMessage = getErrorMessage(err);
    const errorCode = getErrorCode(err);
    return {
      error: {
        message: errorMessage,
        code: errorCode,
      },
      data: null,
    };
  }
}

/**
 * getErrorMessage
 */

function getErrorMessage(err: any): string {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || CONS_ERROR_MESSAGE_API_DEFAULT;
  }
  return CONS_ERROR_MESSAGE_API_DEFAULT;
}

/**
 * getErrorCode
 */

function getErrorCode(err: any): number | undefined {
  if (axios.isAxiosError(err)) {
    return err.response?.status;
  }
  return 0;
}

/**
 * handleResponse
 */

export function handleResponse<ExpectedDataType>(
  response: SuccessResponse | ErrorResponse,
  dataCheck: (data: any) => boolean
) {
  if (response.error) {
    return {
      error: {
        message: response.error.message,
        code: response.error.code,
      },
      data: null,
    };
  }

  if (!dataCheck(response.data)) {
    return {
      error: {
        message: "Invalid response data",
      },
      data: null,
    };
  }

  return {
    error: null,
    data: response.data as ExpectedDataType,
  };
}
