export async function dbDeleteTag(
  mongoose: any,
  userParmId: string,
  tagId: string
): Promise<void> {
  const Tag = mongoose.model("Tag");

  try {
    const tag = await Tag.findOne({
      userParmId,
      id: tagId,
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    // delete tag
    await Tag.deleteOne({
      userParmId,
      id: tagId,
    });

    return;
  } catch (error) {
    throw error;
  }
}
