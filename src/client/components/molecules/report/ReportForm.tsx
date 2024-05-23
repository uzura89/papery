import { useEffect, useState } from "react";

import { FormLabel } from "../../atoms/input/FormLabel";
import { FormSelection } from "../../atoms/input/FormSelection";
import {
  CONS_REPORT_DIVIDE_BY_EMOJI,
  CONS_REPORT_DIVIDE_BY_MAP,
  CONS_REPORT_DIVIDE_BY_TAG,
  CONS_REPORT_DURATION_MAP,
  CONS_REPORT_DURATION_LAST_30_DAYS,
  CONS_REPORT_TYPE_BAR,
  CONS_REPORT_TYPE_MAP,
} from "../../../../common/constants/report.cons";
import { ModalFooter } from "../modal/ModalFooter";
import { ReportFormType } from "../../../../common/types";
import FormMultiSelectTag from "../tag/FormMultiSelectTag";
import { LuBarChart3, LuCloud, LuHash, LuSmile } from "react-icons/lu";

const INITIAL_REPORT_FORM: ReportFormType = {
  reportName: "Untitled Report",
  filterByTagIds: [],
  divideBy: CONS_REPORT_DIVIDE_BY_EMOJI,
  reportType: CONS_REPORT_TYPE_BAR,
  duration: CONS_REPORT_DURATION_LAST_30_DAYS,
  order: 0,
};

export default function ReportForm(props: {
  reportForm: ReportFormType | null;
  onDelete?: () => void;
  onSubmit: (reportForm: ReportFormType) => void;
  onCancel: () => void;
  submitText: string;
}) {
  const [reportForm, setReportForm] = useState(
    props.reportForm || INITIAL_REPORT_FORM
  );

  const onChangeName = (event: any) => {
    setReportForm({ ...reportForm, reportName: event.target.value });
  };

  const onChangeFilterByTags = (newTagIds: string[]) => {
    setReportForm({ ...reportForm, filterByTagIds: newTagIds });
  };

  const onSelectDivideBy = (value: string) => {
    setReportForm({ ...reportForm, divideBy: value });
  };

  const onSelectReportType = (value: string) => {
    setReportForm({ ...reportForm, reportType: value });
  };

  const onSelectDuration = (value: string) => {
    setReportForm({ ...reportForm, duration: value });
  };

  const onClickCancel = () => {
    props.onCancel();
  };

  const onClickSubmit = () => {
    if (reportForm.reportName.trim() === "") {
      alert("Please enter report name");
      return;
    }

    props.onSubmit(reportForm);
  };

  useEffect(() => {
    if (props.reportForm) {
      setReportForm(props.reportForm);
    } else {
      setReportForm(INITIAL_REPORT_FORM);
    }
  }, [props.reportForm]);

  return (
    <div>
      <div className="padding-x-sm pt-3 pb-4 flex flex-col gap-3">
        {/* Name */}
        <div>
          <FormLabel text="Name" />
          <input
            className="form"
            placeholder="Enter report name"
            value={reportForm.reportName}
            onChange={onChangeName}
          />
        </div>

        {/* Filter By Tags */}
        <div>
          <FormLabel text="Filter By Tags" />
          <FormMultiSelectTag
            tagIds={reportForm.filterByTagIds}
            onChange={onChangeFilterByTags}
          />
        </div>

        {/* Count By */}
        <div>
          <FormLabel text="Count By" />
          <div className="w-[100px]">
            <FormSelection
              maxHeight={200}
              onSelect={onSelectDivideBy}
              selectedId={reportForm.divideBy}
              selection={{
                ids: Object.keys(CONS_REPORT_DIVIDE_BY_MAP),
                texts: Object.values(CONS_REPORT_DIVIDE_BY_MAP),
                icons: [<LuHash />, <LuSmile />],
              }}
            />
          </div>
        </div>
        {/* Report Type */}
        <div>
          <FormLabel text="Report Type" />
          <div className="w-[140px]">
            <FormSelection
              maxHeight={200}
              onSelect={onSelectReportType}
              selectedId={reportForm.reportType}
              selection={{
                ids: Object.keys(CONS_REPORT_TYPE_MAP),
                texts: Object.values(CONS_REPORT_TYPE_MAP),
                icons: [<LuBarChart3 />, <LuCloud />],
              }}
            />
          </div>
        </div>
        {/* Duration */}
        <div>
          <FormLabel text="Duration" />
          <div className="w-[150px]">
            <FormSelection
              maxHeight={100}
              onSelect={onSelectDuration}
              selectedId={reportForm.duration}
              selection={{
                ids: Object.keys(CONS_REPORT_DURATION_MAP),
                texts: Object.values(CONS_REPORT_DURATION_MAP),
              }}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <ModalFooter>
        <div>
          {props.onDelete && (
            <button
              className="btn btn-text text-foreDanger"
              onClick={props.onDelete}
            >
              Delete
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button className="btn btn-text" onClick={onClickCancel}>
            Cancel
          </button>
          <button className="btn" onClick={onClickSubmit}>
            {props.submitText}
          </button>
        </div>
      </ModalFooter>
    </div>
  );
}
