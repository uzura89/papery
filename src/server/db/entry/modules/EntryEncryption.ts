import CryptoJS from "crypto-js";
import { getLocalEnv } from "../../../modules/env/getLocalEnv";

export function encryptEntry(body: string): string {
  const encrypted = CryptoJS.AES.encrypt(
    body,
    getLocalEnv().AES_SECRET
  ).toString();
  return encrypted;
}

export function decryptEntry(encryptedBody: string): string {
  const decrypted = CryptoJS.AES.decrypt(
    encryptedBody,
    getLocalEnv().AES_SECRET
  ).toString(CryptoJS.enc.Utf8);
  return decrypted;
}
