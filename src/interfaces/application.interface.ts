import { IAppealAnswer, IAppealDetail } from "@interfaces/appeal.interface.ts";
import { IFIle } from "@interfaces/form.interface.ts";
import { STATUS_LIST } from "@app/shared";

interface IApplicationList {
  id: number;
  appeal: IAppealDetail;
  project_name: string;
  cost: string;
  from_date: string;
  to_date: string;
  created_at: string;
  status:
    | "new"
    | "negotiated"
    | "returned"
    | "in_MoF"
    | "approved"
    | "rejected";
  answer_type?: "returned" | "positive" | "negative";
  type: "first" | "repetitive";
}

interface IApplicationDetail {
  id: number;
  appeal: IAppealDetail;
  project_name: string;
  answer_status: "in_progress" | "returned" | "approved" | "rejected";
  cost: string;
  from_date: number;
  to_date: number;
  description: string;
  created_at: string;
  status:
    | "new"
    | "negotiated"
    | "returned"
    | "in_MoF"
    | "approved"
    | "rejected";
  answer_type?: "returned" | "positive" | "negative";
  type: "first" | "repetitive";
  answers: IAppealAnswer[];
  files: IFIle[];
  sxo_files: IFIle[] | null;
}

interface IApplicationFileGenerate {
  company_name: string;
  object_region: string;
  fullName: string;
  object_name: string;
  object_type: string;
  day: number;
  month: string;
  project_cost: string;
  from_date: string;
  to_date: string;
  bank_account?: string;
  mfo: string;
}

// Application concept

interface IConceptionList {
  id: number;
  volume_work: string;
  project_name: string;
  cost: string;
  from_date: string;
  to_date: string;
  created_at: string;
  status:
    | "new"
    | "negotiated"
    | "returned"
    | "in_MoF"
    | "approved"
    | "rejected";
  answer_type?: "returned" | "positive" | "negative";
  type: "first" | "repetitive";
}

interface IDirectory {
  id: number;
  name: string;
}

interface Balans_organization {
  id: Number;
  name: String;
}

interface IWinnerObjectDetail {
  balans_organization: Balans_organization;
  district: IDirectory;
  id: number;
  name: string;
  region: IDirectory;
  type: IDirectory;
}

interface IWinnerDetailToDeal {
  id: number;
  firstname: string;
  lastname: string;
  middle_name: string;
  id_number: string | null;
  region: IDirectory;
  district: IDirectory;
  company_name: string | null;
  stir: string | null;
  phone: string;
  email: string;
  object: IWinnerObjectDetail[];
  concept: string | null;
  protocol: string | null;
  winner_bank_account: string | null;
  sxo_type: string | null;
  balance_keeper: string | null;
}

interface IConceptionDetail {
  id: number;
  volume_work: string;
  project_name: string;
  cost: string;
  from_date: string;
  to_date: string;
  created_at: string;
  status: STATUS_LIST;
  answer_type?: "returned" | "positive" | "negative";
  type: "first" | "repetitive";
  project_type: string;
  description_documents_list: string;
  point3_1: string;
  point3_2: string;
  point3_3: string;
  point3_4: string;
  point3_5_a: string;
  point3_5_b: string;
  point3_5_v: string;
  point3_5_g: string;
  point3_5_d: string;
  point3_6_a: number;
  point3_6_b_0: string;
  point3_6_b: number;
  point3_7: number;
  point3_8_1: number;
  point3_8_2: number;
  point3_8_3: number;
  point3_8_4: number;
  point3_8_5: number;
  point3_8_6: number;
  point3_8_7: number;
  point3_8_8: number;
  point3_8_9: number;
  point3_8_10: number;
  point3_8_11: number;
  point3_8_12: number;
  point3_8_13: number;
  point3_8_14: number;
  point3_8_15: number;
  point3_8_16: number;
  point3_8_17: number;
  point3_8_18: number;
  point3_8_19: number;
  point3_8_20: number;
  point3_8_21: number;
  point3_8_22: number;
  point3_8_23: number;
  point3_9_a: string;
  point3_9_b: string;
  point3_9_v: string;
  point3_9_d: string;
  point3_9_e: string;
  point3_9_g: string;
  point3_10_comment: string;
  point3_11_comment: string;
  point3_12_comment: string;
  point3_13: string;
  point3_14: string;
  point3_15: string;
  point3_16: string;
  point3_17: string;
  point3_18_a: string;
  point3_18_b: string;
  attachment?: string | number;
}

export type {
  IApplicationList,
  IApplicationDetail,
  IApplicationFileGenerate,
  IConceptionList,
  IConceptionDetail,
  IWinnerDetailToDeal,
  IWinnerObjectDetail,
};
