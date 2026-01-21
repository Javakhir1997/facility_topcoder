import { IUserData, IFIle, ISelectOption } from '@app/interfaces'

// --- Yordamchi interfeyslar ---
interface District {
    id: number;
    name: string;
}

interface ObjectItem {
    id: number;
    name: string;
    district: District[];
}

interface ObjectType {
    id: number;
    name: string;
}

interface BalanceOrganization {
    id: number;
    name: string;
}

type Status = 'new' | 'pending' | 'approved' | 'rejected' | 'accepted' | 'in_proces' | "returned";

// --- Asosiy Ma'lumotlar Interfeyslari ---

export interface ExampleData {
    id: number;
    fullname: string;
    object_type: ObjectType;
    object: ObjectItem[];
    balance_organization: BalanceOrganization;
    created_at: string;
    status: string;
}

// announcement.interface.ts faylida:

// OLDINGI: export interface IAnnouncementListTable {
export interface IAnnouncementList {  // SHU NOMGA O'ZGARTIRING
    id: number;
    object_name: string;
    object_type: string;
    address: string;
    start_date: string;
    end_date: string;
    applicants_count: number;
    applicant_name: string;
    status: string;
    caption?: string;
}

export interface IAnnouncementAnswer {
    id: number;
    text: string | null;
    note: string | null;
    created_by: IUserData;
    created_at: string;
    files: IFIle[];
}

export interface IPerformer {
    id: number;
    status: string;
    deadline: string;
    evaluation_status: string;
    evaluation_text: string;
    evaluation_file: string;
    performer: {
        id: number;
        full_name: string
    }
}

// --- Detal Ma'lumotlar uchun (Combined) ---

interface IExampleDataDetail {
    id: number;
    district: District | null;
    object_type: ObjectType;
    balance_organization: BalanceOrganization;
    object: ObjectItem[];
    created_at: string;
    updated_at: string;
    is_active: boolean;
    status: Status;
    stir: string;
    pinfl: string | null;
    passport_seria: string | null;
    passport_number: string | null;
    firstname: string | null;
    lastname: string | null;
    middle_name: string | null;
    id_number: string | null;
    address: string | null;
    company_name: string | null;
    phone: string | null;
    email: string | null;
    activity_experience: number;
    indebtedness: boolean;
    stability_rating: string;
    success_projects: string | null;
    investment_ability: number;
    techniques: string;
    financing_opportunity: string;
    return_on_investment: boolean;
    body: string | null;
    region_by_ball: number;
    investment_ability_ball: number;
    experience_ball: number;
    techniques_ball: number;
    stability_rating_ball: number;
    success_projects_ball: number;
    return_on_investment_ball: number;
    rejection_text: string | null;
    rejection_performer_status: string | null;
    rejection_performer_text: string | null;
    object_evaluation_balance_organization: boolean;
    object_evaluation_balance_organization_text: string | null;
    evaluation_confirmation_documents: string | null;
    created_by: number;
    updated_by: number | null;
    owner: number | null;
    activity_type: number;
    indebtedness_file: { file: string; name: string; };
    success_projects_file: { file: string; name: string; };
    rejection_file: number | null;
    rejection_performer_file: number | null;
}

interface ICombinedData {
    id: number;
    firstname: string;
    inn_number: string;
    lastname: string;
    patronymic?: string | null;
    id_number: string;
    description: string;
    address: string;
    organization: string;
    bank_account: string;
    phone: string;
    region: ISelectOption;
    sxo_region: ISelectOption;
    email: string;
    sxo_objects: ISelectOption[];
    object_types: ISelectOption[];
    owner_organization: ISelectOption;
    created_at: string;
    status: Status;
    answer_status: 'in_progress' | 'returned' | 'approved';
    answer_type?: 'returned' | 'positive' | 'negative' | null;
    type: 'first' | 'repetitive';
    answers: IAnnouncementAnswer[];
    files: IFIle[];
    file: string;
    rejection_file: string;
    performers?: IPerformer[];
    confirmation_documents: {
        id: string;
        attachment: { name: string; file: string; }
    }[]
}

export type IAnnouncementDetail = IExampleDataDetail & ICombinedData;

// --- FILE GENERATION INTERFACES ---

export interface IContractFileGenerate {
    company_name: string;
    object_region: string;
    object_name: string;
    object_type: string;
    day: number;
    month: string;
    project_cost: string;
    from_date: string;
    to_date: string;
    bank_account: string;
    mfo?: string | null;
}

export interface IAnnouncementFileGenerate {
    owner_organization: string;
    object_region: string;
    object_name: string;
    object_type: string;
    company_name: string;
    fullName: string;
    content: string
}

export interface IAttachmentResponse {
    attachment: number;
    file_path: string;
    message: string;
}

// --- FORM INTERFACES (Servisdagi xatoliklarni yopish uchun) ---

export interface IAnnouncementForm {
    firstName: string;
    lastName: string;
    middleName?: string | null;
    tin: string;
    idNumber: string;
    address: string;
    organization: string;
    bankAccount: string;
    phone: string;
    region: number;
    wmfRegion: number;
    email: string;
    content: string;
    objects: number[];
    wmfType: number;
    balanceHolder: number;
    attachment?: number;
    files: any[];
}



export interface IReplyAnnouncementForm {
    responseText: string;
    responseType: 'positive' | 'negative' | 'returned';
    files: any[];
}

export interface IReturnAnnouncementForm {
    comment: string;
}

export interface IOperatorReturnAnnouncementForm {
    responseText: string;
    files: any[];
}