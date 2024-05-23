import { createCookie, readCookie } from "../cookie/CookieUtils";

const COOKIE_VALID_FOR = 90;
const COOKIE_NAME_ACCESS_TOKEN = "access_token";

// let savedToken = "";

export const saveAccessToken = (token: string) => {
  try {
    createCookie(COOKIE_NAME_ACCESS_TOKEN, token, COOKIE_VALID_FOR, null);
  } catch (error) {
    // savedToken = token;
  }
};

export const deleteAccessToken = () => {
  try {
    createCookie(COOKIE_NAME_ACCESS_TOKEN, "", -1, null);
  } catch (error) {}
};

export const getAccessToken = () => {
  try {
    const token = readCookie(COOKIE_NAME_ACCESS_TOKEN);
    return token;
  } catch (error) {
    // return savedToken;
    throw error;
  }
};
