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
exports.dbFetchEntryHistories = void 0;
function dbFetchEntryHistories(mongoose, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const Entry = mongoose.model("Entry");
        try {
            const draftEntries = yield Entry.aggregate([
                {
                    $match: {
                        userParmId: options.userParmId,
                        date: { $regex: `^${options.year}` },
                        tags: options.tags.length === 0
                            ? { $exists: true }
                            : { $in: options.tags },
                        pinned: options.tags.length === 0 ? { $exists: true } : false,
                    },
                },
                {
                    $group: {
                        _id: { date: "$date" },
                        date: { $first: "$date" },
                        entryCnt: { $sum: 1 },
                        primaryEmojis: {
                            $push: "$primaryEmoji",
                        },
                    },
                },
                {
                    $sort: { _id: -1 },
                },
            ]);
            return draftEntries;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.dbFetchEntryHistories = dbFetchEntryHistories;
