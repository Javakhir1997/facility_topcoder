import {ROLE_LIST} from '@app/shared'
// import {Appeals, Applications, Investment, Monitoring, Reports} from '@app/assets'
import {Applications,Monitoring} from '@app/assets'
import {IMenuItem} from '@app/interfaces'


export const menu: IMenuItem[] = [
	// {
	// 	id: '/appeals',
	// 	label: 'Appeals',
	// 	icon: Appeals,
	// 	href: '/appeals',
	// 	allowedRoles: [
	// 		ROLE_LIST.HEAD,
	// 		ROLE_LIST.OPERATOR,
	// 		ROLE_LIST.APPLICANT,
	// 		ROLE_LIST.REGION_OPERATOR
	// 	],
	// 	order: {
	// 		[ROLE_LIST.HEAD]: 2,
	// 		[ROLE_LIST.OPERATOR]: 1,
	// 		[ROLE_LIST.APPLICANT]: 1,
	// 		[ROLE_LIST.REGION_OPERATOR]: 1
	// 	}
	// },
	{
		id: '/applications',
		label: 'Applications',
		icon: Applications,
		href: '/applications',
		allowedRoles: [
			ROLE_LIST.HEAD,
			ROLE_LIST.OPERATOR,
			ROLE_LIST.APPLICANT,
			ROLE_LIST.REGION_OPERATOR,
			ROLE_LIST.BASIN_B_B,
			ROLE_LIST.BALANCE,
			ROLE_LIST.MINISTRY_DXSH_B_B,
			ROLE_LIST.MINISTRY_DXSH_B_X,
		],
		order: {
			[ROLE_LIST.HEAD]: 3,
			[ROLE_LIST.OPERATOR]: 2,
			[ROLE_LIST.APPLICANT]: 2,
			[ROLE_LIST.REGION_OPERATOR]: 2,
			[ROLE_LIST.BASIN_B_B]: 1,
			[ROLE_LIST.BALANCE]:2,
			[ROLE_LIST.MINISTRY_DXSH_B_X]: 2
			
		}
	},
	{
		id: '/conceptions',
		label: 'Conceptions',
		icon: Applications,
		href: '/conceptions',
		allowedRoles: [
			ROLE_LIST.APPLICANT,
			ROLE_LIST.BASIN_B_B,
			ROLE_LIST.BALANCE,
			ROLE_LIST.MINISTRY_DXSH_B_B,
			ROLE_LIST.REGION_OPERATOR,
			ROLE_LIST.MINISTRY_DXSH_B_X,
		],
		order: {
			[ROLE_LIST.APPLICANT]: 2,
			[ROLE_LIST.BASIN_B_B]: 2,
			[ROLE_LIST.BALANCE]: 2,
			[ROLE_LIST.MINISTRY_DXSH_B_B]: 2,
			[ROLE_LIST.REGION_OPERATOR]: 2,
			[ROLE_LIST.MINISTRY_DXSH_B_X]: 2,
		}
	},
	{
		id: '/announcements',
		label: 'Announcements',
		icon: Applications,
		href: '/announcements',
		allowedRoles: [
			ROLE_LIST.HEAD,
			ROLE_LIST.OPERATOR,
			ROLE_LIST.APPLICANT,
			ROLE_LIST.REGION_OPERATOR,
			ROLE_LIST.BASIN_B_B,
			ROLE_LIST.MINISTRY_DXSH_B_B,
		],
		order: {
			[ROLE_LIST.HEAD]: 3,
			[ROLE_LIST.OPERATOR]: 2,
			[ROLE_LIST.APPLICANT]: 2,
			[ROLE_LIST.REGION_OPERATOR]: 2,
			[ROLE_LIST.BASIN_B_B]: 1
		}
	},

	{
		id: '/tenders',
		label: 'Tenders',
		icon: Applications,
		href: '/tenders',
		allowedRoles: [
			ROLE_LIST.HEAD,
			ROLE_LIST.OPERATOR,
			// ROLE_LIST.APPLICANT,
			ROLE_LIST.REGION_OPERATOR,
			ROLE_LIST.BASIN_B_B,
			ROLE_LIST.MINISTRY_DXSH_B_B,
		],
		order: {
			[ROLE_LIST.HEAD]: 3,
			[ROLE_LIST.OPERATOR]: 2,
			// [ROLE_LIST.APPLICANT]: 2,
			[ROLE_LIST.REGION_OPERATOR]: 2,
			[ROLE_LIST.BASIN_B_B]: 1,
			[ROLE_LIST.MINISTRY_DXSH_B_B]:2
		}
	},

	{
		id: '/deals',
		label: 'Deals',
		icon: Applications,
		href: '/deals',
		allowedRoles: [
			ROLE_LIST.HEAD,
			ROLE_LIST.OPERATOR,
			ROLE_LIST.APPLICANT,
			ROLE_LIST.REGION_OPERATOR,
			ROLE_LIST.BASIN_B_B,
			ROLE_LIST.MINISTRY_DXSH_B_B,
		],
		order: {
			[ROLE_LIST.HEAD]: 3,
			[ROLE_LIST.OPERATOR]: 2,
			[ROLE_LIST.APPLICANT]: 2,
			[ROLE_LIST.REGION_OPERATOR]: 2,
			[ROLE_LIST.BASIN_B_B]: 1
		}
	},
	// {
	// 	id: '/investments',
	// 	label: 'Investment obligation',
	// 	icon: Investment,
	// 	href: '/investments',
	// 	allowedRoles: [
	// 		ROLE_LIST.HEAD,
	// 		ROLE_LIST.OPERATOR,
	// 		ROLE_LIST.REGION_OPERATOR,
	// 		ROLE_LIST.APPLICANT
	// 	],
	// 	order: {
	// 		[ROLE_LIST.HEAD]: 4,
	// 		[ROLE_LIST.OPERATOR]: 3,
	// 		[ROLE_LIST.REGION_OPERATOR]: 3,
	// 		[ROLE_LIST.APPLICANT]: 3
	// 	}
	// },
	// {
	// 	id: '/electricity',
	// 	label: 'Reports',
	// 	icon: Reports,
	// 	href: '/electricity',
	// 	allowedRoles: [
	// 		ROLE_LIST.HEAD,
	// 		ROLE_LIST.OPERATOR,
	// 		ROLE_LIST.REGION_OPERATOR,
	// 		ROLE_LIST.APPLICANT
	// 	],
	// 	order: {
	// 		[ROLE_LIST.HEAD]: 5,
	// 		[ROLE_LIST.OPERATOR]: 4,
	// 		[ROLE_LIST.REGION_OPERATOR]: 4,
	// 		[ROLE_LIST.APPLICANT]: 4
	// 	}
	// },
	{
		id: '/monitoring',
		label: 'Monitoring',
		icon: Monitoring,
		href: '/monitoring',
		allowedRoles: [
			ROLE_LIST.HEAD,
			ROLE_LIST.MINISTRY_DXSH_B_B
		],
		order: {
			[ROLE_LIST.HEAD]: 1,
			[ROLE_LIST.MINISTRY_DXSH_B_B]: 2
		}
	},
	{
		id: '/add',
		label: 'Concept',
		icon: Monitoring,
		href: '/add',
		allowedRoles: [
			ROLE_LIST.APPLICANT
		],
		order: {
			[ROLE_LIST.APPLICANT]: 5
		}
	},
	{
		id: "/projects-passport",
		label: "Projects Passport",
		icon: Monitoring,
		href: "/projects-passport",
		allowedRoles: [ROLE_LIST.HEAD,ROLE_LIST.APPLICANT],
		order: {
			[ROLE_LIST.HEAD]: 6,
		},
	},
	{
		id: "/projects",
		label: "Project names",
		icon: Monitoring,
		href: "/projects",
		allowedRoles: [ROLE_LIST.HEAD,ROLE_LIST.APPLICANT],
		order: {
			[ROLE_LIST.HEAD]: 7,
		},
	},

]
