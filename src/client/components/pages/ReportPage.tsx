import { useState } from "react";

import useReportStore from "../../store/report/reportStore";
import ReportItem from "../organisms/report/ReportItem";
import EditReportModal from "../organisms/report/EditReportModal";
import NewReportModal from "../organisms/report/NewReportModal";
import { PageTitle, PageWrapper } from "../wrappers/PageShell";
import { Card } from "../atoms/card/Card";
import { LuList } from "react-icons/lu";
import SortListModal from "../organisms/commons/SortListModal";
import useUiStore from "../../store/ui/uiStore";
import useUserStore from "../../store/user/userStore";

export default function ReportPage() {
  // store
  const reportStore = useReportStore();
  const uiStore = useUiStore();
  const userStore = useUserStore();
  // local state
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newModalVisible, setNewModalVisible] = useState(false);
  const [editingReportId, setEditingReportId] = useState<string>("");
  const [sortModalVisible, setSortModalVisible] = useState(false);

  const onClickNewReport = () => {
    if (!userStore.checkIfPremium() && reportStore.reports.length >= 1) {
      const response = confirm(
        "Please upgrade to premium to create more than 1 report"
      );
      if (response) {
        uiStore.setVisibleModal("upgrade");
      }
      return;
    }

    setNewModalVisible(true);
  };

  const onEditReport = (reportId: string) => {
    setEditingReportId(reportId);
    setEditModalVisible(true);
  };

  const closeModals = () => {
    setEditModalVisible(false);
    setNewModalVisible(false);
    setEditingReportId("");
    setSortModalVisible(false);
  };

  const openSortModal = () => {
    setSortModalVisible(true);
  };

  const onSaveSortList = (newOrders: { id: string; order: number }[]) => {
    reportStore.changeOrderOfReports(newOrders);
    closeModals();
  };

  return (
    <PageWrapper>
      <div className="container-tiny">
        {/* Header */}
        <PageTitle title="Report">
          <div className="flex items-center gap-2">
            <button className="btn" onClick={onClickNewReport}>
              + New Report
            </button>
            <button className="btn btn-text" onClick={openSortModal}>
              <LuList className="text-lg text-foreLight" />
            </button>
          </div>
        </PageTitle>

        {/* Report Items */}
        {reportStore.reports.length === 0 && (
          <Card>
            <div className="text-center text-gray-500 py-8">
              No reports created yet
            </div>
          </Card>
        )}

        <div className="flex flex-col gap-4">
          {reportStore.reports.map((report) => {
            return (
              <ReportItem
                key={report.id}
                reportData={report}
                fetchData={reportStore.fetchReportData}
                onEdit={onEditReport}
                needRefresh={reportStore.needRefresh}
              />
            );
          })}
        </div>

        {/* Modals */}
        <EditReportModal
          visible={editModalVisible}
          reportId={editingReportId}
          onClose={closeModals}
        />
        <NewReportModal visible={newModalVisible} onClose={closeModals} />
        <SortListModal
          closeModal={closeModals}
          visible={sortModalVisible}
          title="Sort Reports"
          onSave={onSaveSortList}
          sortItems={{
            ids: reportStore.reports.map((report) => report.id),
            texts: reportStore.reports.map((report) => report.reportName),
            orders: reportStore.reports.map((_, index) => index),
          }}
        />
      </div>
    </PageWrapper>
  );
}
