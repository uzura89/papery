export async function dbEncryptEntries(
  mongoose: any,
  params: {
    userParmId: string;
  }
): Promise<void> {
  const Entry = mongoose.model("Entry");

  try {
    // remove decryptedBody from all entries
    await Entry.updateMany(
      { userParmId: params.userParmId },
      { $set: { decryptedBody: null } }
    );

    return;
  } catch (error) {
    throw error;
  }
}
