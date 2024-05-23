import { EntrySchemaType } from "../../../common/types/entry.types";
import { decryptEntry } from "./modules/EntryEncryption";

export async function dbFetchEntries(
  mongoose: any,
  userParmId: string,
  query: object
): Promise<EntrySchemaType[]> {
  const Entry = mongoose.model("Entry");

  try {
    const entries = await Entry.find({
      userParmId,
      ...query,
    }).lean();

    const entriesDecrypted = entries.map((entry: EntrySchemaType) => {
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
