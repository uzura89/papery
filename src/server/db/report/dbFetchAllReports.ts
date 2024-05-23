import { EntrySchemaType } from "../../../common/types/entry.types";

export async function dbFetchAllReports(
  mongoose: any,
  userParmId: string
): Promise<EntrySchemaType> {
  const Report = mongoose.model("Report");

  try {
    const reports = await Report.find({ userParmId }).sort({ order: 1 });

    return reports;
  } catch (error) {
    throw error;
  }
}
