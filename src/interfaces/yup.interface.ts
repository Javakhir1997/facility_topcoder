import {IFIle} from '@interfaces/form.interface.ts'


interface ILoginForm {
	username: string;
	password: string;
}
interface IWinnerAddForm {
	winner:string,
    vice_winner:string,
    protocol: IFIle,
}

interface IEditDealConfirm {
	file:IFIle
}
interface IAppealForm {
	lastName: string;
	firstName: string;
	middleName: string;
	idNumber: string;
	region: string;
	wmfRegion: string;
	address: string;
	organization: string;
	tin: string;
	bankAccount: string;
	balanceHolder: string;
	phone: string;
	email: string;
	wmfType: string[];
	objects: string[];
	content: string;
	attachment?: string | number;
	files: IFIle[];
}


interface IConfirmDealFilesForm {
	files: IFIle[];
}
interface IReplyAppealForm {
	responseType: string;
	// responseDate: string;
	responseText: string;
	files: IFIle[];
}

interface IOperatorReturnAppealForm {
	responseText: string;
	files?: IFIle[] | null;
}

interface ISentForm {
	files?: IFIle[] | null;
}

interface IReturnAppealForm {
	comment: string;
}


// Applications

interface IConfirmApplicationForm {
	responsibility: {
		id: string,
		deadline: string
	}[];
}


interface IApplicationForm {
	name: string;
	cost: string;
	startDate: string;
	endDate: string;
	files: IFIle[];
	content: string;
	project_type: string;
	volume_work: string;
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

// Investments
interface IAddInvestmentForm {
	foracast_electricity_cost: string; // Forecast electricity cost
	exploitation_cost: string; // Exploitation cost
	exploitation_salary: string; // Exploitation salary
	exploitation_electricity_cost: string; // Exploitation electricity cost
	exploitation_full_repair: string; // Full repair cost
	exploitation_current_repair: string; // Current repair cost
	exploitation_other_cost: string; // Other exploitation costs
	investment_funds: string; // Investment funds
	year: string; // Year as a string
}

interface IAddReportForm {
	cost: string;
	description: string;
	files: IFIle[];
}

// Electricity

interface IAddElectricity {
	electricity_capacity: string | number;
	year: string | number;
}


interface IAddElectricityReportForm {
	electricity_capacity: string | number;
	description: string;
	files: IFIle[];
}

export type {
	ILoginForm,
	IAppealForm,
	IReplyAppealForm,
	IReturnAppealForm,
	IOperatorReturnAppealForm,
	IApplicationForm,
	ISentForm,
	IAddInvestmentForm,
	IAddReportForm,
	IAddElectricity,
	IAddElectricityReportForm,
	IConfirmApplicationForm,
	IWinnerAddForm,
	IConfirmDealFilesForm,
	IEditDealConfirm
}
