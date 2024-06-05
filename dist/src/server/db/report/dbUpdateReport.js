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
exports.dbUpdateReport = void 0;
function dbUpdateReport(mongoose, userParmId, report) {
    return __awaiter(this, void 0, void 0, function* () {
        const Report = mongoose.model("Report");
        try {
            yield Report.updateOne({ userParmId, id: report.id }, {
                $set: {
                    reportName: report.reportName,
                    filterByTagIds: report.filterByTagIds,
                    divideBy: report.divideBy,
                    reportType: report.reportType,
                    duration: report.duration,
                    order: report.order,
                },
            });
            return;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.dbUpdateReport = dbUpdateReport;
