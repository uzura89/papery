import { EntrySchemaType } from "./../../../common/types/entry.types";
import { decryptEntry } from "./modules/EntryEncryption";

export async function dbFetchEntryById(
  mongoose: any,
  userParmId: string,
  id: string
): Promise<EntrySchemaType> {
  const Entry = mongoose.model("Entry");

  try {
    const entry: EntrySchemaType = await Entry.findOne({
      userParmId,
      id,
    }).lean();

    if (!entry) {
      throw new Error("Entry not found");
    }

    return {
      ...entry,
      body: decryptEntry(entry.body),
    };
  } catch (error) {
    throw error;
  }
}
