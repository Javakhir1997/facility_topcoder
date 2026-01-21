import { ISearchParams } from "@interfaces/params.interface";
import { ProjectForm } from "@interfaces/projects.interface";
import { interceptor } from "@shared/libraries";

export const ProjectsService = {
  async getProjects(queryParams: ISearchParams) {
    const res = await interceptor("common/objects", { params: queryParams });
    return res.data;
  },
  async getProjectDetail(id: number | string) {
    const res = await interceptor(`common/objects/${id}`);
    return res.data;
  },
  async addProject(data: ProjectForm) {
    const res = await interceptor.post(`common/objects`, data);
    return res.data;
  },
  async editProject(data: ProjectForm,id:string) {
    const res = await interceptor.put(`common/objects/${id}`, data);
    return res.data;
  },
};
