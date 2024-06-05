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
exports.dbPublishEntry = void 0;
const extractPrimaryEmoji_1 = require("../../../common/modules/emoji/extractPrimaryEmoji");
const extractTagsFromBody_1 = require("../../../common/modules/tag/extractTagsFromBody");
const EntryEncryption_1 = require("./modules/EntryEncryption");
function dbPublishEntry(mongoose, entry) {
    return __awaiter(this, void 0, void 0, function* () {
        const Entry = mongoose.model("Entry");
        try {
            const tags = (0, extractTagsFromBody_1.extractTagsFromBody)(entry.body);
            const primaryEmoji = (0, extractPrimaryEmoji_1.extractPrimaryEmoji)(entry.body);
            const updatedEntry = yield Entry.findOneAndUpdate({ id: entry.id, userParmId: entry.userParmId }, {
                userParmId: entry.userParmId,
                body: (0, EntryEncryption_1.encryptEntry)(entry.body),
                date: entry.date,
                tags,
                primaryEmoji,
                draft: false,
            }, { new: true });
            // return
            return updatedEntry;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.dbPublishEntry = dbPublishEntry;
