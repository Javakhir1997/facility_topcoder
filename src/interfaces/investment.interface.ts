import {IApplicationDetail, IFIle} from "@app/interfaces";

interface ICost {
    id: number;
    cost: string;
}

interface IInvestmentList {
    id: number;
    project_name: string;
    cost: string;
    from_date: string;
    organization: string;
    to_date: string;
    created_at: string;
    status: "new" | "negotiated" | "returned" | "approved" | "rejected";
    answer_type?: "returned" | "positive" | "negative";
    type: "first" | "repetitive";
}

interface IPlanDetail {
    id: number;
    application: IApplicationDetail
    foracast_electricity_cost: ICost;
    exploitation_cost: ICost;
    exploitation_salary: ICost;
    exploitation_electricity_cost: ICost;
    exploitation_full_repair: ICost;
    exploitation_current_repair: ICost;
    exploitation_other_cost: ICost;
    investment_funds: ICost;
    foracast_project: string;
    foracast_salary: string;
    foracast_other_cost: string;
    total_income: string;
    state_budget_funds: string;
    total_private_partner_cost: string;
    balance_profit_loss: string;
    budget_savings: string;
    investment_recovery: string;
    total_profit: string;
    year: number;
}

interface IApplicationDuration {
    id: number;
    from_date: number;
    to_date: number;
}

interface IReportDetail {
    id: number;
    planfield: ICost;
    cost: string;
    description: string | null;
    files: IFIle[];
    status: "new" | "approved" | "rejected" | null; // Enum: "new", "approved", "rejected"
    operator_note: string | null;
    created_at: string; // Date-time
}

interface IPlanFieldDetail {
    id: number;
    cost: string;
    report: IReportDetail;
}

interface IPlanTableDetail {
    id: number;
    year: number;
    application: IApplicationDetail;

    foracast_electricity_cost: IPlanFieldDetail;
    exploitation_cost: IPlanFieldDetail;
    exploitation_salary: IPlanFieldDetail;
    exploitation_electricity_cost: IPlanFieldDetail;
    exploitation_full_repair: IPlanFieldDetail;
    exploitation_current_repair: IPlanFieldDetail;
    exploitation_other_cost: IPlanFieldDetail;
    investment_funds: IPlanFieldDetail;

    foracast_project_plan: string;
    foracast_salary_plan: string;
    foracast_other_cost_plan: string;
    foracast_project_fact: string;
    foracast_salary_fact: string;
    foracast_other_cost_fact: string;

    total_income_plan: string;
    total_private_partner_cost_plan: string;
    total_income_fact: string;
    total_profit_plan: string;
    total_private_partner_cost_fact: string;
    total_profit_fact: string;

    budget_savings_plan: string;
    investment_recovery_plan: string;
    balance_profit_loss_plan: string;
    state_budget_funds_plan: string;
    state_budget_funds_fact: string;
    balance_profit_loss_fact: string;
    budget_savings_fact: string;
    investment_recovery_fact: string;
}


interface IPlanTableItem {
    indicator: string;
    plan: string;
    fact: string;
    main: boolean;
    applicationId?: number | string;
    planId?: number | string;
    reportId?: number | string;
    edit?: boolean | null | number | string;
    bold: boolean;
    index: number | null;
    status: "new" | "approved" | "rejected";
}

interface IYearList {
    years: number[];
}

export type {
    IInvestmentList,
    IPlanDetail,
    IApplicationDuration,
    IPlanFieldDetail,
    IReportDetail,
    IPlanTableDetail,
    ICost,
    IPlanTableItem,
    IYearList
}