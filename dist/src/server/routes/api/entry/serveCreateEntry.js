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
exports.serveCreateEntry = void 0;
const dbCreateEntry_1 = require("../../../db/entry/dbCreateEntry");
const dbFetchSettings_1 = require("../../../db/setting/dbFetchSettings");
function serveCreateEntry(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userParmId } = req;
        const { id, body, date } = req.body;
        try {
            const settings = yield (0, dbFetchSettings_1.dbFetchSettings)(req.mongoose, userParmId);
            const entry = yield (0, dbCreateEntry_1.dbCreateEntry)(req.mongoose, {
                userParmId,
                id,
                body,
                date,
                draft: true,
                pinned: false,
            }, {
                decryptBody: settings.textSearchEnabled,
            });
            return res.status(200).json({ id: entry.id });
        }
        catch (error) {
            return res.status(500).json({
                message: "Failed to save the entry. Before loosing the entry, please copy & paste it to somewhere and refresh this page.",
            });
        }
    });
}
exports.serveCreateEntry = serveCreateEntry;
