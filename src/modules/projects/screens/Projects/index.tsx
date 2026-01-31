import { Add } from "@assets/icons";
import {
  Button,
  PageLayout,
  PageTitle,
  Status,
  Table,
} from "@components/index";
import { Column } from "react-table";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import FilterInProject from "@modules/projects/components/Filter";
import useGetProjects from "@modules/projects/hooks/useGetProjects";
import { Project, ProjectColumn } from "@interfaces/projects.interface";

export default function Index() {
  const { t } = useTranslation();

  const [filters, setFilters] = useState<{
    [key: string]: string | string[] | number;
  }>({});

  const {
    isPending,
    projects,
    totalPages,
    total,
    currentPage,
    onPageSizeChange,
  } = useGetProjects(filters);

  function handleFilter({
    name,
    value,
  }: {
    name: string;
    value: string | string[] | number;
  }) {
    setFilters((prev) => ({ ...prev, [name]: value }));
    onPageSizeChange(10);
  }

  const columns: Column<ProjectColumn>[] = useMemo(
    () => [
      {
        Header: t("Object name"),
        accessor: (row) => row.name,
      },
      {
        Header: t("Object type"),
        accessor: (row) => row.type,
      },
      {
        Header: t("Owner organization"),
        accessor: (row) => row.owner_organization,
      },
      {
        Header: t("Project status"),
        accessor: (row) => (
          <Status status={row.used ? "positive" : "negative"} />
        ),
      },
    ],
    [t],
  );

  useEffect(() => {
    onPageSizeChange(10);
  }, []);

  const mappedData = useMemo(() => {
    if (!projects.results) return [];

    return projects.results.map((item: Project) => ({
      ...item,
      name: item?.name,
      type: item?.type?.name,
      owner_organization: item.owner_organization?.name,
      status: item?.used,
    }));
  }, [projects?.results]);

  const navigate = useNavigate();

  function handleRow(id: string | number): void {
    navigate(`/objects/${id}`);
  }

  return (
    <PageLayout>
      <div className="full-width d-flex justify-center align-center bg-white rounded-2xl px-5">
        <PageTitle title="Objects">
          <FilterInProject handleFilter={handleFilter} />

          <Button icon={<Add />} navigate="add">
            Create project
          </Button>
        </PageTitle>
      </div>

      <Table
        total={total}
        currentPage={currentPage}
        totalPages={totalPages}
        isLoading={isPending}
        columns={columns}
        data={mappedData}
        handleRow={handleRow}
        screen={true}
      />
    </PageLayout>
  );
}
