import CryptoJS from "crypto-js";

export const makeSalt = function () {
  return Buffer.from(
    CryptoJS.lib.WordArray.random(128 / 8).toString(),
    "base64"
  ).toString();
};

export const hashString = function (string: string, salt: string) {
  const hashedString = CryptoJS.PBKDF2(string, salt, {
    keySize: 512 / 32,
    iterations: 1000,
  }).toString();
  return hashedString;
};
