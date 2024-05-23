export async function dbDeleteEntry(
  mongoose: any,
  entry: {
    userParmId: string;
    id: string;
  }
): Promise<string> {
  const Entry = mongoose.model("Entry");

  try {
    // delete entry
    const deletedEntry = await Entry.findOneAndDelete({
      id: entry.id,
      userParmId: entry.userParmId,
    });

    // return
    return deletedEntry.id as string;
  } catch (error) {
    throw error;
  }
}
