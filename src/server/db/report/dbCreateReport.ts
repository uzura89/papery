import { ReportBaseType } from "../../../common/types";

export async function dbCreateReport(
  mongoose: any,
  userParmId: string,
  report: ReportBaseType
): Promise<void> {
  const Report = mongoose.model("Report");

  try {
    await Report.create({ ...report, userParmId });

    return;
  } catch (error) {
    throw error;
  }
}
