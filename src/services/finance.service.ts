import { interceptor } from "@app/shared";
import { createFinancePlan, financePlanResponse } from "@app/interfaces";

export const FinanceService = {
  // get finance plans by deal id
  async getFinanceByDeals(id: number | string) {
    const res = await interceptor<financePlanResponse>(
      `/finance/deals/${id}/table/`,
    );
    console.log(res.data, "Moliyaviy ma'lumotlar");
    return res.data;
  },

  async createFinancePlan(data: createFinancePlan) {
    const res = await interceptor.post("/finance/amounts/create/", data);
    console.log(res.data, "Yangi moliyalashtirish grafigi qo'shildi");

    return res.data;
  },
};
