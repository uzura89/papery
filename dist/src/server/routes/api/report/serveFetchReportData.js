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
exports.serveFetchReportData = void 0;
const dbFetchReportData_1 = require("../../../db/entry/dbFetchReportData");
const report_cons_1 = require("../../../../common/constants/report.cons");
function serveFetchReportData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userParmId } = req;
        const { fromDate, toDate, divideBy } = req.query;
        const filterByTags = req.query.filterByTags === "" ? [] : req.query.filterByTags.split(",");
        try {
            const entries = yield (0, dbFetchReportData_1.dbFetchEntriesForReport)(req.mongoose, userParmId, {
                fromDate,
                toDate,
                filterByTags: filterByTags,
            });
            const reportData = makeReportData(entries, divideBy);
            return res.status(200).json({ reportData });
        }
        catch (error) {
            return res.status(500).json({
                message: "Something went wrong",
            });
        }
    });
}
exports.serveFetchReportData = serveFetchReportData;
/**
 * Helper Functions
 */
function makeReportData(entries, divideBy) {
    const reportData = [];
    // sum up entry counts for each label
    for (const entry of entries) {
        const labels = getLabels(entry, divideBy);
        for (const label of labels) {
            const existingData = reportData.find((data) => data.label === label);
            if (existingData) {
                existingData.value++;
            }
            else {
                reportData.push({ label, value: 1 });
            }
        }
    }
    // sort by counts
    reportData.sort((a, b) => b.value - a.value);
    return reportData;
}
function getLabels(entry, divideBy) {
    if (divideBy === report_cons_1.CONS_REPORT_DIVIDE_BY_EMOJI) {
        return [entry.primaryEmoji];
    }
    else {
        return entry.tags;
    }
}
