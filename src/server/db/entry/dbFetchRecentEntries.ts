import { extractTagsFromBody } from "../../../common/modules/tag/extractTagsFromBody";
import { EntrySchemaType } from "../../../common/types/entry.types";
import { decryptEntry } from "./modules/EntryEncryption";

export async function dbFetchRecentEntries(
  mongoose: any,
  userParmId: string,
  text?: string
): Promise<EntrySchemaType[]> {
  const Entry = mongoose.model("Entry");

  const options = makeTextFilter(text);
  const tags = extractTagsFromBody(text || "");

  try {
    // fetch draft entries
    const draftEntries = await Entry.find({
      userParmId,
      draft: true,
      ...options,
    }).sort({
      date: -1,
      created: -1,
    });

    // fetch pinned entries
    const pinnedEntries = await Entry.find({
      userParmId,
      pinned: tags.length > 0 ? { $exists: false } : true,
      draft: false,
      ...options,
    }).sort({ date: -1 });

    // fetch published entries 50 max
    const publishedEntries = await Entry.find({
      userParmId,
      draft: false,
      pinned: false,
      ...options,
    })
      .sort({ date: -1, created: -1 })
      .limit(50);

    const entriesDecrypted = [
      ...draftEntries,
      ...pinnedEntries,
      ...publishedEntries,
    ].map((entry) => {
      return {
        ...entry.toObject(),
        body: decryptEntry(entry.body),
      };
    });

    return entriesDecrypted;
  } catch (error) {
    throw error;
  }
}

/**
 * make options
 */

function makeTextFilter(text?: string) {
  if (!text || !text.trim()) return {};

  // extract tags and date from raw text
  const tags = extractTagsFromBody(text);
  const dateRange = extractDateRange(text);
  const date = extractDate(text);

  // if no tags and date, fetch none
  if (tags.length === 0 && !date && dateRange.length === 0) {
    return {
      id: { $exists: false },
    };
  }

  // prepare query
  const tagsQuery = tags.length > 0 ? { $all: tags } : { $exists: true };
  const dateQuery =
    dateRange.length == 2
      ? {
          $gte: dateRange[0],
          $lte: dateRange[1],
        }
      : date
      ? { $regex: new RegExp(date, "i") }
      : { $exists: true };

  return {
    $and: [
      // find tags includes #text
      { tags: tagsQuery },
      // find date
      { date: dateQuery },
    ],
  };
}

/**
 * Modules
 */

function extractDateRange(text: string) {
  const dateRange = text.split("~");
  if (dateRange.length !== 2) return [];

  const fromDate = extractDate(dateRange[0]);
  const toDate = extractDate(dateRange[1]);

  if (!fromDate || !toDate) return [];

  return [fromDate, toDate];
}

function extractDate(text: string) {
  return text.split(" ").find((word) => isDate(word));
}

function isDate(word: string) {
  // YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(word)) return true;
  // YYYY-MM
  if (/^\d{4}-\d{2}$/.test(word)) return true;
  // YYYY
  if (/^\d{4}$/.test(word)) return true;
  // MM-DD
  if (/^\d{2}-\d{2}$/.test(word)) return true;

  return false;
}
