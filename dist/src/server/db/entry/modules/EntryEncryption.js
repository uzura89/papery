"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptEntry = exports.encryptEntry = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const getLocalEnv_1 = require("../../../modules/env/getLocalEnv");
function encryptEntry(body) {
    const encrypted = crypto_js_1.default.AES.encrypt(body, (0, getLocalEnv_1.getLocalEnv)().AES_SECRET).toString();
    return encrypted;
}
exports.encryptEntry = encryptEntry;
function decryptEntry(encryptedBody) {
    const decrypted = crypto_js_1.default.AES.decrypt(encryptedBody, (0, getLocalEnv_1.getLocalEnv)().AES_SECRET).toString(crypto_js_1.default.enc.Utf8);
    return decrypted;
}
exports.decryptEntry = decryptEntry;
