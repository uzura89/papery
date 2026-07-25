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
        const searchQuery = makeSearchQuery(userParmId, text);
        const tags = (0, extractTagsFromBody_1.extractTagsFromBody)(text || "");
        try {
            const draftEntries = yield Entry.aggregate([
                searchQuery,
                {
                    $match: Object.assign({ userParmId, draft: true }, options),
                },
                {
                    $sort: {
                        date: -1,
                        created: -1,
                    },
                },
            ]);
            const pinnedEntries = yield Entry.aggregate([
                searchQuery,
                {
                    $match: Object.assign({ userParmId, pinned: tags.length > 0 ? { $exists: false } : true, draft: false }, options),
                },
                {
                    $sort: {
                        date: -1,
                        created: -1,
                    },
                },
            ]);
            // fetch published entries 50 max
            // const publishedEntries = await Entry.find({
            //   userParmId,
            //   draft: false,
            //   pinned: false,
            //   ...options,
            // })
            //   .sort({ date: -1, created: -1 })
            //   .limit(50);
            const publishedEntries = yield Entry.aggregate([
                searchQuery,
                {
                    $match: Object.assign({ userParmId, draft: false, pinned: false }, options),
                },
                {
                    $sort: {
                        date: -1,
                        created: -1,
                    },
                },
            ]);
            const entriesDecrypted = [
                ...draftEntries,
                ...pinnedEntries,
                ...publishedEntries,
            ].map((entry) => {
                return Object.assign(Object.assign({}, entry), { body: (0, EntryEncryption_1.decryptEntry)(entry.body) });
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
    const dateRange = extractDateRange(text);
    const date = extractDate(text);
    // prepare query
    const tagsQuery = tags.length > 0 ? { $all: tags } : { $exists: true };
    const dateQuery = dateRange.length == 2
        ? {
            $gte: dateRange[0],
            $lte: dateRange[1],
        }
        : date
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
function makeSearchQuery(userParmId, text) {
    const freeTexts = extractFreeTexts(text);
    const freeTextsQuery = freeTexts.length > 0
        ? {
            $search: {
                compound: {
                    must: [
                        {
                            text: {
                                path: "decryptedBody",
                                query: freeTexts.join(" "),
                            },
                        },
                    ],
                    filter: [
                        {
                            text: {
                                path: "userParmId",
                                query: userParmId,
                            },
                        },
                    ],
                },
            },
        }
        : {
            $search: {
                compound: {
                    filter: [
                        {
                            text: {
                                path: "userParmId",
                                query: userParmId,
                            },
                        },
                    ],
                },
            },
        };
    return freeTextsQuery;
}
/**
 * Modules
 */
function extractDateRange(text) {
    const dateRange = text.split("~");
    if (dateRange.length !== 2)
        return [];
    const fromDate = extractDate(dateRange[0]);
    const toDate = extractDate(dateRange[1]);
    if (!fromDate || !toDate)
        return [];
    return [fromDate, toDate];
}
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
function extractFreeTexts(text) {
    if (!text || !text.trim())
        return [];
    return text
        .split(" ")
        .filter((word) => isFreeText(word))
        .filter((text) => text.trim().length > 0);
}
function isFreeText(word) {
    if (isDate(word))
        return false;
    if (word.startsWith("#"))
        return false;
    if (word.includes("~"))
        return false;
    return true;
}
