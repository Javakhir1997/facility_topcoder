import {ROLE_LIST} from '@app/shared'


export type IRole =
	ROLE_LIST.APPLICANT
	| ROLE_LIST.HEAD
	| ROLE_LIST.OPERATOR
	| ROLE_LIST.FINANCE_EMPLOYEE
	| ROLE_LIST.REGION_OPERATOR
	| ROLE_LIST.BALANCE
	| ROLE_LIST.MINISTRY_DXSH_B_X
	| ROLE_LIST.MINISTRY_DXSH_B_B
	| ROLE_LIST.BASIN_B_B

export interface IUserData {
	id: number; // Фойдаланувчи ID
	first_name: string; // Фойдаланувчининг исми
	last_name: string; // Фойдаланувчининг фамилияси
	username: string; // Фойдаланувчининг фойдаланувчи номи
	email: string; // Фойдаланувчининг электрон почта манзили
	role: IRole; // Фойдаланувчининг роли
	pnfl: string; // Фойдаланувчининг ПНФЛ (шахсий рақам)
	serial_number: string; // Паспорт серия рақами
	issued: string; // Паспорт берилган сана
}

export interface IAuthentication {
	id: number;
	fullName: string
	role: IRole
}

export interface ILogin {
	data: IUserData
	message?: string
}
