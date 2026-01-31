import { PageLayout, PageTitle, Status, Tab, Table } from "@app/components";
import { convertDateFormat, statusTabOptions } from "@app/shared";
import { Column } from "react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AnnouncementListFilter } from "@modules/announcements/components";
import { useAnnouncements } from "@modules/announcements/hooks";
import { IAnnouncementList, } from "@app/interfaces";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@app/hooks";

const Index = () => {
  const { t } = useTranslation();
  const { announcements, isPending, total, totalPages, currentPage } =
    useAnnouncements();
  const navigate = useNavigate();
  const { user } = useAppContext();

  const columns: Column<IAnnouncementList>[] = useMemo(
    () => [
      {
        Header: t("Object"),
        accessor: (row) => row.object_name || t("Noma’lum"),
      },
      {
        Header: t("WMF type"),
        accessor: (row) =>
          typeof row.object_type === "object"
            ? (row.object_type as { name: string }).name
            : row.object_type,
      },
      {
        Header: t("WMF address"),
        accessor: (row) => row.address,
      },
      {
        Header: t("Start date"),
        accessor: (row) => convertDateFormat(row.start_date),
      },
      {
        Header: t("End date"),
        accessor: (row) => convertDateFormat(row.end_date),
      },
      {
        Header: t("Number of applicants"),
        accessor: "applicants_count",
        style: { textAlign: "center" },
      },
      {
        Header: t("Applicants"),
        accessor: (row) =>
          typeof row.applicant_name === "object"
            ? (row.applicant_name as { name: string }).name
            : row.applicant_name,
      },
      {
        Header: t("Status"),
        id: "status",
        Cell: ({ row }: { row: { original: IAnnouncementList } }) => (
          <Status status={row.original.status} />
        ),
      },
    ],
    [t, user.role, currentPage],
  );

  const handleRow = (id: string | number): void => {
    navigate(`/announcements/${id}`);
  };

  return (
    <PageLayout>
      <div className="d-flex flex-column gap-10 bg-white rounded-xl px-6 pb-2">
        <PageTitle title={t("E’lonlar ro‘yxati")}>
          <AnnouncementListFilter />
        </PageTitle>

        <Tab tabs={statusTabOptions} query="status" fallbackValue="all" />
      </div>

      <Table
        total={total}
        currentPage={currentPage}
        totalPages={totalPages}
        isLoading={isPending}
        columns={columns}
        handleRow={handleRow}
        data={announcements}
        screen={true}
      />
    </PageLayout>
  );
};

export default Index;
