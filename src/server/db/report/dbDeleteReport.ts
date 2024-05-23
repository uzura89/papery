export async function dbDeleteReport(
  mongoose: any,
  userParmId: string,
  reportId: string
): Promise<void> {
  const Report = mongoose.model("Report");

  try {
    await Report.deleteOne({ userParmId, id: reportId });

    return;
  } catch (error) {
    throw error;
  }
}
