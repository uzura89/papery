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
exports.dbCreateUserEmail = void 0;
const uuid_1 = require("uuid");
const crypto_1 = require("../../modules/auth/crypto");
const dbCreateDefaultEntries_1 = require("../entry/dbCreateDefaultEntries");
function dbCreateUserEmail(mongoose, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const User = mongoose.model("User");
        const userParmId = (0, uuid_1.v4)();
        const salt = (0, crypto_1.makeSalt)();
        const newUser = {
            userParmId,
            email: user.email,
            googleId: "",
            password: (0, crypto_1.hashString)(user.password, salt),
            salt,
            activated: false,
            customerId: null,
            purchaseId: null,
            purchasePlan: null,
            subscriptionId: null,
            subscriptionCurrentPeriodEnd: null,
            subscriptionCancelAtPeriodEnd: null,
        };
        try {
            const user = yield User.create(newUser);
            // add default entries
            yield (0, dbCreateDefaultEntries_1.dbCreateDefaultEntries)(mongoose, user.userParmId);
            return user;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.dbCreateUserEmail = dbCreateUserEmail;
