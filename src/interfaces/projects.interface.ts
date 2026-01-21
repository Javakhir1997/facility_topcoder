interface Type  {
  id: number;
  name: string;
};

interface OwnerOrganization  {
  id: number;
  name: string;
};

export interface Project  {
  id: number;
  name: string;
  type: Type;
  owner_organization: OwnerOrganization;
  used: boolean;
};
export interface ProjectColumn  {
  id: number;
  name: string;
  type: string;
  owner_organization: string;
  used: boolean;
};


interface District  {
  id: number;
  name: string;
};

export interface ProjectDetail  {
  id: number;
  name: string;
  type: Type;
  owner_organization: OwnerOrganization;
  application: string | null; 
  district: District[];
  address: string;
  used: boolean;
  electricity_plan_created: boolean;
  investment_plan_created: boolean;
};
export interface ProjectForm {
  name: string;
  type:  number | null;
  owner_organization: number | null;
  district: number[];
  address: string;
  used: boolean;
  investment_plan_created: boolean;
}