import { v4 } from "uuid";

import { ReportFormType } from "../../../../common/types";
import useReportStore from "../../../store/report/reportStore";
import ReportForm from "../../molecules/report/ReportForm";
import Modal from "../../molecules/modal/Modal";
import { ModalHeader } from "../../molecules/modal/ModalHeader";

export default function NewReportModal(props: {
  visible: boolean;
  onClose: () => void;
}) {
  const reportStore = useReportStore();

  function onSubmit(reportForm: ReportFormType) {
    const id = v4();
    reportStore.createReport({ ...reportForm, id });
    props.onClose();
  }

  return (
    <Modal
      visible={props.visible}
      closeModal={props.onClose}
      width="400px"
      key="new-report-modal"
    >
      <ModalHeader title="Create Report" />
      <div className="">
        <ReportForm
          reportForm={null}
          submitText="Create"
          onCancel={props.onClose}
          onSubmit={onSubmit}
        />
      </div>
    </Modal>
  );
}
