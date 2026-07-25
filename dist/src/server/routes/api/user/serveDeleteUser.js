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
exports.serveDeleteUser = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbDeleteUser_1 = require("../../../db/user/dbDeleteUser");
const StripeHandler_1 = __importDefault(require("../../../modules/stripe/StripeHandler"));
const dbGetUserById_1 = require("../../../db/user/dbGetUserById");
function serveDeleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userParmId } = req;
        try {
            const user = yield (0, dbGetUserById_1.dbGetUserById)(mongoose_1.default, { userParmId });
            // cancel subscription if exists
            if (user.subscriptionId) {
                yield StripeHandler_1.default.cancelSubscription(user.subscriptionId);
            }
            // delete user
            yield (0, dbDeleteUser_1.dbDeleteUser)(mongoose_1.default, userParmId);
            return res.status(200).json({});
        }
        catch (error) {
            return res.status(500).json({
                message: "Something went wrong",
            });
        }
    });
}
exports.serveDeleteUser = serveDeleteUser;
