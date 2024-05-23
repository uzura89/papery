import { dbDeleteReport } from "../../../db/report/dbDeleteReport";

export async function serveDeleteReport(req: any, res: any) {
  const { userParmId } = req;
  const { reportId } = req.body;

  try {
    await dbDeleteReport(req.mongoose, userParmId, reportId);

    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
