import { ReportSchemaType } from "../../../common/types";

export async function dbChangeOrderOfReports(
  mongoose: any,
  userParmId: string,
  orderInfo: { id: string; order: number }[]
): Promise<void> {
  const Report = mongoose.model("Report");

  try {
    // Find all reports of the user
    const reports = await Report.find({ userParmId });

    // Update order of each report
    for (const order of orderInfo) {
      const report = reports.find(
        (report: ReportSchemaType) => report.id === order.id
      );
      if (report) {
        report.order = order.order;
        await report.save();
      }
    }

    return;
  } catch (error) {
    throw error;
  }
}
