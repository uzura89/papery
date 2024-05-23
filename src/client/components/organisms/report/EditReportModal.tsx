import { ReportFormType } from "../../../../common/types";
import useReportStore from "../../../store/report/reportStore";
import Modal from "../../molecules/modal/Modal";
import { ModalHeader } from "../../molecules/modal/ModalHeader";
import ReportForm from "../../molecules/report/ReportForm";

export default function EditReportModal(props: {
  visible: boolean;
  reportId: string;
  onClose: () => void;
}) {
  const reportStore = useReportStore();
  const report = reportStore.reports.find((r) => r.id === props.reportId);

  function onSubmit(reportForm: ReportFormType) {
    reportStore.updateReport({ ...reportForm, id: props.reportId });
    props.onClose();
  }

  function onDelete() {
    reportStore.deleteReport(props.reportId);
    props.onClose();
  }

  if (!report) return null;

  return (
    <Modal
      visible={props.visible}
      closeModal={props.onClose}
      width="400px"
      key="edit-report-modal"
    >
      <ModalHeader title="Edit Report" />
      <div className="">
        <ReportForm
          reportForm={{
            reportName: report.reportName,
            filterByTagIds: report.filterByTagIds,
            divideBy: report.divideBy,
            reportType: report.reportType,
            duration: report.duration,
            order: report.order,
          }}
          submitText="Save"
          onCancel={props.onClose}
          onSubmit={onSubmit}
          onDelete={onDelete}
        />
      </div>
    </Modal>
  );
}
