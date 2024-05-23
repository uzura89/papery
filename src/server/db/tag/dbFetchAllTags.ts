import { TagSchemaType } from "../../../common/types/tag.types";

export async function dbFetchAllTags(
  mongoose: any,
  userParmId: string
): Promise<TagSchemaType[]> {
  const Tag = mongoose.model("Tag");

  try {
    // fetch all tags
    const tags = await Tag.find({ userParmId });

    // return
    return tags;
  } catch (error) {
    throw error;
  }
}
