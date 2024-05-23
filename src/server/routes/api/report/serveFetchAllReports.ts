import { dbFetchAllReports } from "../../../db/report/dbFetchAllReports";

export async function serveFetchAllReports(req: any, res: any) {
  const { userParmId } = req;

  try {
    const reports = await dbFetchAllReports(req.mongoose, userParmId);

    return res.status(200).json({ reports });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
