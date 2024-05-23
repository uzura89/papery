import { EntrySchemaType } from "../../../common/types/entry.types";
import { encryptEntry } from "./modules/EntryEncryption";

export async function dbUpdateEntry(
  mongoose: any,
  target: {
    userParmId: string;
    id: string;
  },
  newValues: {
    date?: string;
    body?: string;
    tags?: string[];
  }
) {
  const Entry = mongoose.model("Entry");

  const operator: any = {};

  // check if there are any new values
  if (newValues.date) operator["date"] = newValues.date;
  if (newValues.body) operator["body"] = encryptEntry(newValues.body);
  if (newValues.tags) operator["tags"] = newValues.tags;

  try {
    // update entry
    const updatedEntry = await Entry.findOneAndUpdate(
      { id: target.id, userParmId: target.userParmId },
      operator,
      { new: true }
    );

    // return
    return updatedEntry as EntrySchemaType;
  } catch (error) {
    throw error;
  }
}
