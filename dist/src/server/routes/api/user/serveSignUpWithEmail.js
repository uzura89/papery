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
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveSignUpWithEmail = void 0;
const dbSaveOnetimeCode_1 = require("../../../db/onetime/dbSaveOnetimeCode");
const dbCreateUserEmail_1 = require("../../../db/user/dbCreateUserEmail");
const dbGetUserByEmail_1 = require("../../../db/user/dbGetUserByEmail");
const sendVerificationCode_1 = require("../../../modules/email/sendVerificationCode");
function serveSignUpWithEmail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            // If activated user already exists, return error
            const user = yield (0, dbGetUserByEmail_1.dbGetUserByEmail)(req.mongoose, email);
            if (user && user.googleId !== "") {
                return res.status(400).json({
                    message: "User signed up with Google. Please login with Google.",
                });
            }
            if (user && user.activated) {
                return res.status(400).json({
                    message: "User already exists. Please login.",
                });
            }
            // If user does not exist, create user
            if (!user) {
                yield (0, dbCreateUserEmail_1.dbCreateUserEmail)(req.mongoose, {
                    email,
                    password,
                });
            }
            // send onetime code to email
            const sixDigitCode = Math.floor(100000 + Math.random() * 900000).toString();
            yield (0, dbSaveOnetimeCode_1.dbSaveVerificationCode)(req.mongoose, email, sixDigitCode);
            yield (0, sendVerificationCode_1.sendVerificationCode)(email, sixDigitCode);
            return res.status(200).json({});
        }
        catch (error) {
            return res.status(500).json({
                message: "Something went wrong",
            });
        }
    });
}
exports.serveSignUpWithEmail = serveSignUpWithEmail;
