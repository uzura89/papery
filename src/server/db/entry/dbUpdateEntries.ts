import { EntrySchemaType } from "../../../common/types/entry.types";
import { encryptEntry } from "./modules/EntryEncryption";

export async function dbUpdateEntries(
  mongoose: any,
  entries: EntrySchemaType[]
) {
  const Entry = mongoose.model("Entry");

  try {
    // update entries
    const updatedEntries = await Promise.all(
      entries.map(async (entry) => {
        const updatedEntry = await Entry.findOneAndUpdate(
          {
            userParmId: entry.userParmId,
            id: entry.id,
          },
          {
            date: entry.date,
            body: encryptEntry(entry.body),
            tags: entry.tags,
          },
          { new: true }
        );
        return updatedEntry;
      })
    );

    // return
    return updatedEntries as EntrySchemaType[];
  } catch (error) {
    throw error;
  }
}
