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
exports.serveFetchPremiumPlans = void 0;
const getLocalEnv_1 = require("../../../modules/env/getLocalEnv");
const getPremiumPlans_1 = require("../../../modules/premium/getPremiumPlans");
const env = (0, getLocalEnv_1.getLocalEnv)();
function serveFetchPremiumPlans(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const premiumPlans = (0, getPremiumPlans_1.getPremiumPlans)(env.APP_ENV);
            return res.status(200).send({ premiumPlans });
        }
        catch (err) {
            res.status(500).send("Something went wrong");
        }
    });
}
exports.serveFetchPremiumPlans = serveFetchPremiumPlans;
