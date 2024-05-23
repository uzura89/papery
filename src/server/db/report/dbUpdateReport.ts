import { ReportBaseType } from "../../../common/types";

export async function dbUpdateReport(
  mongoose: any,
  userParmId: string,
  report: ReportBaseType
): Promise<void> {
  const Report = mongoose.model("Report");

  try {
    await Report.updateOne(
      { userParmId, id: report.id },
      {
        $set: {
          reportName: report.reportName,
          filterByTagIds: report.filterByTagIds,
          divideBy: report.divideBy,
          reportType: report.reportType,
          duration: report.duration,
          order: report.order,
        },
      }
    );

    return;
  } catch (error) {
    throw error;
  }
}
