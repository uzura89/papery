"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeAccessToken = exports.makeAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getLocalEnv_1 = require("../env/getLocalEnv");
const makeAccessToken = (payload) => {
    const jwtSecret = (0, getLocalEnv_1.getLocalEnv)().JWT_SECRET;
    return jsonwebtoken_1.default.sign(payload, jwtSecret, {
        // expire in 14 days
        expiresIn: 60 * 60 * 24 * 14,
    });
};
exports.makeAccessToken = makeAccessToken;
const decodeAccessToken = (token) => {
    try {
        const jwtSecret = (0, getLocalEnv_1.getLocalEnv)().JWT_SECRET;
        jsonwebtoken_1.default.verify(token, jwtSecret);
        const payload = jsonwebtoken_1.default.decode(token);
        return payload;
    }
    catch (e) {
        return {
            userParmId: "",
        };
    }
};
exports.decodeAccessToken = decodeAccessToken;
