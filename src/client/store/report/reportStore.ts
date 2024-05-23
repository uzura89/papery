import { create } from "zustand";

import { ReportBaseType, ReportBaseWithDataType } from "../../../common/types";
import { callFetchAllReports } from "../../api/report/callFetchAllReports";
import { callFetchReportData } from "../../api/report/callFetchReportData";
import { callCreateReport } from "../../api/report/callCreateReport";
import { callUpdateReport } from "../../api/report/callUpdateReport";
import { callDeleteReport } from "../../api/report/callDeleteReport";
import useTagStore from "../tag/tagStore";
import {
  CONS_REPORT_DURATION_ALL_TIME,
  CONS_REPORT_DURATION_LAST_30_DAYS,
  CONS_REPORT_DURATION_LAST_7_DAYS,
  CONS_REPORT_DURATION_LAST_90_DAYS,
  CONS_REPORT_DURATION_THIS_MONTH,
  CONS_REPORT_DURATION_THIS_YEAR,
} from "../../../common/constants/report.cons";
import { convertDateToString } from "../../../common/modules/date/convertDateToString";
import { modifyDateString } from "../../../common/modules/date/modifyDateString";
import { callChangeOrderOfReports } from "../../api/report/callChangeOrderOfReports";

const useReportStore = create<{
  // report data
  reports: ReportBaseWithDataType[];
  fetchAllReports: () => void;
  fetchReportData: (reportId: string) => void;
  needRefresh: boolean;
  changeNeedRefresh: (needRefresh: boolean) => void;
  // edit report
  createReport: (report: ReportBaseType) => void;
  updateReport: (report: ReportBaseType) => void;
  deleteReport: (reportId: string) => void;
  changeOrderOfReports: (orderInfo: { id: string; order: number }[]) => void;
}>((set, get) => ({
  // report data
  reports: [],
  fetchAllReports: async () => {
    // fetch all reports
    const response = await callFetchAllReports({});
    if (response.error) return;
    const newReports = response.data.reports.map((_report) => {
      return {
        ..._report,
        isLoaded: false,
        isLoading: false,
        reportData: [],
      };
    });
    set({ reports: newReports });
  },
  fetchReportData: async (reportId: string) => {
    const report = get().reports.find((report) => report.id === reportId);
    if (!report) return;

    // set loading state
    const reportsBeforeLoading = get().reports.map((_report) => {
      if (_report.id !== reportId) return _report;
      return {
        ..._report,
        isLoading: true,
        isLoaded: false,
      };
    });
    set({ reports: reportsBeforeLoading });

    // fetch report data
    const tagTexts = report.filterByTagIds.map((tagId) => {
      const tag = useTagStore.getState().tags.find((tag) => tag.id === tagId);
      return tag ? tag.text : "";
    });
    const { fromDate, toDate } = getDuration(report.duration, new Date());
    const reportQuery = {
      fromDate, // `fromDate` is always the first day of the year
      toDate, // `toDate` is always the last day of the year
      filterByTags: tagTexts,
      divideBy: report.divideBy,
    };
    const reportData = await callFetchReportData(reportQuery);
    if (reportData.error) return;

    // set loaded state
    const newReports = get().reports.map((_report) => {
      if (_report.id !== reportId) return _report;
      return {
        ..._report,
        isLoaded: true,
        isLoading: false,
        reportData: reportData.data.reportData,
      };
    });

    set({ reports: newReports, needRefresh: false });
  },
  needRefresh: false,
  changeNeedRefresh: (needRefresh: boolean) => {
    set({ needRefresh });
  },
  // edit report
  createReport: async (reportBase: ReportBaseType) => {
    // update local state
    const newReport = {
      ...reportBase,
      isLoaded: false,
      isLoading: false,
      reportData: [],
    };
    set({ reports: [...get().reports, newReport] });

    // post new report to server
    await callCreateReport({ reportBase });
  },
  updateReport: async (reportBase: ReportBaseType) => {
    // update local state
    const newReports = get().reports.map((_report) => {
      if (_report.id !== reportBase.id) return _report;
      return {
        ..._report,
        ...reportBase,
        isLoaded: false,
      };
    });
    set({ reports: newReports });

    // post updated report to server
    await callUpdateReport({ reportBase });
  },
  deleteReport: async (reportId: string) => {
    // update local state
    const newReports = get().reports.filter(
      (_report) => _report.id !== reportId
    );
    set({ reports: newReports });

    // delete report from server
    await callDeleteReport({ reportId });
  },
  changeOrderOfReports: async (orderInfo: { id: string; order: number }[]) => {
    // update local state
    const reportsWithNewOrder = get().reports.map((_report) => {
      const newOrder =
        orderInfo.find((order) => order.id === _report.id)?.order || 0;
      return {
        ..._report,
        order: newOrder,
      };
    });
    // sort reports by order
    reportsWithNewOrder.sort((a, b) => a.order - b.order);
    set({ reports: reportsWithNewOrder });

    // post updated order to server
    await callChangeOrderOfReports({ orderInfo });
  },
}));

export default useReportStore;

/**
 * Helper functions
 */

function getDuration(duration: string, date: Date) {
  switch (duration) {
    case CONS_REPORT_DURATION_LAST_7_DAYS:
      return {
        fromDate: `${modifyDateString(convertDateToString(date), -7)}`,
        toDate: `${modifyDateString(convertDateToString(date), +1)}`,
      };
    case CONS_REPORT_DURATION_LAST_30_DAYS:
      return {
        fromDate: `${modifyDateString(convertDateToString(date), -30)}`,
        toDate: `${modifyDateString(convertDateToString(date), +1)}`,
      };
    case CONS_REPORT_DURATION_LAST_90_DAYS:
      return {
        fromDate: `${modifyDateString(convertDateToString(date), -90)}`,
        toDate: `${modifyDateString(convertDateToString(date), +1)}`,
      };
    case CONS_REPORT_DURATION_THIS_MONTH:
      const yearMonth = convertDateToString(date).slice(0, 7);
      return {
        fromDate: `${yearMonth}-01`,
        toDate: `${yearMonth}-32`,
      };
    case CONS_REPORT_DURATION_THIS_YEAR:
      return {
        fromDate: `${date.getFullYear()}-01-01`,
        toDate: `${date.getFullYear() + 1}-01-01`,
      };
    case CONS_REPORT_DURATION_ALL_TIME:
      return {
        fromDate: "0000-01-01",
        toDate: "9999-01-01",
      };
    default:
      return {
        fromDate: "0000-01-01",
        toDate: "9999-01-01",
      };
  }
}
