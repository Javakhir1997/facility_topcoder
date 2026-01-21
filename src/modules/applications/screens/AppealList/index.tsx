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
} from "@app/shared";
import { Add } from "@app/assets";
import { Column } from "react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AppealListFilter } from "@modules/applications/components";
import { useAppeals } from "@modules/applications/hooks";
import { ExampleData } from "@app/interfaces";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@app/hooks";

const Index = () => {
  const { t } = useTranslation();
  const { appeals, isPending, total, totalPages, currentPage } = useAppeals();
  const navigate = useNavigate();
  const { user } = useAppContext();

  const columns: Column<ExampleData>[] = useMemo(
    () => [
      {
        Header: t("WMF name"),
        accessor: (row) => arrayToString(row.object.map((i) => i?.name)),
      },
      {
        Header: t("WMF type"),
        accessor: (row) => row?.object_type?.name,
      },
      ...([ROLE_LIST.APPLICANT].includes(user.role)
        ? [
            {
              Header: t("Balance holding organization"),
              accessor: (row: ExampleData) => row?.balance_organization?.name,
            },
          ]
        : []),
      {
        Header: t("Date"),
        accessor: (row) => convertDateFormat(row?.created_at),
      },
      {
        Header: t("Request status"),
        accessor: (row) => <Status status={row.status} />,
      },
      ...([ROLE_LIST.OPERATOR, ROLE_LIST.HEAD].includes(user.role)
        ? [
            {
              Header: t("Type of request"),
              accessor: (row: ExampleData) => <Status status={row.status} />,
            },
          ]
        : []),
    ],
    [t, user.role],
  );

  const handleRow = (id: string | number): void => {
    navigate(`/applications/${id}`);
  };

  return (
    <PageLayout>
      <div className="d-flex flex-column gap-10 bg-white rounded-xl px-6 pb-2">
        <PageTitle title="Application">
          <AppealListFilter />

          <Restricted permittedRole={ROLE_LIST.APPLICANT}>
            <Button icon={<Add />} navigate="add">
              Create application
            </Button>
          </Restricted>
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
        data={appeals}
        screen={true}
      />
    </PageLayout>
  );
};

export default Index;
