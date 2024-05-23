/**
 * Schema Types
 */

export type ReportBaseType = {
  id: string;
  reportName: string;
  filterByTagIds: string[];
  divideBy: string; // emoji or tag
  reportType: string; // bar or cloud
  duration: string;
  order: number;
};

export type ReportSchemaType = ReportBaseType & {
  userParmId: string;
  created: Date;
};

/**
 * Report Query Type
 */

export type ReportQueryType = {
  fromDate: string;
  toDate: string;
  filterByTags: string[];
  divideBy: string;
};

/**
 * Report Data Type
 */

export type ReportDataItemType = {
  label: string;
  value: number;
};

export type ReportDataType = ReportDataItemType[];

export type ReportBaseWithDataType = ReportBaseType & {
  isLoaded: boolean;
  isLoading: boolean;
  reportData: ReportDataType;
};

/**
 * Form type
 */

export type ReportFormType = {
  reportName: string;
  filterByTagIds: string[];
  divideBy: string;
  reportType: string;
  duration: string;
  order: number;
};
