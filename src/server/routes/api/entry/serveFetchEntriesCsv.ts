import mongoose from "mongoose";

import { dbFetchEntries } from "../../../db/entry/dbFetchEntries";
import { EntrySchemaType } from "../../../../common/types";
import { convertDateToString } from "../../../../common/modules/date/convertDateToString";

export async function serveFetchEntriesCsv(req: any, res: any) {
  const { userParmId } = req;

  try {
    const entries: EntrySchemaType[] = await dbFetchEntries(
      mongoose,
      userParmId,
      {}
    );

    const csvContent = makeCsvContent(entries);

    return res.status(200).json({ csvContent });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

/**
 * Helper function to make CSV content from entries
 */

function makeCsvContent(entries: EntrySchemaType[]) {
  // id, date, tags, primaryEmoji, body, draft, pinned, created
  // separated by tab
  const fileHeader = "data:text/csv;charset=utf-8,";
  const header = "date\ttags\temoji\tbody\tdraft\tpinned\n";

  const content = entries
    .map((entry) => {
      const tags = entry.tags.join(",");
      const bodyEscaped = `"${entry.body.replace(/"/g, '""')}"`;
      return `${entry.date}\t${tags}\t${entry.primaryEmoji}\t${bodyEscaped}\t${entry.draft}\t${entry.pinned}\n`;
    })
    .join("");

  return fileHeader + header + content;
}
