import clsx from "clsx";
import { useEffect } from "react";

import { ReportBaseWithDataType } from "../../../../common/types";
import { Card } from "../../atoms/card/Card";
import { LuFileEdit } from "react-icons/lu";
import {
  CONS_REPORT_DURATION_MAP,
  CONS_REPORT_TYPE_BAR,
} from "../../../../common/constants/report.cons";
import useTagStore from "../../../store/tag/tagStore";
import ReportDataBar from "../../molecules/report/ReportDataBar";
import ReportDataCloud from "../../molecules/report/ReportDataCloud";

export default function ReportItem(props: {
  reportData: ReportBaseWithDataType;
  fetchData: (reportId: string) => void;
  onEdit: (reportId: string) => void;
  needRefresh: boolean;
}) {
  // stores
  const tagStore = useTagStore();
  // variables

  /**
   * Effects
   */

  useEffect(() => {
    // do nothing if loading
    if (!tagStore.tagLoaded) return;
    if (props.reportData.isLoading) return;
    // fetch data if needed
    if (props.needRefresh || !props.reportData.isLoaded) {
      props.fetchData(props.reportData.id);
    }
  }, [props.reportData, props.needRefresh, tagStore.tagLoaded]);

  /**
   * Render
   */

  function renderReportData() {
    if (props.reportData.reportType === CONS_REPORT_TYPE_BAR) {
      return (
        <ReportDataBar
          divideBy={props.reportData.divideBy}
          reportData={props.reportData.reportData}
        />
      );
    }

    return (
      <ReportDataCloud
        divideBy={props.reportData.divideBy}
        reportData={props.reportData.reportData}
      />
    );
  }

  return (
    <div className={clsx(props.reportData.isLoading && "opacity-50")}>
      <Card>
        <div className="padding-x-sm py-4 relative">
          {/* Edit button */}
          <button
            className="btn btn-text text-foreLight absolute top-2 right-2"
            onClick={() => props.onEdit(props.reportData.id)}
          >
            <LuFileEdit className="text-md md:text-[15px]" />
          </button>

          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-fore text-lg font-bold">
              {props.reportData.reportName}
            </h2>
          </div>

          {/* Report */}
          {props.reportData.reportData.length === 0 && (
            <div className="text-foreGrayLight">
              {props.reportData.isLoading ? "Loading..." : "No data"}
            </div>
          )}
          {renderReportData()}

          {/* Duration */}
          <div className="text-sm text-foreGray mt-2 flex items-center gap-1.5 justify-end">
            {CONS_REPORT_DURATION_MAP[props.reportData.duration]}
          </div>
        </div>
      </Card>
    </div>
  );
}
