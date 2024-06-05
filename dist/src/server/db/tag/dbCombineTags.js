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
exports.dbCombineTags = void 0;
const dbFetchEntries_1 = require("../entry/dbFetchEntries");
const dbUpdateEntries_1 = require("../entry/dbUpdateEntries");
function dbCombineTags(mongoose, userParmId, id, newText) {
    return __awaiter(this, void 0, void 0, function* () {
        const Tag = mongoose.model("Tag");
        try {
            const tag = yield Tag.findOne({
                userParmId,
                id,
            });
            const entriesWithThisTag = yield (0, dbFetchEntries_1.dbFetchEntries)(mongoose, userParmId, {
                tags: tag.text,
            });
            // prepare new entries
            const newEntries = entriesWithThisTag.map((entry) => {
                const newTagExits = entry.tags.find((_tag) => _tag === newText);
                if (newTagExits) {
                    entry.tags = entry.tags.filter((_tag) => _tag !== tag.text);
                }
                else {
                    entry.tags = entry.tags.map((_tag) => {
                        if (_tag !== tag.text)
                            return _tag;
                        return newText;
                    });
                }
                entry.body = entry.body.replace(`#${tag.text}`, `#${newText}`);
                return entry;
            });
            // update entries
            yield (0, dbUpdateEntries_1.dbUpdateEntries)(mongoose, newEntries);
            // delte old tag
            yield Tag.deleteOne({ userParmId, id });
            return;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.dbCombineTags = dbCombineTags;
