import { EntryHistoryType } from "../../../common/types/entryHistory.types";

export async function dbFetchEntryHistories(
  mongoose: any,
  options: {
    userParmId: string;
    year: string;
    tags: string[];
  }
): Promise<EntryHistoryType[]> {
  const Entry = mongoose.model("Entry");

  try {
    const draftEntries = await Entry.aggregate([
      {
        $match: {
          userParmId: options.userParmId,
          date: { $regex: `^${options.year}` },
          tags:
            options.tags.length === 0
              ? { $exists: true }
              : { $in: options.tags },
          pinned: options.tags.length === 0 ? { $exists: true } : false,
        },
      },
      {
        $group: {
          _id: { date: "$date" },
          date: { $first: "$date" },
          entryCnt: { $sum: 1 },
          primaryEmojis: {
            $push: "$primaryEmoji",
          },
        },
      },
      {
        $sort: { _id: -1 },
      },
    ]);

    return draftEntries;
  } catch (error) {
    throw error;
  }
}
