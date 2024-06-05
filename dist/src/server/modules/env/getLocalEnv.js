"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalEnv = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config({
    path: ".local.env",
});
function getLocalEnv() {
    return {
        APP_ENV: process.env.APP_ENV,
        APP_URL: process.env.APP_URL,
        AES_SECRET: process.env.AES_SECRET,
        JWT_SECRET: process.env.JWT_SECRET,
        DB_URI: process.env.DB_URI,
        SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
        STRIPE_KEY_PUB: process.env.STRIPE_KEY_PUB,
        STRIPE_KEY_SEC: process.env.STRIPE_KEY_SEC,
        STRIPE_ENDPOINT_SECRET: process.env.STRIPE_ENDPOINT_SECRET,
    };
}
exports.getLocalEnv = getLocalEnv;
//
