import { ReportBaseType } from "../../../../common/types";
import { dbUpdateReport } from "../../../db/report/dbUpdateReport";

export async function serveUpdateReport(req: any, res: any) {
  const { userParmId } = req;
  const {
    id,
    reportName,
    filterByTagIds,
    divideBy,
    reportType,
    duration,
    order,
  }: ReportBaseType = req.body.reportBase;

  try {
    await dbUpdateReport(req.mongoose, userParmId, {
      id,
      reportName,
      filterByTagIds,
      divideBy,
      reportType,
      duration,
      order,
    });

    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
