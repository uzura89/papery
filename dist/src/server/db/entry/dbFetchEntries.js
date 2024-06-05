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
exports.dbFetchEntries = void 0;
const EntryEncryption_1 = require("./modules/EntryEncryption");
function dbFetchEntries(mongoose, userParmId, query) {
    return __awaiter(this, void 0, void 0, function* () {
        const Entry = mongoose.model("Entry");
        try {
            const entries = yield Entry.find(Object.assign({ userParmId }, query)).lean();
            const entriesDecrypted = entries.map((entry) => {
                return Object.assign(Object.assign({}, entry), { body: (0, EntryEncryption_1.decryptEntry)(entry.body) });
            });
            return entriesDecrypted;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.dbFetchEntries = dbFetchEntries;
