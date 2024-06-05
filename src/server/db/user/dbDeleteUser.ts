export async function dbDeleteUser(mongoose: any, userParmId: string) {
  console.log("🚀 ~ dbDeleteUser ~ userParmId:", userParmId);
  const Entry = mongoose.model("Entry");
  const Report = mongoose.model("Report");
  const Setting = mongoose.model("Setting");
  const Tag = mongoose.model("Tag");
  const Template = mongoose.model("Template");
  const User = mongoose.model("User");

  try {
    const user = await User.findOne({ userParmId });
    console.log("🚀 ~ dbDeleteUser ~ user:", user);
    if (!user) throw new Error("User not found");

    // delete all related data
    await Entry.deleteMany({ userParmId });
    await Report.deleteMany({ userParmId });
    await Setting.deleteMany({ userParmId });
    await Tag.deleteMany({ userParmId });
    await Template.deleteMany({ userParmId });
    // delete user
    await User.deleteOne({ userParmId });

    return;
  } catch (error) {
    throw error;
  }
}
