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
exports.dbUpdateTag = void 0;
const dbFetchEntries_1 = require("../entry/dbFetchEntries");
const dbUpdateEntry_1 = require("../entry/dbUpdateEntry");
function dbUpdateTag(mongoose, userParmId, id, newText, newColor) {
    return __awaiter(this, void 0, void 0, function* () {
        const Tag = mongoose.model("Tag");
        try {
            if (!newText.trim() || newText.includes(" ")) {
                throw new Error("Invalid tag name");
            }
            const tag = yield Tag.findOne({
                userParmId,
                id,
            });
            const entriesWithThisTag = yield (0, dbFetchEntries_1.dbFetchEntries)(mongoose, userParmId, {
                tags: tag.text,
            });
            // update tag in entries
            for (const entry of entriesWithThisTag) {
                entry.tags = entry.tags.map((_tag) => {
                    if (_tag !== tag.text)
                        return _tag;
                    return newText;
                });
                entry.body = entry.body.replace(`#${tag.text}`, `#${newText}`);
                yield (0, dbUpdateEntry_1.dbUpdateEntry)(mongoose, {
                    userParmId,
                    id: entry.id,
                }, {
                    tags: entry.tags,
                    body: entry.body,
                });
            }
            // update tag text
            tag.text = newText;
            tag.color = newColor;
            yield tag.save();
            return;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.dbUpdateTag = dbUpdateTag;
