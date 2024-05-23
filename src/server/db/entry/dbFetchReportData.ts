import { EntrySchemaType } from "../../../common/types/entry.types";

export async function dbFetchEntriesForReport(
  mongoose: any,
  userParmId: string,
  reportQuery: {
    fromDate: string;
    toDate: string;
    filterByTags: string[];
  }
): Promise<EntrySchemaType[]> {
  const Entry = mongoose.model("Entry");

  try {
    const entries = await Entry.find({
      userParmId,
      date: {
        $gte: reportQuery.fromDate,
        $lt: reportQuery.toDate,
      },
      tags:
        reportQuery.filterByTags.length > 0
          ? { $in: reportQuery.filterByTags }
          : { $exists: true },
      pinned: false,
    }).lean();

    return entries;
  } catch (error) {
    throw error;
  }
}
