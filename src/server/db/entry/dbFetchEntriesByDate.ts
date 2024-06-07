export default async function dbFetchEntriesByDate(
  mongoose: any,
  options: {
    userParmId: string;
    date: string;
    onlyPublished?: boolean;
  }
) {
  const Entry = mongoose.model("Entry");

  try {
    const entries = await Entry.find({
      userParmId: options.userParmId,
      date: options.date,
      ...(options.onlyPublished && { draft: false }),
    }).lean();

    return entries;
  } catch (error) {
    return [];
  }
}
