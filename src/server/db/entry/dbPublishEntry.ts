import { extractPrimaryEmoji } from "../../../common/modules/emoji/extractPrimaryEmoji";
import { extractTagsFromBody } from "../../../common/modules/tag/extractTagsFromBody";
import { EntrySchemaType } from "../../../common/types/entry.types";
import { encryptEntry } from "./modules/EntryEncryption";

export async function dbPublishEntry(
  mongoose: any,
  entry: {
    id: string;
    userParmId: string;
    date: string;
    body: string;
  },
  options: {
    decryptBody: boolean;
  }
) {
  const Entry = mongoose.model("Entry");

  try {
    const tags = extractTagsFromBody(entry.body);
    const primaryEmoji = extractPrimaryEmoji(entry.body);

    const updatedEntry = await Entry.findOneAndUpdate(
      { id: entry.id, userParmId: entry.userParmId },
      {
        userParmId: entry.userParmId,
        body: encryptEntry(entry.body),
        decryptedBody: options.decryptBody ? entry.body : undefined,
        date: entry.date,
        tags,
        primaryEmoji,
        draft: false,
      },
      { new: true }
    );

    // return
    return updatedEntry as EntrySchemaType;
  } catch (error) {
    throw error;
  }
}
