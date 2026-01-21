export interface createFinancePlan {
    deal: number;
    indicator: number;
    period: number | string;
    plan_amount: string | number;
    fact_amount: string | number;
}

export interface financePlanObjectResponse {
    indicator: number | string;
    plan_amount: number;
    fact_amount: number;
}

export interface financePlanResponse {
    id: number | string;
    dealId: number | string;
    objectiveValue: financePlanObjectResponse[];
    createdAt: string;
    updatedAt: string;
}
