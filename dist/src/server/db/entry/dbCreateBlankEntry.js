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
exports.dbCreateBlankEntry = void 0;
const EntryEncryption_1 = require("./modules/EntryEncryption");
function dbCreateBlankEntry(mongoose, entry) {
    return __awaiter(this, void 0, void 0, function* () {
        const Entry = mongoose.model("Entry");
        try {
            // create entry
            const newEntry = {
                userParmId: entry.userParmId,
                id: entry.id,
                body: (0, EntryEncryption_1.encryptEntry)(entry.body),
                date: entry.date,
                tags: [],
                draft: true,
                primaryEmoji: "",
                pinned: false,
            };
            const createdEntry = yield Entry.create(newEntry);
            // return
            return createdEntry;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.dbCreateBlankEntry = dbCreateBlankEntry;
