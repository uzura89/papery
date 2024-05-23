import { EntrySchemaType } from "../../../common/types/entry.types";

export async function dbDraftEntry(
  mongoose: any,
  entry: {
    id: string;
    userParmId: string;
  }
) {
  const Entry = mongoose.model("Entry");

  try {
    // update entry
    const updatedEntry = await Entry.findOneAndUpdate(
      { id: entry.id, userParmId: entry.userParmId },
      {
        draft: true,
      },
      { new: true }
    );

    // return
    return updatedEntry as EntrySchemaType;
  } catch (error) {
    throw error;
  }
}
