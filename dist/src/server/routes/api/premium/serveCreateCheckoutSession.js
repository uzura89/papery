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
exports.serveCreateCheckoutSession = void 0;
const getLocalEnv_1 = require("../../../modules/env/getLocalEnv");
const getPremiumPlans_1 = require("../../../modules/premium/getPremiumPlans");
const StripeHandler_1 = __importDefault(require("../../../modules/stripe/StripeHandler"));
const env = (0, getLocalEnv_1.getLocalEnv)();
function serveCreateCheckoutSession(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const User = req.mongoose.model("User");
        const { userParmId } = req;
        const { priceId } = req.body;
        try {
            const priceItem = (0, getPremiumPlans_1.getPremiumPlans)(env.APP_ENV).find((item) => item.id === priceId);
            if (!priceItem) {
                throw new Error("Price not found");
            }
            const user = yield User.findOne({ userParmId });
            const checkoutUrl = yield StripeHandler_1.default.generateCheckoutUrl({
                priceId,
                customerEmail: user.email,
                isRecurring: priceItem.isRecurring,
            });
            return res.status(200).send({ checkoutUrl });
        }
        catch (err) {
            res.status(500).send("Something went wrong");
        }
    });
}
exports.serveCreateCheckoutSession = serveCreateCheckoutSession;
