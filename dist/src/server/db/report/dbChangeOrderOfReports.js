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
exports.dbChangeOrderOfReports = void 0;
function dbChangeOrderOfReports(mongoose, userParmId, orderInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const Report = mongoose.model("Report");
        try {
            // Find all reports of the user
            const reports = yield Report.find({ userParmId });
            // Update order of each report
            for (const order of orderInfo) {
                const report = reports.find((report) => report.id === order.id);
                if (report) {
                    report.order = order.order;
                    yield report.save();
                }
            }
            return;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.dbChangeOrderOfReports = dbChangeOrderOfReports;
