import {
  CONS_ENDPOINT_CHANGE_ORDER_OF_REPORTS,
  CONS_ENDPOINT_CREATE_REPORT,
  CONS_ENDPOINT_DELETE_REPORT,
  CONS_ENDPOINT_FETCH_ALL_REPORTS,
  CONS_ENDPOINT_FETCH_REPORT_DATA,
  CONS_ENDPOINT_UPDATE_REPORT,
} from "../../../../common/constants";
import { serveChangeOrderOfReports } from "./serveChangeOrderOfReports";
import { serveCreateReport } from "./serveCreateReport";
import { serveDeleteReport } from "./serveDeleteReport";
import { serveFetchAllReports } from "./serveFetchAllReports";
import { serveFetchReportData } from "./serveFetchReportData";
import { serveUpdateReport } from "./serveUpdateReport";

export default function (app: any) {
  app.get(CONS_ENDPOINT_FETCH_ALL_REPORTS, serveFetchAllReports);
  app.get(CONS_ENDPOINT_FETCH_REPORT_DATA, serveFetchReportData);
  app.post(CONS_ENDPOINT_CREATE_REPORT, serveCreateReport);
  app.post(CONS_ENDPOINT_UPDATE_REPORT, serveUpdateReport);
  app.post(CONS_ENDPOINT_DELETE_REPORT, serveDeleteReport);
  app.post(CONS_ENDPOINT_CHANGE_ORDER_OF_REPORTS, serveChangeOrderOfReports);
}
