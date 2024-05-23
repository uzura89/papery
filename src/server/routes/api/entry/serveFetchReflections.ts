import { ReflectionType } from "./../../../../common/types/reflect.types";
import {
  modifyDateString,
  modifyDateStringYear,
} from "../../../../common/modules/date/modifyDateString";
import { dbFetchEntries } from "../../../db/entry/dbFetchEntries";

export async function serveFetchReflections(req: any, res: any) {
  const { userParmId } = req;
  const { today } = req.query;

  try {
    const weekAgo = modifyDateString(today, -7);
    const weekAgoReflection = await makeReflection(
      req.mongoose,
      userParmId,
      "One Week Ago",
      weekAgo
    );

    const monthAgo = modifyDateString(today, -30);
    const monthAgoReflection = await makeReflection(
      req.mongoose,
      userParmId,
      "One Month Ago",
      monthAgo
    );

    const yearAgo = modifyDateStringYear(today, -1);
    const yearAgoReflection = await makeReflection(
      req.mongoose,
      userParmId,
      "One Year Ago",
      yearAgo
    );

    // make reflections
    const reflections = [
      weekAgoReflection,
      monthAgoReflection,
      yearAgoReflection,
    ];

    return res.json({
      reflections,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

async function makeReflection(
  mongoose: any,
  userParmId: string,
  title: string,
  date: string
): Promise<ReflectionType> {
  const entries = await dbFetchEntries(mongoose, userParmId, {
    date,
    draft: false,
  });

  return {
    title,
    date,
    entries: entries.map((entry) => ({
      id: entry.id,
      date: entry.date,
      body: entry.body,
    })),
  };
}
