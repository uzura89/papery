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
exports.dbUpdateEntries = void 0;
const EntryEncryption_1 = require("./modules/EntryEncryption");
function dbUpdateEntries(mongoose, entries) {
    return __awaiter(this, void 0, void 0, function* () {
        const Entry = mongoose.model("Entry");
        try {
            // update entries
            const updatedEntries = yield Promise.all(entries.map((entry) => __awaiter(this, void 0, void 0, function* () {
                const updatedEntry = yield Entry.findOneAndUpdate({
                    userParmId: entry.userParmId,
                    id: entry.id,
                }, {
                    date: entry.date,
                    body: (0, EntryEncryption_1.encryptEntry)(entry.body),
                    tags: entry.tags,
                }, { new: true });
                return updatedEntry;
            })));
            // return
            return updatedEntries;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.dbUpdateEntries = dbUpdateEntries;
