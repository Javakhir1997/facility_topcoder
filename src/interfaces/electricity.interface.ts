import {IFIle, ISelectOption} from "@interfaces/form.interface.ts";

interface IObjectList {
    id: number; // ID, readonly
    project_name: string; // Project name, readonly, minlength: 1
    object_name: string; // Object name, readonly, minlength: 1
    object_type: string; // Object type, readonly, minlength: 1
    from_date: number; // From date, readonly
    to_date: number; // To date, readonly
}

interface IElectricityPlanList {
    id: number; // ID, readonly
    electricity_capacity: string; // Electricity capacity
    report: IElectricityReportDetail;
    year: number; // Year, must be within range -2147483648 to 2147483647
}

interface IElectricityReportDetail {
    id: number; // ID, readonly
    plan: IElectricityPlanDetail;
    electricity_capacity: string; // Electricity capacity
    description: string; // Description, minlength: 1
    files: IFIle[]; // Array of attachments
    status: "new" | "approved" | "rejected"; // Status enum
    operator_note: string; // Operator note, minlength: 1
    created_at: string | null; // Operator note, minlength: 1
}

interface IElectricityPlanDetail {
    id: number; // ID, readonly
    object: IObjectDetail;
    electricity_capacity: string; // Electricity capacity
    year: number; // Year, must be within range -2147483648 to 2147483647
}

interface IObjectDetail {
    id: number; // ID, readonly
    name: string; // Name, minlength: 1, maxlength: 255
    type: ISelectOption;
    owner_organization: ISelectOption;
    address: string; // Address, maxlength: 255
    used: boolean; // Used
}

export type {
    IObjectList,
    IElectricityPlanList,
    IElectricityReportDetail,
    IElectricityPlanDetail,
    IObjectDetail
}