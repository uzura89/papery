import { EntrySchemaType } from "../../../common/types/entry.types";
import { encryptEntry } from "./modules/EntryEncryption";

export async function dbCreateBlankEntry(
  mongoose: any,
  entry: {
    userParmId: string;
    id: string;
    date: string;
    body: string;
  }
): Promise<EntrySchemaType> {
  const Entry = mongoose.model("Entry");

  try {
    // create entry
    const newEntry: EntrySchemaType = {
      userParmId: entry.userParmId,
      id: entry.id,
      body: encryptEntry(entry.body),
      decryptedBody: null,
      date: entry.date,
      tags: [],
      draft: true,
      primaryEmoji: "",
      pinned: false,
    };
    const createdEntry = await Entry.create(newEntry);

    // return
    return createdEntry;
  } catch (error) {
    throw error;
  }
}
