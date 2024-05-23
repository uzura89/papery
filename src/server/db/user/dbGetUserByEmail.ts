export async function dbGetUserByEmail(mongoose: any, email: string) {
  const User = mongoose.model("User");

  try {
    const user = await User.findOne({
      email,
    });

    return user;
  } catch (error) {
    throw error;
  }
}
