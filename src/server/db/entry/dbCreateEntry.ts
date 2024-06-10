import { extractPrimaryEmoji } from "../../../common/modules/emoji/extractPrimaryEmoji";
import { extractTagsFromBody } from "../../../common/modules/tag/extractTagsFromBody";
import { EntrySchemaType } from "../../../common/types/entry.types";
import { encryptEntry } from "./modules/EntryEncryption";

export async function dbCreateEntry(
  mongoose: any,
  entry: {
    userParmId: string;
    id: string;
    date: string;
    body: string;
    draft: boolean;
    pinned: boolean;
  },
  options?: {
    decrypt?: boolean;
  }
): Promise<EntrySchemaType> {
  const Entry = mongoose.model("Entry");

  const tags = extractTagsFromBody(entry.body);
  const primaryEmoji = extractPrimaryEmoji(entry.body);

  try {
    // create entry
    const newEntry: EntrySchemaType = {
      userParmId: entry.userParmId,
      id: entry.id,
      body: encryptEntry(entry.body),
      date: entry.date,
      tags,
      draft: entry.draft,
      primaryEmoji,
      decryptedBody: options?.decrypt ? entry.body : null,
      pinned: entry.pinned,
    };
    const createdEntry = await Entry.create(newEntry);

    // return
    return createdEntry;
  } catch (error) {
    throw error;
  }
}
