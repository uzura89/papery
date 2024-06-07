import { CONS_ENTRY_LIMIT_PER_DAY } from "../../../../common/constants";
import dbFetchEntriesByDate from "../../../db/entry/dbFetchEntriesByDate";
import { dbPublishEntry } from "../../../db/entry/dbPublishEntry";
import { dbCheckIfPremiumUser } from "../../../db/user/dbCheckIfPremiumUser";

export async function servePublishEntry(req: any, res: any) {
  const { userParmId } = req;
  const { id, body, date } = req.body;

  try {
    const canPublish = await checkCanPublishEntry(req.mongoose, {
      userParmId,
      date,
    });

    if (canPublish === false) {
      return res.status(400).json({
        message: `You can only save ${CONS_ENTRY_LIMIT_PER_DAY} entries for the same day. Please upgrade to premium to save unlimited entries.`,
      });
    }

    const entry = await dbPublishEntry(req.mongoose, {
      userParmId,
      id,
      body,
      date,
    });

    return res.status(200).json({ entry });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

async function checkCanPublishEntry(mongoose: any, { userParmId, date }: any) {
  const isPremium = await dbCheckIfPremiumUser(mongoose, userParmId);
  if (isPremium) return true;

  const entries = await dbFetchEntriesByDate(mongoose, {
    userParmId,
    date,
    onlyPublished: true,
  });

  if (entries.length >= CONS_ENTRY_LIMIT_PER_DAY) {
    return false;
  }

  return true;
}
