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
exports.dbFetchRecentEntries = void 0;
const extractTagsFromBody_1 = require("../../../common/modules/tag/extractTagsFromBody");
const EntryEncryption_1 = require("./modules/EntryEncryption");
function dbFetchRecentEntries(mongoose, userParmId, text) {
    return __awaiter(this, void 0, void 0, function* () {
        const Entry = mongoose.model("Entry");
        const options = makeTextFilter(text);
        const tags = (0, extractTagsFromBody_1.extractTagsFromBody)(text || "");
        try {
            // fetch draft entries
            const draftEntries = yield Entry.find(Object.assign({ userParmId, draft: true }, options)).sort({
                date: -1,
                created: -1,
            });
            // fetch pinned entries
            const pinnedEntries = yield Entry.find(Object.assign({ userParmId, pinned: tags.length > 0 ? { $exists: false } : true, draft: false }, options)).sort({ date: -1 });
            // fetch published entries 50 max
            const publishedEntries = yield Entry.find(Object.assign({ userParmId, draft: false, pinned: false }, options))
                .sort({ date: -1, created: -1 })
                .limit(50);
            const entriesDecrypted = [
                ...draftEntries,
                ...pinnedEntries,
                ...publishedEntries,
            ].map((entry) => {
                return Object.assign(Object.assign({}, entry.toObject()), { body: (0, EntryEncryption_1.decryptEntry)(entry.body) });
            });
            return entriesDecrypted;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.dbFetchRecentEntries = dbFetchRecentEntries;
/**
 * make options
 */
function makeTextFilter(text) {
    if (!text || !text.trim())
        return {};
    // extract tags and date from raw text
    const tags = (0, extractTagsFromBody_1.extractTagsFromBody)(text);
    const date = extractDate(text);
    // if no tags and date, fetch none
    if (tags.length === 0 && !date) {
        return {
            id: { $exists: false },
        };
    }
    // prepare query
    const tagsQuery = tags.length > 0 ? { $all: tags } : { $exists: true };
    const dateQuery = date
        ? { $regex: new RegExp(date, "i") }
        : { $exists: true };
    return {
        $and: [
            // find tags includes #text
            { tags: tagsQuery },
            // find date
            { date: dateQuery },
        ],
    };
}
/**
 * Modules
 */
function extractDate(text) {
    return text.split(" ").find((word) => isDate(word));
}
function isDate(word) {
    // YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(word))
        return true;
    // YYYY-MM
    if (/^\d{4}-\d{2}$/.test(word))
        return true;
    // YYYY
    if (/^\d{4}$/.test(word))
        return true;
    // MM-DD
    if (/^\d{2}-\d{2}$/.test(word))
        return true;
    return false;
}
