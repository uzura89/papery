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
exports.serveVerifyEmail = void 0;
const dbGetVerificationCode_1 = require("../../../db/onetime/dbGetVerificationCode");
const dbActivateUser_1 = require("../../../db/user/dbActivateUser");
const dbGetUserByEmail_1 = require("../../../db/user/dbGetUserByEmail");
const jwt_1 = require("../../../modules/auth/jwt");
function serveVerifyEmail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, code } = req.body;
        try {
            // check if user already exists
            const correctCode = yield (0, dbGetVerificationCode_1.dbGetVerificationCode)(req.mongoose, email);
            if (correctCode !== code) {
                return res.status(400).json({
                    message: "Incorrect code",
                });
            }
            // proceed to login
            const user = yield (0, dbGetUserByEmail_1.dbGetUserByEmail)(req.mongoose, email);
            yield (0, dbActivateUser_1.dbActivateUser)(req.mongoose, user.userParmId);
            const accessToken = (0, jwt_1.makeAccessToken)({ userParmId: user.userParmId });
            return res.status(200).json({ accessToken });
        }
        catch (error) {
            return res.status(500).json({
                message: "Something went wrong",
            });
        }
    });
}
exports.serveVerifyEmail = serveVerifyEmail;
