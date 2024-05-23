import { EntrySchemaType } from "../../../common/types/entry.types";

export async function dbTogglePinOfEntry(
  mongoose: any,
  entry: {
    userParmId: string;
    id: string;
    pinned: boolean;
  }
) {
  const Entry = mongoose.model("Entry");

  try {
    const updatedEntry = await Entry.findOneAndUpdate(
      { id: entry.id, userParmId: entry.userParmId },
      {
        pinned: entry.pinned,
      },
      { new: true }
    );

    // return
    return updatedEntry as EntrySchemaType;
  } catch (error) {
    throw error;
  }
}
