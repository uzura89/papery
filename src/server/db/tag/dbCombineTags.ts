import { dbFetchEntries } from "../entry/dbFetchEntries";
import { dbUpdateEntries } from "../entry/dbUpdateEntries";

export async function dbCombineTags(
  mongoose: any,
  userParmId: string,
  id: string,
  newText: string
): Promise<void> {
  const Tag = mongoose.model("Tag");

  try {
    const tag = await Tag.findOne({
      userParmId,
      id,
    });

    const entriesWithThisTag = await dbFetchEntries(mongoose, userParmId, {
      tags: tag.text,
    });

    // prepare new entries
    const newEntries = entriesWithThisTag.map((entry) => {
      const newTagExits = entry.tags.find((_tag: string) => _tag === newText);

      if (newTagExits) {
        entry.tags = entry.tags.filter((_tag: string) => _tag !== tag.text);
      } else {
        entry.tags = entry.tags.map((_tag: string) => {
          if (_tag !== tag.text) return _tag;
          return newText;
        });
      }
      entry.body = entry.body.replace(`#${tag.text}`, `#${newText}`);
      return entry;
    });

    // update entries
    await dbUpdateEntries(mongoose, newEntries);

    // delte old tag
    await Tag.deleteOne({ userParmId, id });

    return;
  } catch (error) {
    throw error;
  }
}
