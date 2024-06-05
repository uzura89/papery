"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENTRY_BODY_PINNED = exports.dbCreateDefaultEntries = void 0;
const uuid_1 = require("uuid");
const convertDateToString_1 = require("../../../common/modules/date/convertDateToString");
const dbCreateEntry_1 = require("./dbCreateEntry");
const dbCreateTag_1 = require("../tag/dbCreateTag");
const tag_cons_1 = require("../../../common/constants/tag.cons");
function dbCreateDefaultEntries(mongoose, userParmId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // create pinned entry
            const launchedDay = new Date("2024-05-05");
            yield (0, dbCreateEntry_1.dbCreateEntry)(mongoose, {
                userParmId,
                id: (0, uuid_1.v4)(),
                date: (0, convertDateToString_1.convertDateToString)(launchedDay),
                body: exports.ENTRY_BODY_PINNED,
                draft: false,
                pinned: true,
            });
            // create today entry:
            const today = new Date();
            yield (0, dbCreateEntry_1.dbCreateEntry)(mongoose, {
                userParmId,
                id: (0, uuid_1.v4)(),
                date: (0, convertDateToString_1.convertDateToString)(today),
                body: ENTRY_BODY_TODAY,
                draft: false,
                pinned: false,
            });
            // create default tags
            yield (0, dbCreateTag_1.dbCreateTag)(mongoose, {
                userParmId,
                id: (0, uuid_1.v4)(),
                text: "Diary",
                color: tag_cons_1.CONS_TAG_COLOR_LIST[0],
            });
            yield (0, dbCreateTag_1.dbCreateTag)(mongoose, {
                userParmId,
                id: (0, uuid_1.v4)(),
                text: "Exercise",
                color: tag_cons_1.CONS_TAG_COLOR_LIST[1],
            });
            yield (0, dbCreateTag_1.dbCreateTag)(mongoose, {
                userParmId,
                id: (0, uuid_1.v4)(),
                text: "MoodTracker",
                color: tag_cons_1.CONS_TAG_COLOR_LIST[2],
            });
            yield (0, dbCreateTag_1.dbCreateTag)(mongoose, {
                userParmId,
                id: (0, uuid_1.v4)(),
                text: "DailyGoals",
                color: tag_cons_1.CONS_TAG_COLOR_LIST[3],
            });
            // return
            return;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.dbCreateDefaultEntries = dbCreateDefaultEntries;
/**
 * Constants
 */
exports.ENTRY_BODY_PINNED = `
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
