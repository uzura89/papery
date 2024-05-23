import { TagSchemaType } from "../../../common/types/tag.types";

export async function dbCreateTag(
  mongoose: any,
  tag: {
    userParmId: string;
    id: string;
    text: string;
    color: string;
  }
): Promise<TagSchemaType> {
  const Tag = mongoose.model("Tag");

  try {
    if (!tag.userParmId || !tag.id || !tag.text.trim() || !tag.color) {
      throw new Error("Invalid input");
    }

    if (tag.text.includes(" ")) {
      throw new Error("Tag name cannot contain spaces");
    }

    // create entry
    const newTag: TagSchemaType = {
      userParmId: tag.userParmId,
      id: tag.id,
      text: tag.text,
      color: tag.color,
    };
    const createdTag = await Tag.create(newTag);

    // return
    return createdTag;
  } catch (error) {
    throw error;
  }
}
