import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "@app/services";
import { useSearchParams } from "react-router-dom";
import { getSearchParamsAsObject } from "@app/shared";

const useProjectStatisticDetail = (enabled: boolean = true) => {
  const [searchParams] = useSearchParams();
  const { year = "", region = "" } = getSearchParamsAsObject(searchParams);
  const { isPending, data: projectStatisticDetail } = useQuery({
    queryKey: ["project-statistic", year, region],
    queryFn: () =>
      DashboardService.getProjectStatistics({
        year: year ? String(year) : new Date().getFullYear().toString(),
        region: region !== "all" ? String(region) : "",
      }),
    enabled,
  });

  return { isPendingProjects: isPending, projectStatisticDetail };
};

export default useProjectStatisticDetail;
