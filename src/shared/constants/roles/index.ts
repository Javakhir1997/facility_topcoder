enum ROLE_LIST {
	ADMIN = 'admin',
	USER = 'user',
	BALANCE = 'balance',
	BASIN_B_B = 'basin_b_b',
	MINISTRY_DXSH_B_B = 'ministry_dxsh_b_b',
	MINISTRY_DXSH_B_X = 'ministry_dxsh_b_x',
	MINISTRY_M_B_B = 'ministry_m_b_b',
	DEPUTY_MINISTRY = 'deputy_ministry',
	MINISTRY = 'ministry',
	MINISTRY_FINANCE = 'ministry_finance',
	APPLICANT = 'entrepreneur',
	OPERATOR = 'operator',
	HEAD = 'director',
	FINANCE_EMPLOYEE = 'finance_operator',
	REGION_OPERATOR = 'region_dxsh'
}

const ROLE_LABEL: Record<ROLE_LIST, string> = {
	[ROLE_LIST.ADMIN]: 'Admin',
	[ROLE_LIST.USER]: 'System admin',
	[ROLE_LIST.APPLICANT]: 'Entrepreneur',
	[ROLE_LIST.REGION_OPERATOR]: 'Region DXSH',
	[ROLE_LIST.BALANCE]: 'Balance organization',
	[ROLE_LIST.BASIN_B_B]: 'Basin department head',
	[ROLE_LIST.MINISTRY_DXSH_B_B]: 'Ministry DXSH department head',
	[ROLE_LIST.MINISTRY_DXSH_B_X]: 'Operator',
	[ROLE_LIST.MINISTRY_M_B_B]: 'Operator',
	[ROLE_LIST.DEPUTY_MINISTRY]: 'Operator',
	[ROLE_LIST.MINISTRY]: 'Operator',
	[ROLE_LIST.MINISTRY_FINANCE]: 'Operator',
	[ROLE_LIST.OPERATOR]: 'Operator',
	[ROLE_LIST.HEAD]: 'Head',
	[ROLE_LIST.FINANCE_EMPLOYEE]: 'Finance employee'
}

export {
	ROLE_LIST,
	ROLE_LABEL
}