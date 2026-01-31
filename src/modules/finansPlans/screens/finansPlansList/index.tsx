import { Column } from "react-table";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDeals } from "@modules/deals/hooks";
import { useNavigate } from "react-router-dom";
import { FinansFilter } from "@modules/finansPlans/components";
import { convertDateFormat, statusTabOptions } from "@app/shared";
import { PageLayout, PageTitle, Status, Tab, Table } from "@app/components";

export interface IDeal {
  id: number;
  status: string;
  application: number;
  start_date: string | null;
  end_date: string | null;
  pdf_attachment: string | null;
  docx_attachment: string | null;
}

const FinansPlansList: React.FC<{}> = () => {
  const { t } = useTranslation();
  const { deals, isPending, total, totalPages, currentPage } = useDeals();
  const navigate = useNavigate();

  const columns: Column<IDeal>[] = useMemo(
    () => [
      {
        Header: t("ID"),
        accessor: "id",
        width: 50,
      },
      {
        Header: t("Application ID"),
        accessor: "application",
      },
      {
        Header: t("Start Date"),
        accessor: (row) => convertDateFormat(row.start_date) || "-",
      },
      {
        Header: t("End Date"),
        accessor: (row) => convertDateFormat(row.end_date) || "-",
      },
      {
        Header: t("Status"),
        accessor: (row) => <Status status={row.status} />,
      },
      {
        Header: t("Documents"),
        Cell: ({ row }) => (
          <div className="flex gap-2">
            {row.original.pdf_attachment && (
              <a
                href={row.original.pdf_attachment}
                target="_blank"
                rel="noreferrer"
                className="text-red-600 hover:underline font-medium text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                PDF
              </a>
            )}
            {row.original.docx_attachment && (
              <a
                href={row.original.docx_attachment}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline font-medium text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                DOCX
              </a>
            )}
            {!row.original.pdf_attachment && !row.original.docx_attachment && (
              <span className="text-gray-400 text-sm">-</span>
            )}
          </div>
        ),
      },
    ],
    [t],
  );

  const handleRow = (id: string | number): void => {
    navigate(`/finans/${id}`);
  };

  return (
    <PageLayout>
      <div className="d-flex flex-column gap-10 bg-white rounded-xl px-6 pb-2">
        <PageTitle title={t("Finans Plans List")}>
          <FinansFilter />
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
        data={deals || []}
        screen={true}
      />
    </PageLayout>
  );
};

export default FinansPlansList;
