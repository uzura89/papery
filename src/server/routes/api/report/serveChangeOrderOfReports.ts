import { dbChangeOrderOfReports } from "../../../db/report/dbChangeOrderOfReports";

export async function serveChangeOrderOfReports(req: any, res: any) {
  const { userParmId } = req;
  const orderInfo: { id: string; order: number }[] = req.body.orderInfo;

  try {
    await dbChangeOrderOfReports(req.mongoose, userParmId, orderInfo);

    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
