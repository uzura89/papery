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
exports.servePublishEntry = void 0;
const constants_1 = require("../../../../common/constants");
const dbFetchEntriesByDate_1 = __importDefault(require("../../../db/entry/dbFetchEntriesByDate"));
const dbPublishEntry_1 = require("../../../db/entry/dbPublishEntry");
const dbFetchSettings_1 = require("../../../db/setting/dbFetchSettings");
const dbCheckIfPremiumUser_1 = require("../../../db/user/dbCheckIfPremiumUser");
function servePublishEntry(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userParmId } = req;
        const { id, body, date } = req.body;
        try {
            const settings = yield (0, dbFetchSettings_1.dbFetchSettings)(req.mongoose, userParmId);
            const canPublish = yield checkCanPublishEntry(req.mongoose, {
                userParmId,
                date,
            });
            if (canPublish === false) {
                return res.status(400).json({
                    message: `You can only save ${constants_1.CONS_ENTRY_LIMIT_PER_DAY} entries for the same day. Please upgrade to premium to save unlimited entries.`,
                });
            }
            const entry = yield (0, dbPublishEntry_1.dbPublishEntry)(req.mongoose, {
                userParmId,
                id,
                body,
                date,
            }, {
                decryptBody: settings.textSearchEnabled,
            });
            return res.status(200).json({ entry });
        }
        catch (error) {
            return res.status(500).json({
                message: "Something went wrong",
            });
        }
    });
}
exports.servePublishEntry = servePublishEntry;
function checkCanPublishEntry(mongoose_1, _a) {
    return __awaiter(this, arguments, void 0, function* (mongoose, { userParmId, date }) {
        const isPremium = yield (0, dbCheckIfPremiumUser_1.dbCheckIfPremiumUser)(mongoose, userParmId);
        if (isPremium)
            return true;
        const entries = yield (0, dbFetchEntriesByDate_1.default)(mongoose, {
            userParmId,
            date,
            onlyPublished: true,
        });
        if (entries.length >= constants_1.CONS_ENTRY_LIMIT_PER_DAY) {
            return false;
        }
        return true;
    });
}
