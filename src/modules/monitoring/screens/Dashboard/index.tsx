import { PageLayout, PageTitle, Table, Wrapper } from "@app/components";
import {
  DashboardCountItem,
  DashboardFilter,
  MapUzbekistan,
  PieChart,
} from "@modules/monitoring/components";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  applicationTabOption,
  getSearchParamsAsObject,
  regionsOptions,
  statusTabOptions,
} from "@app/shared";
import { ActiveObjects, Objects } from "@app/assets";
import styles from "./styles.module.scss";
import {
  useProjectStatisticDetail,
  useStatisticDetail,
} from "@modules/monitoring/hooks";
import { Column } from "react-table";
import { IProject } from "@app/interfaces";
import { useMemo } from "react";
import BarChart from "@modules/monitoring/components/BarChart";

const Index = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { region = "all" } = getSearchParamsAsObject(searchParams);
  const { statisticDetail, isPending } = useStatisticDetail();
  const { projectStatisticDetail, isPendingProjects } =
    useProjectStatisticDetail();
  const navigate = useNavigate();

  const columns: Column<IProject>[] = useMemo(
    () => [
      {
        Header: t("Project name"),
        accessor: (row) => row?.project_name,
      },
      {
        Header: t("WMF area"),
        accessor: (row) => row?.region,
      },
      {
        Header: t("Duration (from)"),
        accessor: (row) => `${row?.from_date} ${t("year")}`,
      },
      {
        Header: t("Duration (to)"),
        accessor: (row) => `${row?.to_date} ${t("year")}`,
      },
      {
        Header: t("Amount (in sum)"),
        accessor: (row) => row?.cost,
      },
    ],
    [t]
  );

  const handleRow = (id: string | number): void => {
    navigate(`/applications/${id}`);
  };
  console.log(statisticDetail);
  return (
    <PageLayout>
      <PageTitle
        title={`${
          !region || region === "all"
            ? t("By Republic")
            : t(regionsOptions?.find((i) => i.value == region)?.label as string)
        }`}
      >
        <DashboardFilter />
      </PageTitle>
      <div className={styles.root}>
        <Wrapper>
          <MapUzbekistan />
        </Wrapper>
        <div className={styles.wrapper}>
          <div className={styles.counts}>
            <DashboardCountItem
              title="Projects"
              count={projectStatisticDetail?.projects_count.toLocaleString()}
              icon={<Objects />}
            />
            <DashboardCountItem
              title="Current projects"
              count={projectStatisticDetail?.current_projects_count.toLocaleString()}
              icon={<ActiveObjects />}
            />
            <DashboardCountItem
              title="Current project cost (sum)"
              count={projectStatisticDetail?.cost_current_projects.toLocaleString()}
              icon={<ActiveObjects />}
            />
            <DashboardCountItem
              title="Investment perfomance (percentage)"
              count={projectStatisticDetail?.investment_performance.toLocaleString()}
              icon={<ActiveObjects />}
            />
          </div>
          <div className={styles.charts}>
            <Wrapper screen={true} title="Appeals">
              <PieChart
                labels={statusTabOptions.filter((i) => i.value !== "all")}
                data={[
                  statisticDetail?.appeal_stat?.new
                    ? statisticDetail?.appeal_stat?.new
                    : 0,
                  statisticDetail?.appeal_stat?.in_progress ?? 0,
                  statisticDetail?.appeal_stat?.returned ?? 0,
                  statisticDetail?.appeal_stat?.approved ?? 0,
                  statisticDetail?.appeal_stat?.rejected ?? 0,
                ]}
                colors={["#E8E8EA", "#003CFF", "#FFE576", "#18BA92", "#F42829"]}
              />
            </Wrapper>
            <Wrapper screen={true} title="Applications">
              <PieChart
                labels={applicationTabOption.filter((i) => i.value !== "all")}
                data={[
                  statisticDetail?.application_stat?.new
                    ? statisticDetail?.application_stat?.new
                    : 0,
                  statisticDetail?.application_stat?.negotiated ?? 0,
                  statisticDetail?.application_stat?.returned ?? 0,
                  statisticDetail?.application_stat?.in_mof ?? 0,
                  statisticDetail?.application_stat?.approved ?? 0,
                  statisticDetail?.application_stat?.rejected ?? 0,
                ]}
                colors={[
                  "#E8E8EA",
                  "#FF6E01",
                  "#FFE576",
                  "#003CFF",
                  "#18BA92",
                  "#F42829",
                ]}
              />
            </Wrapper>
          </div>
        </div>
      </div>

      <Wrapper>
        <BarChart
          labels={["Received requests", "Received applications"]}
          colors={["#66C8FF", "#4476F4"]}
        />
      </Wrapper>
      <Wrapper title="Projects">
        <Table
          padding={true}
          pagination={false}
          isLoading={isPending && isPendingProjects}
          handleRow={handleRow}
          columns={columns}
          data={statisticDetail?.top_five_projects ?? []}
          screen={true}
        />
      </Wrapper>
    </PageLayout>
  );
};

export default Index;
