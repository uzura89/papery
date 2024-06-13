import { dbFetchEntries } from "../entry/dbFetchEntries";
import { dbUpdateEntry } from "../entry/dbUpdateEntry";
import { dbFetchSettings } from "../setting/dbFetchSettings";

export async function dbUpdateTag(
  mongoose: any,
  userParmId: string,
  id: string,
  newText: string,
  newColor: string
): Promise<void> {
  const Tag = mongoose.model("Tag");
  const Setting = mongoose.model("Setting");

  try {
    const setting = await dbFetchSettings(mongoose, userParmId);

    if (!newText.trim() || newText.includes(" ")) {
      throw new Error("Invalid tag name");
    }

    const tag = await Tag.findOne({
      userParmId,
      id,
    });

    const entriesWithThisTag = await dbFetchEntries(mongoose, userParmId, {
      tags: tag.text,
    });

    // update tag in entries
    for (const entry of entriesWithThisTag) {
      entry.tags = entry.tags.map((_tag: string) => {
        if (_tag !== tag.text) return _tag;
        return newText;
      });

      entry.body = entry.body.replace(`#${tag.text}`, `#${newText}`);
      await dbUpdateEntry(
        mongoose,
        {
          userParmId,
          id: entry.id,
        },
        {
          tags: entry.tags,
          body: entry.body,
        },
        {
          decryptBody: setting.textSearchEnabled,
        }
      );
    }

    // update tag text
    tag.text = newText;
    tag.color = newColor;
    await tag.save();

    return;
  } catch (error) {
    throw error;
  }
}
