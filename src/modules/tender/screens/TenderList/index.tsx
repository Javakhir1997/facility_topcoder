import {
  Button,
  PageLayout,
  PageTitle,
  Restricted,
  Status,
  Tab,
  Table,
} from "@app/components";
import {
  arrayToString,
  convertDateFormat,
  ROLE_LIST,
  statusTabOptions,
  tenderStatus
} from "@app/shared";
import { Add } from "@app/assets";
import { Column } from "react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AppealListFilter } from "@modules/applications/components";
import { useAppeals } from "@modules/tender/hooks";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@app/hooks";

interface AppealData {
  id: number;
  status: string;
  object: { name: string }[];
  start_date: string | null;
  count: number;
  object_type?: { name: string };
  balance_organization?: { name: string };
}

const Index = () => {
  const { t } = useTranslation();
  const { appeals, isPending, total, totalPages, currentPage } = useAppeals();
  const navigate = useNavigate();
  const { user } = useAppContext();

  console.log(appeals, "tender uchun");

  const columns: Column<AppealData>[] = useMemo(
    () => [
      {
        Header: t("WMF name"),
        accessor: (row) => arrayToString(row.object?.map((i) => i?.name) || []),
      },
      {
        Header: t("WMF type"),
        accessor: (row) => row.object_type?.name || "-", // optional
      },
      ...([ROLE_LIST.APPLICANT].includes(user.role)
        ? [
            {
              Header: t("Balance holding organization"),
              accessor: (row) => row.balance_organization?.name || "-",
            },
          ]
        : []),
      {
        Header: t("Tender state date"),
        accessor: (row) =>
          row.start_date ? row.start_date : "-",
      },
      {
        Header: t("Request status"),
        accessor: (row) => <Status status={row.status || "unknown"} />, // default qiymat
      },
      {
        Header: t("Applicants Count"),
        accessor: (row) => row.count || 0,
      },
      ...([ROLE_LIST.OPERATOR, ROLE_LIST.HEAD].includes(user.role)
        ? [
            {
              Header: t("Type of request"),
              accessor: (row) => <Status status={row.status || "unknown"} />,
            },
          ]
        : []),
    ],
    [t, user.role]
  );

  const handleRow = (id: number) => {
    navigate(`/tenders/${id}`);
  };

  return (
    <PageLayout>
      <PageTitle title="Tender">
        <Restricted permittedRole={ROLE_LIST.APPLICANT}>
          <Button icon={<Add />} navigate="add">
            Create application
          </Button>
        </Restricted>
      </PageTitle>

      <AppealListFilter />

      <Tab tabs={tenderStatus} query="status" fallbackValue="all" />

      <Table
        total={total}
        currentPage={currentPage}
        totalPages={totalPages}
        isLoading={isPending}
        columns={columns}
        handleRow={handleRow}
        data={appeals || []}
        screen={true}
        emptyMessage="No appeals found."
      />
    </PageLayout>
  );
};

export default Index;
