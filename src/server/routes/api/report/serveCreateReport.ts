import { ReportBaseType } from "../../../../common/types";
import { dbCreateReport } from "../../../db/report/dbCreateReport";

export async function serveCreateReport(req: any, res: any) {
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
    await dbCreateReport(req.mongoose, userParmId, {
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
