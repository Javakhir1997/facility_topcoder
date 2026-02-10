import { interceptor } from "@app/shared";
import { createFinancePlan, financePlanResponse } from "@app/interfaces";

export const FinanceService = {
  // get finance plans by deal id
  async getFinanceByDeals(id: number | string) {
    const res = await interceptor<financePlanResponse[]>(
      `/finance/schedule/${id}/`,
    );
    console.log(res.data, "Moliyaviy ma'lumotlar");
    return res.data;
  },
  //   create finance plan
  async createFinancePlan(data: createFinancePlan) {
    const res = await interceptor.post("/finance/amounts/create/", data);
    console.log(res.data, "Yangi moliyalashtirish grafigi qo'shildi");

    return res.data;
  },
  // Update finance Plan
  async updateFinancePlan(id: number | string, data: createFinancePlan) {
    const res = await interceptor.put(`/finance/amounts/${id}/update/`, data);
    return res.data;
  },
  // Partial update finance plan
  async updatePartialFinancePlan(id: string | number, data: createFinancePlan) {
    const res = await interceptor.patch(`/finance/amounts/${id}/update/`, data);
    return res.data;
  },
};
