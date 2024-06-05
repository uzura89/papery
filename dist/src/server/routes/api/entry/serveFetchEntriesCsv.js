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
exports.serveFetchEntriesCsv = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbFetchEntries_1 = require("../../../db/entry/dbFetchEntries");
function serveFetchEntriesCsv(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userParmId } = req;
        try {
            const entries = yield (0, dbFetchEntries_1.dbFetchEntries)(mongoose_1.default, userParmId, {});
            const csvContent = makeCsvContent(entries);
            return res.status(200).json({ csvContent });
        }
        catch (error) {
            return res.status(500).json({
                message: "Something went wrong",
            });
        }
    });
}
exports.serveFetchEntriesCsv = serveFetchEntriesCsv;
/**
 * Helper function to make CSV content from entries
 */
function makeCsvContent(entries) {
    // id, date, tags, primaryEmoji, body, draft, pinned, created
    // separated by tab
    const fileHeader = "data:text/csv;charset=utf-8,";
    const header = "date\ttags\temoji\tbody\tdraft\tpinned\n";
    const content = entries
        .map((entry) => {
        const tags = entry.tags.join(",");
        const bodyEscaped = `"${entry.body.replace(/"/g, '""')}"`;
        return `${entry.date}\t${tags}\t${entry.primaryEmoji}\t${bodyEscaped}\t${entry.draft}\t${entry.pinned}\n`;
    })
        .join("");
    return fileHeader + header + content;
}
