import { ISearchParams } from "@interfaces/params.interface";
import {
  IAdditionalInvestmentFlat,
  IAdditionalInvestmentFormD,
  IAddProjectFilesForm,
  IAddProjectPassportForm,
  ICurrentInvestmentFormD,
  IInvestmentFlat,
  IMonitoringForm,
  IProjectPlanFormD,
  IProjectPlanFormFlat,
} from "@interfaces/projectsPassport.interface";
import { interceptor } from "@shared/libraries";

export const ProjectPasswordService = {
  async getProjectsPassport(queryParams: ISearchParams) {
    const res = await interceptor("report/project", { params: queryParams });
    return res.data;
  },
  async getProjectPassportDetail(id: number | string) {
    const res = await interceptor(`report/project/${id}`);
    return res.data;
  },
  async getProjectPlanObjects() {
    const res = await interceptor("report/draft");
    return res.data;
  },
  async addProjectPlanObject(data: { id: number; name: string }) {
    const res = await interceptor.post("report/draft", data);
    return res.data;
  },
  async addProjectPassort(data: IAddProjectPassportForm) {
    const res = await interceptor.post("report/project", data);
    return res.data;
  },
  async editProjectPassort(data: IAddProjectPassportForm, id: number | null) {
    const res = await interceptor.put(`report/project/${id}`, data);
    return res.data;
  },
  async addProjectFiles(data: { files: number[] }) {
    const res = await interceptor.post("report/project-files/upload", data);
    return res.data;
  },
  async editProjectFiles(data: IAddProjectFilesForm) {
    const res = await interceptor.put(`report/project-files/update`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
  async deleteFile(id: number | undefined) {
    const res = await interceptor.delete(`report/project-files/${id}`);
    return res.data;
  },
  async addProjectPlans(data: IProjectPlanFormFlat) {
    const res = await interceptor.post("report/project-plan/upload", data);
    return res.data;
  },
  async editPlan(data: IProjectPlanFormD) {
    const res = await interceptor.put(`report/project-plan/update`, data);
    return res.data;
  },
  async deletePlan(id: number | string) {
    const res = await interceptor.delete(`report/project-plan/${id}`);
    return res.data;
  },
  async addInvestment(data: IInvestmentFlat) {
    const res = await interceptor.post("report/fact/upload", data);
    return res.data;
  },
  async editInvestment(data: ICurrentInvestmentFormD) {
    const res = await interceptor.put(`report/fact/update`, data);
    return res.data;
  },
  async addAdditionalInvestment(data: IAdditionalInvestmentFlat) {
    const res = await interceptor.post("report/additional/upload", data);
    return res.data;
  },
  async editAdditionalInvestment(data: IAdditionalInvestmentFormD) {
    const res = await interceptor.put(`report/additional/update`, data);
    return res.data;
  },
  async addMonitoring(data: IMonitoringForm) {
    const res = await interceptor.post("report/monitoring/upload", data);
    return res.data;
  },
  async editMonitoring(data: IMonitoringForm) {
    const res = await interceptor.put("report/monitoring/update", data);
    return res.data;
  },
  async getExcel(filters: { [key: string]: string | string[] | number }) {
    const res = await interceptor(
      `https://dxsh.technocorp.uz/api/report/project-get-excel?${filters}`
    );
    return res.data;
  },
};
