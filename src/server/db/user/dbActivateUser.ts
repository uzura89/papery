export async function dbActivateUser(mongoose: any, userParmId: string) {
  const User = mongoose.model("User");

  try {
    await User.findOneAndUpdate(
      {
        userParmId,
      },
      {
        activated: true,
      },
      {
        new: true,
      }
    );

    return;
  } catch (error) {
    throw error;
  }
}
