import {extractIds, interceptor} from "@app/shared";
import {
    IAddInvestmentForm, IAddReportForm,
    IApplicationDuration,
    IListResponse, IObjectList,
    IPlanDetail,
    IPlanTableDetail,
    IReportDetail, IReturnAppealForm,
    IYearList
} from '@app/interfaces'

export const InvestmentService = {
    async getInvestments(queryParams: Record<string, string | number>) {
        const res = await interceptor<IListResponse<IObjectList>>(`report/application`, {
            params: queryParams,
        });
        return res.data;
    },

    async addInvestment(data: IAddInvestmentForm, id: string) {
        const newData = {
            object: id,
            foracast_electricity_cost: {cost: data.foracast_electricity_cost},
            exploitation_cost: {cost: data.exploitation_cost},
            exploitation_salary: {cost: data.exploitation_salary},
            exploitation_electricity_cost: {cost: data.exploitation_electricity_cost},
            exploitation_full_repair: {cost: data.exploitation_full_repair},
            exploitation_current_repair: {cost: data.exploitation_current_repair},
            exploitation_other_cost: {cost: data.exploitation_other_cost},
            investment_funds: {cost: data.investment_funds},
            year: +data.year,
        };

        const res = await interceptor.post(`report/plans`, newData);
        return res.data;
    },

    async editInvestment(data: IAddInvestmentForm, id: string, applicationId?: string) {
        const newData = {
            object: applicationId,
            foracast_electricity_cost: {cost: data.foracast_electricity_cost},
            exploitation_cost: {cost: data.exploitation_cost},
            exploitation_salary: {cost: data.exploitation_salary},
            exploitation_electricity_cost: {cost: data.exploitation_electricity_cost},
            exploitation_full_repair: {cost: data.exploitation_full_repair},
            exploitation_current_repair: {cost: data.exploitation_current_repair},
            exploitation_other_cost: {cost: data.exploitation_other_cost},
            investment_funds: {cost: data.investment_funds},
            year: +data.year,
        };

        const res = await interceptor.patch(`report/plans/${id}`, newData);
        return res.data;
    },

    async getInvestmentDetail(id: string | number) {
        const res = await interceptor<IPlanDetail>(`/report/plans/${id}`);
        return res.data;
    },

    async getApplicationDuration(id: number | string): Promise<IApplicationDuration> {
        const res = await interceptor(`report/application-duration/${id}`);
        return res.data;
    },

    async getPlanDetail(id: number | string, year: number | undefined | string): Promise<IPlanTableDetail> {
        const res = await interceptor(`report/application/${id}/plan-detail`, {
            params: {year},
        });
        return res.data;
    },

    async addReport(data: IAddReportForm, id: string): Promise<void> {
        const newData = {
            ...data,
            planfield: id,
            files: extractIds(data.files)
        };
        const res = await interceptor.post(`report/reports`, newData);
        return res.data;
    },

    async editReport(data: IAddReportForm, id: number | string): Promise<void> {
        const newData = {
            ...data,
            files: extractIds(data.files)
        };
        const res = await interceptor.patch(`report/reports/${id}`, newData);
        return res.data;
    },

    async getReportDetail(id: number | string): Promise<IReportDetail> {
        const res = await interceptor(`report/reports/${id}`);
        return res.data;
    },

    async getPlanCreatedYears(id: number | string): Promise<IYearList> {
        const res = await interceptor.get(`report/application-plan-created-years/${id}`);
        return res.data;
    },

    async operatorApproveReport(id: string) {
        const res = await interceptor(`report/operator-report/${id}/approve`)
        return res.data
    },

    async returnReport(data: IReturnAppealForm, id: string) {
        const newData = {
            operator_note: data.comment,
        }
        const res = await interceptor.patch(`report/operator-report/${id}/reject`, newData)
        return res.data
    },
}
