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
exports.serveTogglePinOfEntry = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbTogglePinOfEntry_1 = require("../../../db/entry/dbTogglePinOfEntry");
function serveTogglePinOfEntry(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userParmId } = req;
        const { id, pinned } = req.body;
        try {
            const entry = yield (0, dbTogglePinOfEntry_1.dbTogglePinOfEntry)(mongoose_1.default, {
                userParmId,
                id,
                pinned,
            });
            return res.status(200).json("ok");
        }
        catch (error) {
            return res.status(500).json({
                message: "Something went wrong",
            });
        }
    });
}
exports.serveTogglePinOfEntry = serveTogglePinOfEntry;
