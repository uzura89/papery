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
exports.serveLoginWithGoogle = void 0;
const google_auth_library_1 = require("google-auth-library");
const jwt_1 = require("../../../modules/auth/jwt");
const constants_1 = require("../../../../common/constants");
const dbGetUserByEmail_1 = require("../../../db/user/dbGetUserByEmail");
const dbCreateUserGoogle_1 = require("../../../db/user/dbCreateUserGoogle");
const oAuth2Client = new google_auth_library_1.OAuth2Client(constants_1.CONS_GOOGLE_CLIENT_ID, process.env.GAPI_CLIENT_SECRET, "postmessage");
function serveLoginWithGoogle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { code } = req.body;
        try {
            const { email, googleId } = yield getGoogleAccountInfo(code);
            const userParmId = yield getOrCreateUser(req.mongoose, email, googleId);
            const accessToken = (0, jwt_1.makeAccessToken)({ userParmId });
            return res.status(200).json({ accessToken });
        }
        catch (error) {
            return res.status(500).json({
                message: "Something went wrong",
            });
        }
    });
}
exports.serveLoginWithGoogle = serveLoginWithGoogle;
/**
 * getGoogleAccountInfo
 */
function getGoogleAccountInfo(idToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { tokens } = yield oAuth2Client.getToken(idToken);
            if (!tokens || !tokens.id_token)
                throw Error;
            const ticket = yield oAuth2Client.verifyIdToken({
                idToken: tokens.id_token,
                audience: process.env.GAPI_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            if (!payload || !payload.email || !payload.picture || !payload.name)
                throw Error;
            return {
                email: payload.email,
                googleId: payload.sub,
                picture: payload.picture,
                name: payload.name,
            };
        }
        catch (error) {
            throw Error;
        }
    });
}
/**
 * getOrCreateUser
 */
function getOrCreateUser(mongoose, email, googleId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, dbGetUserByEmail_1.dbGetUserByEmail)(mongoose, email);
            let userParmId = "";
            if (user) {
                // return accessToken
                userParmId = user.userParmId;
            }
            else {
                // create user and return accessToken
                const user = yield (0, dbCreateUserGoogle_1.dbCreateUserGoogle)(mongoose, {
                    email,
                    googleId,
                });
                userParmId = user.userParmId;
            }
            return userParmId;
        }
        catch (error) {
            throw Error;
        }
    });
}
