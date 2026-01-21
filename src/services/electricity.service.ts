import {extractIds, interceptor} from "@app/shared";
import {
    IAddElectricity,
    IAddElectricityReportForm,
    IApplicationDuration,
    IListResponse,
    IReturnAppealForm,
    IObjectList,
    IElectricityPlanList,
    IElectricityPlanDetail,
    IElectricityReportDetail, ISearchParams
} from "@app/interfaces";

export const ElectricityService = {
    async getObjects(queryParams: Record<string, string | number>) {
        const res = await interceptor<IListResponse<IObjectList>>(`report/electricity-investment`, {
            params: queryParams,
        });
        return res.data;
    },

    async addElectricity(data: IAddElectricity, id: string) {
        const newData = {
            object: id,
            electricity_capacity: data.electricity_capacity,
            year: +data.year
        }

        const res = await interceptor.post(`report/electricity-plans`, newData);
        return res.data;
    },

    async editElectricity(data: IAddElectricity, id: string) {
        const newData = {
            electricity_capacity: data.electricity_capacity,
            year: +data.year
        }

        const res = await interceptor.post(`report/electricity-plans/${id}`, newData);
        return res.data;
    },

    async addElectricityReport(data: IAddElectricityReportForm, id: string): Promise<void> {
        const newData = {
            ...data,
            plan: id,
            files: extractIds(data.files)
        };
        const res = await interceptor.post(`report/electricity-reports`, newData);
        return res.data;
    },

    async editElectricityReport(data: IAddElectricityReportForm, id: number | string): Promise<void> {
        const newData = {
            ...data,
            files: extractIds(data.files)
        };
        const res = await interceptor.patch(`report/electricity-reports/${id}`, newData);
        return res.data;
    },

    async getApplicationDuration(id: number | string): Promise<IApplicationDuration> {
        const res = await interceptor(`report/object-electricity-duration/${id}`);
        return res.data;
    },

    async returnReport(data: IReturnAppealForm, id: string) {
        const newData = {
            operator_note: data.comment,
        }
        const res = await interceptor.patch(`report/operator-electricity-report/${id}/reject`, newData)
        return res.data
    },

    async operatorApproveReport(id: string) {
        const res = await interceptor(`report/operator-electricity-report/${id}/approve`)
        return res.data
    },

    async getObjectDetail(queryParams: ISearchParams, id: string | number) {
        const res = await interceptor<IListResponse<IElectricityPlanList>>(`report/electricity-investment/${id}/plan-list`, {
            params: queryParams
        });
        return res.data;
    },

    async getPlanDetail(id: number | string, year: number | undefined | string): Promise<IElectricityPlanDetail> {
        const res = await interceptor(`report/electricity-application/${id}/plan-detail`, {
            params: {year},
        });
        return res.data;
    },

    async getReportDetail(id: number | string): Promise<IElectricityReportDetail> {
        const res = await interceptor(`report/electricity-reports/${id}`);
        return res.data;
    },
}
