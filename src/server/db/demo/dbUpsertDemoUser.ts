import { v4 } from "uuid";

import { convertDateToString } from "../../../common/modules/date/convertDateToString";
import { dbCreateTag } from "../tag/dbCreateTag";
import { CONS_TAG_COLOR_LIST } from "../../../common/constants/tag.cons";
import { dbCreateEntry } from "../entry/dbCreateEntry";
import { CONS_DEMO_USER_ID } from "../../../common/constants";
import { ENTRY_BODY_PINNED } from "../entry/dbCreateDefaultEntries";
import { dbCreateReport } from "../report/dbCreateReport";
import {
  CONS_REPORT_DIVIDE_BY_EMOJI,
  CONS_REPORT_DIVIDE_BY_TAG,
  CONS_REPORT_DURATION_ALL_TIME,
  CONS_REPORT_DURATION_LAST_30_DAYS,
  CONS_REPORT_DURATION_THIS_YEAR,
  CONS_REPORT_TYPE_BAR,
  CONS_REPORT_TYPE_CLOUD,
} from "../../../common/constants/report.cons";
import { dbFetchAllTags } from "../tag/dbFetchAllTags";
import { dbUpdateSetting } from "../setting/dbUpdateSettings";
import { CONS_SETTING_THEME_LIGHT } from "../../../common/constants/setting.cons";

export async function dbUpsertDemoUser(mongoose: any): Promise<void> {
  const userParmId = CONS_DEMO_USER_ID;

  try {
    // clear existing data
    await clearExistingData(mongoose, userParmId);

    // create user
    await createDemoUser(mongoose, userParmId);

    // create default entries
    await createDefaultEntries(mongoose, userParmId);

    // create default reports
    await createDemoReport(mongoose, userParmId);

    // create demo setting
    await createDemoSetting(mongoose, userParmId);

    // return
    return;
  } catch (error) {
    throw error;
  }
}

/**
 * clearExistingData
 */

async function clearExistingData(mongoose: any, userParmId: string) {
  const User = mongoose.model("User");
  const Tag = mongoose.model("Tag");
  const Entry = mongoose.model("Entry");
  const Report = mongoose.model("Report");

  await User.deleteOne({ userParmId });
  await Tag.deleteMany({ userParmId });
  await Entry.deleteMany({ userParmId });
  await Report.deleteMany({ userParmId });
}

/**
 * createDemoUser
 */

async function createDemoUser(mongoose: any, userParmId: string) {
  const User = await mongoose.model("User");

  await User.create({
    userParmId,
    email: "demo@mail.com",
    googleId: "",
  });

  return;
}

/**
 * createDefaultEntries
 */

async function createDefaultEntries(mongoose: any, userParmId: string) {
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

  // create entry of one day ago
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  await dbCreateEntry(mongoose, {
    userParmId,
    id: v4(),
    date: convertDateToString(yesterday),
    body: ENTRY_BODY_HABIT_1,
    draft: false,
    pinned: false,
  });
  await dbCreateEntry(mongoose, {
    userParmId,
    id: v4(),
    date: convertDateToString(yesterday),
    body: ENTRY_BODY_MOOD_1,
    draft: false,
    pinned: false,
  });
  await dbCreateEntry(mongoose, {
    userParmId,
    id: v4(),
    date: convertDateToString(yesterday),
    body: ENTRY_BODY_GOALS_1,
    draft: false,
    pinned: false,
  });

  // create entry of two days ago
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  await dbCreateEntry(mongoose, {
    userParmId,
    id: v4(),
    date: convertDateToString(twoDaysAgo),
    body: ENTRY_BODY_HABIT_2,
    draft: false,
    pinned: false,
  });
  await dbCreateEntry(mongoose, {
    userParmId,
    id: v4(),
    date: convertDateToString(twoDaysAgo),
    body: ENTRY_BODY_MOOD_2,
    draft: false,
    pinned: false,
  });
  await dbCreateEntry(mongoose, {
    userParmId,
    id: v4(),
    date: convertDateToString(twoDaysAgo),
    body: ENTRY_BODY_GOALS_2,
    draft: false,
    pinned: false,
  });

  // create entry of three days ago
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  await dbCreateEntry(mongoose, {
    userParmId,
    id: v4(),
    date: convertDateToString(threeDaysAgo),
    body: ENTRY_BODY_HABIT_3,
    draft: false,
    pinned: false,
  });
  await dbCreateEntry(mongoose, {
    userParmId,
    id: v4(),
    date: convertDateToString(threeDaysAgo),
    body: ENTRY_BODY_MOOD_3,
    draft: false,
    pinned: false,
  });

  // create entry of 4 days ago
  const dateDiary2 = new Date();
  dateDiary2.setDate(dateDiary2.getDate() - 5);
  await dbCreateEntry(mongoose, {
    userParmId,
    id: v4(),
    date: convertDateToString(dateDiary2),
    body: ENTRY_BODY_DIARY_2,
    draft: false,
    pinned: false,
  });

  // create entry
  const dateDiary3 = new Date();
  dateDiary3.setDate(dateDiary3.getDate() - 4);
  await dbCreateEntry(mongoose, {
    userParmId,
    id: v4(),
    date: convertDateToString(dateDiary3),
    body: ENTRY_BODY_DIARY_3,
    draft: false,
    pinned: false,
  });

  // create year ago entry
  const lastYear = new Date();
  lastYear.setFullYear(lastYear.getFullYear() - 1);
  await dbCreateEntry(mongoose, {
    userParmId,
    id: v4(),
    date: convertDateToString(lastYear),
    body: ENTRY_BODY_DIARY_1,
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
}

/**
 * createDemoReport
 */

async function createDemoReport(mongoose: any, userParmId: string) {
  // create All Tags report
  await dbCreateReport(mongoose, userParmId, {
    id: v4(),
    reportName: "All Tags",
    filterByTagIds: [],
    divideBy: CONS_REPORT_DIVIDE_BY_TAG,
    reportType: CONS_REPORT_TYPE_BAR,
    duration: CONS_REPORT_DURATION_ALL_TIME,
    order: 0,
  });

  // create Exercise report if the tag exists
  const allTags = await dbFetchAllTags(mongoose, userParmId);
  const exerciseTag = allTags.find((tag) => tag.text === "Exercise");
  if (exerciseTag) {
    await dbCreateReport(mongoose, userParmId, {
      id: v4(),
      reportName: "Exercise",
      filterByTagIds: [exerciseTag.id],
      divideBy: CONS_REPORT_DIVIDE_BY_EMOJI,
      reportType: CONS_REPORT_TYPE_BAR,
      duration: CONS_REPORT_DURATION_LAST_30_DAYS,
      order: 0,
    });
  }

  // emoji cloud of this year
  await dbCreateReport(mongoose, userParmId, {
    id: v4(),
    reportName: "Emoji Cloud",
    filterByTagIds: [],
    divideBy: CONS_REPORT_DIVIDE_BY_EMOJI,
    reportType: CONS_REPORT_TYPE_CLOUD,
    duration: CONS_REPORT_DURATION_THIS_YEAR,
    order: 0,
  });
}

/**
 * createDemoSetting
 */

async function createDemoSetting(mongoose: any, userParmId: string) {
  await dbUpdateSetting(mongoose, userParmId, {
    theme: CONS_SETTING_THEME_LIGHT,
  });
  return;
}

/**
 * Constants
 */

const ENTRY_BODY_GOALS_1 = `#DailyGoals 🌑
[] Wake up at 7AM
[] Go to the gym`;

const ENTRY_BODY_HABIT_1 = `#Exercise 🏃
I jogged for about 30 minutes and felt so energized throughout the day!`;

const ENTRY_BODY_MOOD_1 = `#MoodTracker 😌
Today was dedicated to reading and relaxation. I spent hours engrossed in a novel that's been on my shelf for ages. The tranquility of turning each page was soothing, and the outside world just faded away. It was the peaceful break I needed.`;

const ENTRY_BODY_GOALS_2 = `#DailyGoals 🌗
[] Wake up at 7AM
[x] Jogging`;

const ENTRY_BODY_HABIT_2 = `#Exercise 🚫
I couldn't exercise because I woke up late. 
I will wake up earlier tomorrow.`;

const ENTRY_BODY_MOOD_2 = `#MoodTracker 🤩
Went to see the highly anticipated new movie today—it was thrilling! The crowded theater really amped up the energy. Can't wait to discuss it with friends and relive the excitement!`;

const ENTRY_BODY_HABIT_3 = `#Exercise 💪
I went to the gym and did 3 sets of deadlifting.`;

const ENTRY_BODY_MOOD_3 = `#MoodTracker 😮‍💨
Today was exceptionally long and demanding at work. Back-to-back meetings and a pile of urgent tasks kept me on my toes all day. Although I managed to tackle everything, I'm left feeling completely drained. Looking forward to some well-deserved rest tonight.`;

const ENTRY_BODY_DIARY_1 = `#Diary
## 📅 Some Diary from a Year Ago 
This is an old diary from one year ago.
What were you doing on this day?`;

const ENTRY_BODY_DIARY_2 = `#Diary 🚀 Just started using Papery!`;

const ENTRY_BODY_DIARY_3 = `#Diary ☕️ Met up with Alex today at our favorite café. We talked for hours about life, dreams, and the challenges we’ve faced. It felt like a much-needed soul refresh.`;
