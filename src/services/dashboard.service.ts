import { interceptor } from "@app/shared";
import {
  ISearchParams,
  ProjectStatisticDetail,
  Statistics,
} from "@app/interfaces";

export const DashboardService = {
  async getCommonStatistics(params: ISearchParams): Promise<Statistics> {
    const res = await interceptor<Statistics>("common/statistic", {
      params: params,
    });
    return res.data;
  },
  async getProjectStatistics(
    params: ISearchParams
  ): Promise<ProjectStatisticDetail> {
    const res = await interceptor<ProjectStatisticDetail>(
      "statistics/project-statistics",
      {
        params: params,
      }
    );
    return res.data;
  },
};
