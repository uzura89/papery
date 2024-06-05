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
exports.serveLoginWithEmail = void 0;
const dbGetUserByEmail_1 = require("../../../db/user/dbGetUserByEmail");
const crypto_1 = require("../../../modules/auth/crypto");
const jwt_1 = require("../../../modules/auth/jwt");
function serveLoginWithEmail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const user = yield (0, dbGetUserByEmail_1.dbGetUserByEmail)(req.mongoose, email);
            if (!user) {
                return res.status(400).json({
                    message: "Incorrect email",
                });
            }
            if (!user.activated) {
                return res.status(400).json({
                    message: "User not activated. Please start over from the signup page.",
                });
            }
            if (user.password === "") {
                return res.status(400).json({
                    message: "User signed up with Google. Please login with Google.",
                });
            }
            if (user.password !== (0, crypto_1.hashString)(password, user.salt)) {
                return res.status(400).json({
                    message: "Incorrect password",
                });
            }
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
exports.serveLoginWithEmail = serveLoginWithEmail;
