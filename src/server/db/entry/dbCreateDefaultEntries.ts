import { v4 } from "uuid";

import { convertDateToString } from "../../../common/modules/date/convertDateToString";
import { dbCreateEntry } from "./dbCreateEntry";
import { dbCreateTag } from "../tag/dbCreateTag";
import { CONS_TAG_COLOR_LIST } from "../../../common/constants/tag.cons";

export async function dbCreateDefaultEntries(
  mongoose: any,
  userParmId: string
): Promise<void> {
  try {
    // create pinned entry
    const launchedDay = new Date("2024-05-05");
    await dbCreateEntry(mongoose, {
      userParmId,
      id: v4(),
      date: convertDateToString(launchedDay),
      body: ENTRY_BODY_PINNED,
      draft: false,
      pinned: true,
    });

    // create today entry:
    const today = new Date();
    await dbCreateEntry(mongoose, {
      userParmId,
      id: v4(),
      date: convertDateToString(today),
      body: ENTRY_BODY_TODAY,
      draft: false,
      pinned: false,
    });

    // create default tags
    await dbCreateTag(mongoose, {
      userParmId,
      id: v4(),
      text: "Diary",
      color: CONS_TAG_COLOR_LIST[0],
    });

    await dbCreateTag(mongoose, {
      userParmId,
      id: v4(),
      text: "Exercise",
      color: CONS_TAG_COLOR_LIST[1],
    });

    await dbCreateTag(mongoose, {
      userParmId,
      id: v4(),
      text: "MoodTracker",
      color: CONS_TAG_COLOR_LIST[2],
    });

    await dbCreateTag(mongoose, {
      userParmId,
      id: v4(),
      text: "DailyGoals",
      color: CONS_TAG_COLOR_LIST[3],
    });

    // return
    return;
  } catch (error) {
    throw error;
  }
}

/**
 * Constants
 */

export const ENTRY_BODY_PINNED = `
# Welcome to Papery 👋
Papery is a personal journal app designed to make your days more memorable and purposeful.

## It's Not Just a Journal App:
- 📅 Write regular diary entries with the #Diary tag
- 🧘 Track your exercise habits with the #Exercise tag
- 😊 Monitor your mood with the #MoodTracker tag
- ✅ Set your daily goals with #DailyGoals tag
- 🏷️ And create your own tags to fit your needs!

### Let's Start Journaling!

Now, let's begin a journey—a journey to live each day more gratefully and mindfully.

> "Begin at once to live, and count each separate day as a separate life." - Seneca

If you have any questions, please let us know at:
papery.contact@gmail.com
`;

const ENTRY_BODY_TODAY = `#Diary 🚀 Just started using Papery!`;
