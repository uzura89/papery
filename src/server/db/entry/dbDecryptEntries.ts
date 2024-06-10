import { EntrySchemaType } from "../../../common/types/entry.types";
import { decryptEntry } from "./modules/EntryEncryption";

export async function dbDecryptEntries(
  mongoose: any,
  params: {
    userParmId: string;
  }
): Promise<void> {
  const Entry = mongoose.model("Entry");

  try {
    // get entries
    const entries: EntrySchemaType[] = await Entry.find({
      userParmId: params.userParmId,
    }).lean();

    // create bulk operation
    const bulkOps = entries.map((entry) => {
      return {
        updateOne: {
          filter: {
            id: entry.id,
          },
          update: {
            $set: {
              decryptedBody: decryptEntry(entry.body),
            },
          },
        },
      };
    });

    // update entries
    await Entry.bulkWrite(bulkOps);

    return;
  } catch (error) {
    throw error;
  }
}
