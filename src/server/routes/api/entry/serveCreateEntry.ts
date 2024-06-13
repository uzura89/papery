import { dbCreateEntry } from "../../../db/entry/dbCreateEntry";
import { dbFetchSettings } from "../../../db/setting/dbFetchSettings";

export async function serveCreateEntry(req: any, res: any) {
  const { userParmId } = req;
  const { id, body, date } = req.body;

  try {
    const settings = await dbFetchSettings(req.mongoose, userParmId);

    const entry = await dbCreateEntry(
      req.mongoose,
      {
        userParmId,
        id,
        body,
        date,
        draft: true,
        pinned: false,
      },
      {
        decryptBody: settings.textSearchEnabled,
      }
    );

    return res.status(200).json({ id: entry.id });
  } catch (error) {
    return res.status(500).json({
      message:
        "Failed to save the entry. Before loosing the entry, please copy & paste it to somewhere and refresh this page.",
    });
  }
}
