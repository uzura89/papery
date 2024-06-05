"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashString = exports.makeSalt = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const makeSalt = function () {
    return Buffer.from(crypto_js_1.default.lib.WordArray.random(128 / 8).toString(), "base64").toString();
};
exports.makeSalt = makeSalt;
const hashString = function (string, salt) {
    const hashedString = crypto_js_1.default.PBKDF2(string, salt, {
        keySize: 512 / 32,
        iterations: 1000,
    }).toString();
    return hashedString;
};
exports.hashString = hashString;
