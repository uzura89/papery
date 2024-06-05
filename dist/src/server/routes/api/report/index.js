"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../../common/constants");
const serveChangeOrderOfReports_1 = require("./serveChangeOrderOfReports");
const serveCreateReport_1 = require("./serveCreateReport");
const serveDeleteReport_1 = require("./serveDeleteReport");
const serveFetchAllReports_1 = require("./serveFetchAllReports");
const serveFetchReportData_1 = require("./serveFetchReportData");
const serveUpdateReport_1 = require("./serveUpdateReport");
function default_1(app) {
    app.get(constants_1.CONS_ENDPOINT_FETCH_ALL_REPORTS, serveFetchAllReports_1.serveFetchAllReports);
    app.get(constants_1.CONS_ENDPOINT_FETCH_REPORT_DATA, serveFetchReportData_1.serveFetchReportData);
    app.post(constants_1.CONS_ENDPOINT_CREATE_REPORT, serveCreateReport_1.serveCreateReport);
    app.post(constants_1.CONS_ENDPOINT_UPDATE_REPORT, serveUpdateReport_1.serveUpdateReport);
    app.post(constants_1.CONS_ENDPOINT_DELETE_REPORT, serveDeleteReport_1.serveDeleteReport);
    app.post(constants_1.CONS_ENDPOINT_CHANGE_ORDER_OF_REPORTS, serveChangeOrderOfReports_1.serveChangeOrderOfReports);
}
exports.default = default_1;
