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
  const searchQuery = makeSearchQuery(userParmId, text);

  const tags = extractTagsFromBody(text || "");

  try {
    const draftEntries = await Entry.aggregate([
      searchQuery,
      {
        $match: {
          userParmId,
          draft: true,
          ...options,
        },
      },
      {
        $sort: {
          date: -1,
          created: -1,
        },
      },
    ]);

    const pinnedEntries = await Entry.aggregate([
      searchQuery,
      {
        $match: {
          userParmId,
          pinned: tags.length > 0 ? { $exists: false } : true,
          draft: false,
          ...options,
        },
      },
      {
        $sort: {
          date: -1,
          created: -1,
        },
      },
    ]);

    // fetch published entries 50 max
    // const publishedEntries = await Entry.find({
    //   userParmId,
    //   draft: false,
    //   pinned: false,
    //   ...options,
    // })
    //   .sort({ date: -1, created: -1 })
    //   .limit(50);

    const publishedEntries = await Entry.aggregate([
      searchQuery,
      {
        $match: {
          userParmId,
          draft: false,
          pinned: false,
          ...options,
        },
      },
      {
        $sort: {
          date: -1,
          created: -1,
        },
      },
    ]);

    const entriesDecrypted = [
      ...draftEntries,
      ...pinnedEntries,
      ...publishedEntries,
    ].map((entry) => {
      return {
        ...entry,
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

function makeSearchQuery(userParmId: string, text?: string) {
  const freeTexts = extractFreeTexts(text);

  const freeTextsQuery =
    freeTexts.length > 0
      ? {
          $search: {
            compound: {
              must: [
                {
                  text: {
                    path: "decryptedBody",
                    query: freeTexts.join(" "),
                  },
                },
              ],
              filter: [
                {
                  text: {
                    path: "userParmId",
                    query: userParmId,
                  },
                },
              ],
            },
          },
        }
      : {
          $search: {
            compound: {
              filter: [
                {
                  text: {
                    path: "userParmId",
                    query: userParmId,
                  },
                },
              ],
            },
          },
        };

  return freeTextsQuery;
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

function extractFreeTexts(text?: string) {
  if (!text || !text.trim()) return [];

  return text
    .split(" ")
    .filter((word) => isFreeText(word))
    .filter((text) => text.trim().length > 0);
}

function isFreeText(word: string) {
  if (isDate(word)) return false;
  if (word.startsWith("#")) return false;
  if (word.includes("~")) return false;

  return true;
}
