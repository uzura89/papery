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
exports.serveEncryptEntries = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbUpdateSettings_1 = require("../../../db/setting/dbUpdateSettings");
const dbEncryptEntries_1 = require("../../../db/entry/dbEncryptEntries");
function serveEncryptEntries(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userParmId } = req;
        try {
            // decrypt entries
            yield (0, dbEncryptEntries_1.dbEncryptEntries)(mongoose_1.default, { userParmId });
            // update setting
            yield (0, dbUpdateSettings_1.dbUpdateSetting)(mongoose_1.default, userParmId, {
                textSearchEnabled: false,
            });
            return res.status(200).json({});
        }
        catch (error) {
            return res.status(500).json({
                message: "Something went wrong",
            });
        }
    });
}
exports.serveEncryptEntries = serveEncryptEntries;
