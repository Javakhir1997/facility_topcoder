import { Button, Status } from "@app/components";
import { PageLayout, PageTitle, Table } from "@components/index";
import { ProjectPassport } from "@interfaces/projectsPassport.interface";
import { arrayToString, showMessage } from "@shared/utilities";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Column } from "react-table";
import { useNavigate } from "react-router-dom";
import { Add, Document } from "@assets/icons";
import FilterInProjectPassport from "@modules/projects-passport/components/Filter";
import usePassportList from "@modules/projects-passport/hooks/useProjectsPassport";
import { BUTTON_THEME } from "@shared/constants";
import axios from "axios";

interface ProjectPassportList {
  id: number;
  region: {
    id: number;
    name: string;
  };
  districts: {
    id: number;
    name: string;
  }[];
  owner_organization: {
    id: number;
    name: string;
  };
  object: {
    id: number;
    name: string;
  }[];
  code: string;
  private_partner: string;
  stir: string;
  registry_number: string;
  interval_years: string;
  contract_term: number;
  project_price: number;
  status: boolean;
}

export default function Index() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  const [filters, setFilters] = useState<{
    [key: string]: string | string[] | number;
  }>({});

  const {
    isPending,
    projectsPassport,
    totalPages,
    total,
    currentPage,
    onPageChange,
    onPageSizeChange,
  } = usePassportList(filters);

  function handleFilter({
    name,
    value,
  }: {
    name: string;
    value: string | string[] | number;
  }) {
    setFilters((prev) => ({ ...prev, [name]: value }));
    onPageChange(1);
    onPageSizeChange(5);
  }

  const columns: Column<ProjectPassport>[] = useMemo(
    () => [
      {
        Header: t("Area name"),
        accessor: (row) => row.region,
      },
      {
        Header: t("Name of the area"),
        accessor: (row) => arrayToString(row.districts),
      },
      {
        Header: t("Short name of the project"),
        accessor: (row) => arrayToString(row.object),
      },
      {
        Header: t("private_partner_name"),
        accessor: (row) => row.private_partner,
      },
      {
        Header: t("STIR"),
        accessor: (row) => row.stir,
      },
      {
        Header: t("Reester raqami"),
        accessor: (row) => row.registry_number,
      },
      {
        Header: t("project_years"),
        accessor: (row) => row.interval_years,
      },
      {
        Header: t("transaction_period_year"),
        accessor: (row) => row.contract_term,
      },
      {
        Header: t("project_cost_mln_sum"),
        accessor: (row) => row.project_price,
      },
      {
        Header: t("Status"),
        accessor: (row) => (
          <Status status={row.status ? "approved" : "CANCELED"} />
        ),
      },
    ],
    [t],
  );

  function handleRow(id: string | number): void {
    navigate(`/projects/${id}`);
  }

  const mappedData = useMemo(() => {
    if (!projectsPassport?.results) return [];

    return projectsPassport.results.map((item: ProjectPassportList) => ({
      ...item,
      ...item,
      region: item.region.name,
      districts: item.districts.map((d) => d.name),
      // owner_organization: item.owner_organization.name,
      object: item.object.map((o) => o.name),
    }));
  }, [projectsPassport?.results]);
  

  async function handleExcel() {
    setIsDownloading(true);
    const queryString = new URLSearchParams(filters as any).toString();
    try {
      const response = await axios.get(
        `https://dxsh.technocorp.uz/api/report/project-get-excel?${queryString}`,
        {
          responseType: "blob",
        },
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "hisobot.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch {
      showMessage("Error while downloading", "error");
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <PageLayout>
      <div className="bg-white px-3 rounded-2xl pb-2 flex flex-col gap-3">
        <PageTitle title="Projects Passport">
          <div style={{ display: "flex", justifyContent: "end", gap: "12px" }}>
            <Button icon={<Add />} navigate="add">
              Create project
            </Button>

            <Button
              theme={BUTTON_THEME.GREEN}
              icon={<Document />}
              disabled={isDownloading}
              onClick={handleExcel}
            >
              {isDownloading ? t("Downloading...") : t("Export to excel")}
            </Button>
          </div>
        </PageTitle>

        <FilterInProjectPassport handleFilter={handleFilter} />
      </div>

      <Table
        total={total}
        currentPage={currentPage}
        totalPages={totalPages}
        isLoading={isPending}
        columns={columns}
        handleRow={handleRow}
        data={mappedData}
        screen={true}
      />
    </PageLayout>
  );
}
