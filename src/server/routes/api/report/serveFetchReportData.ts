import {
  EntrySchemaType,
  ReportDataType,
  ReportQueryType,
} from "../../../../common/types";
import { dbFetchEntriesForReport } from "../../../db/entry/dbFetchReportData";
import { CONS_REPORT_DIVIDE_BY_EMOJI } from "../../../../common/constants/report.cons";

export async function serveFetchReportData(req: any, res: any) {
  const { userParmId } = req;
  const { fromDate, toDate, divideBy }: ReportQueryType = req.query;
  const filterByTags =
    req.query.filterByTags === "" ? [] : req.query.filterByTags.split(",");

  try {
    const entries = await dbFetchEntriesForReport(req.mongoose, userParmId, {
      fromDate,
      toDate,
      filterByTags: filterByTags,
    });

    const reportData: ReportDataType = makeReportData(entries, divideBy);

    return res.status(200).json({ reportData });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

/**
 * Helper Functions
 */

function makeReportData(
  entries: EntrySchemaType[],
  divideBy: string
): ReportDataType {
  const reportData: ReportDataType = [];

  // sum up entry counts for each label
  for (const entry of entries) {
    const labels = getLabels(entry, divideBy);
    for (const label of labels) {
      const existingData = reportData.find((data) => data.label === label);

      if (existingData) {
        existingData.value++;
      } else {
        reportData.push({ label, value: 1 });
      }
    }
  }

  // sort by counts
  reportData.sort((a, b) => b.value - a.value);

  return reportData;
}

function getLabels(entry: EntrySchemaType, divideBy: string): string[] {
  if (divideBy === CONS_REPORT_DIVIDE_BY_EMOJI) {
    return [entry.primaryEmoji];
  } else {
    return entry.tags;
  }
}
