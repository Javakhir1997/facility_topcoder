import { Interface } from "readline";

export interface ProjectPassport {
  id: number;
  region: string; // `arrayToString(row.region)`
  districts: string[]; // `row.districts`
  owner_organization: string;
  object: string[]; // `arrayToString(row.object)`
  private_partner: string;
  stir: string;
  registry_number: string;
  interval_years: string;
  contract_term: string;
  project_price: string;
  status: string;
}

export interface ProjectDetail {
  appeal_status: string;
  response_letter: string;
  appeal_type: string;
  date: string;
  sxo_region: string;
  applicant: {
    last_name: string;
    first_name: string;
    middle_name: string;
    personal_id: string;
    living_region: string;
    living_address: string;
    phone_number: string;
  };
  organization: {
    name: string;
    tin: string;
    bank_account: string;
    email: string;
    balance_holder: string;
  };
  sxo_type: string[];
  object_name: string;
  obj_type: string;
}

export interface IAddProjectPassportForm {
  code: string | null;
  region: number | null;
  districts: number[];
  owner_organization: number | null;
  object: number[];
  private_partner: string;
  stir: string;
  registry_number: string;
  interval_years: string;
  contract_term: number | null;
  project_price: string;
  status: boolean;
  files:[]
}

interface IFile {
  id: number;
  file: string;
  name: string;
  project: number | null;
}
export interface IAddProjectFilesForm {
  files: {
    file: IFile | null;
  }[];
}
export interface IProjectPlanForm {
  plans: {
    object: string;
    project: number | null;
    object_type: number | null;
    report: {
      id: number;
      plan: string;
      price: string;
      date: number | null;
    }[];
  }[];
}
export interface IProjectPlanFormD {
  plans: {
    draft: string;
    project: number | null;
    object_type: number | null;
    report: {
      id: number;
      plan: string;
      price: string;
      date: number | null;
    }[];
  }[];
}

export interface ICurrentInvestmentForm {
  investments: {
    project: number | null;
    object: string;
    object_type: number | null;
    report: {
      id: number;
      fact: string;
      price: string;
      date: string;
      file: IFile | null;
    }[];
  }[];
}
export interface ICurrentInvestmentFormD {
  plans: {
    project: number | null;
    draft: string;
    report: {
      id: number;
      fact: string;
      price: string;
      date: string;
      file: IFile | null;
    }[];
  }[];
}
export interface IAdditionalInvestmentForm {
  additionalInvestments: {
    object: string;
    project: number | null;
    object_type: number | null;
    report: {
      id: number;
      addition: string;
      price: string;
      date: string;
      file: IFile | null;
    }[];
  }[];
}
export interface IAdditionalInvestmentFormD {
  plans: {
    draft: string;
    project: number | null;
    report: {
      id: number;
      addition: string;
      price: string;
      date: string;
      file: IFile | null;
    }[];
  }[];
}

export interface IMonitoringForm {
  items: {
    backend_id:number;
    id: number;
    project: number | null;
    date: string;
    file: IFile | null;
    comment: string;
  }[];
}
interface Item {
  project: number | null;
  draft: string;
  object_type: number;
  plan: string;
  price: number;
  date: number | null;
}

export interface IProjectPlanFormFlat {
  items: Item[];
}
interface Item2 {
  project: number | null;
  draft: string;
  object_type: number;
  fact: string;
  price: number;
  file: File | null;
  date: string;
}
export interface IInvestmentFlat {
  items: Item2[];
}
interface Item3 {
  project: number | null;
  draft: string;
  object_type: number;
  addition: string;
  price: number;
  file: File | null;
  date: string;
}
export interface IAdditionalInvestmentFlat {
  items: Item3[];
}

interface eRegion {
  id: number;
  name: string;
}

interface eDistrict {
  id: number;
  name: string;
}

interface eOrganization {
  id: number;
  name: string;
}

interface eObjectItem {
  id: number;
  name: string;
}

interface eProjectFile {
  id: number;
  file: string;
  name: string;
  project: number;
}

interface eMonitoring {
  id: number;
  project: {
    id: number;
    code: string;
  };
  date: string;
  file: eProjectFile;
  comment: string;
}



interface eProjectPlan {
  id: number;
  project: {
    id: number;
    code: string;
  };
  object_type:{id:number,name:string},
  draft: string;
  plan: string;
  price: number;
  date: number;
}

interface eFact {
  id: number;
  project: {
    id: number;
    code: string;
  };
  object_type: { id: number; name: string };
  draft: string;
  fact: string;
  price: number;
  date: string;
  file: eProjectFile |null;
}
interface eAdditional {
  id: number;
  project: {
    id: number;
    code: string;
  };
  object_type: { id: number; name: string };
  draft: string;
  addition: string;
  price: number;
  date: string;
  file: eProjectFile |null;
}

export interface EProjectToEdit {
  id: number;
  code: string;
  region: eRegion;
  districts: eDistrict[];
  owner_organization: eOrganization;
  object: eObjectItem[];
  private_partner: string;
  stir: string;
  registry_number: string;
  interval_years: string;
  contract_term: number;
  project_price: number;
  status: boolean;
  files: eProjectFile[] |null;
  monitoring: eMonitoring[];
  project_plans: eProjectPlan[];
  facts: eFact[];
  additional: eAdditional[];
}


