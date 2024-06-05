"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationCode = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const constants_1 = require("../../../common/constants");
const getLocalEnv_1 = require("../env/getLocalEnv");
mail_1.default.setApiKey((0, getLocalEnv_1.getLocalEnv)().SENDGRID_API_KEY);
function sendVerificationCode(email, code) {
    return __awaiter(this, void 0, void 0, function* () {
        const msg = {
            to: email,
            from: `${constants_1.CONS_COMPANY_NAME} <${constants_1.CONS_COMPANY_EMAIL_NOREPLY}>`,
            subject: "Verification Code",
            text: `Your verification code is ${code}`,
        };
        try {
            yield mail_1.default.send(msg);
        }
        catch (error) {
            throw error;
        }
    });
}
exports.sendVerificationCode = sendVerificationCode;
