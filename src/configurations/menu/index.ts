import { ROLE_LIST } from "@app/shared";
import { IMenuItem } from "@app/interfaces";
import {
  Applications,
  Monitoring,
  Conceptions,
  ObjectsSide,
  Deals,
  Investment,
  Reports,
  Finans,
  Deed,
  ApplicationsForm,
} from "@app/assets";

export const menu: IMenuItem[] = [
<<<<<<< HEAD
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
			ROLE_LIST.MINISTRY_M_B_B
		],
		order: {
			[ROLE_LIST.APPLICANT]: 2,
			[ROLE_LIST.BASIN_B_B]: 2,
			[ROLE_LIST.BALANCE]: 2,
			[ROLE_LIST.MINISTRY_DXSH_B_B]: 2,
			[ROLE_LIST.REGION_OPERATOR]: 2,
			[ROLE_LIST.MINISTRY_DXSH_B_X]: 2,
			[ROLE_LIST.MINISTRY_M_B_B]:2
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
=======
  // Arizalar
  {
    id: "/applications",
    label: "Applications",
    icon: Applications,
    href: "/applications",
    allowedRoles: [
      ROLE_LIST.APPLICANT,
      ROLE_LIST.BALANCE,
      ROLE_LIST.MINISTRY_DXSH_B_B,
      ROLE_LIST.MINISTRY_DXSH_B_X,
      ROLE_LIST.OPERATOR,
    ],
    order: {
      [ROLE_LIST.APPLICANT]: 1,
      [ROLE_LIST.BALANCE]: 1,
      [ROLE_LIST.MINISTRY_DXSH_B_B]: 1,
      [ROLE_LIST.MINISTRY_DXSH_B_X]: 1,
      [ROLE_LIST.OPERATOR]: 1,
    },
  },
  // Obyektlar
  {
    id: "/objects",
    label: "Objects",
    icon: ObjectsSide,
    href: "/objects",
    allowedRoles: [
      ROLE_LIST.APPLICANT,
      ROLE_LIST.BASIN_B_B,
      ROLE_LIST.MINISTRY_DXSH_B_B,
      ROLE_LIST.REGION_OPERATOR,
      ROLE_LIST.ADMIN,
      ROLE_LIST.USER,
      ROLE_LIST.BALANCE,
      ROLE_LIST.MINISTRY_DXSH_B_X,
      ROLE_LIST.MINISTRY_M_B_B,
      ROLE_LIST.DEPUTY_MINISTRY,
      ROLE_LIST.MINISTRY,
      ROLE_LIST.MINISTRY_FINANCE,
      ROLE_LIST.OPERATOR,
      ROLE_LIST.HEAD,
      ROLE_LIST.FINANCE_EMPLOYEE,
    ],
    order: {
      [ROLE_LIST.APPLICANT]: 2,
      [ROLE_LIST.BASIN_B_B]: 2,
      [ROLE_LIST.BALANCE]: 2,
      [ROLE_LIST.MINISTRY_DXSH_B_B]: 2,
      [ROLE_LIST.REGION_OPERATOR]: 2,
    },
  },
  // Konsepsiya
  {
    id: "/conceptions",
    label: "Concept",
    icon: Conceptions,
    href: "/conceptions",
    allowedRoles: [
      ROLE_LIST.APPLICANT,
      ROLE_LIST.BASIN_B_B,
      ROLE_LIST.BALANCE,
      ROLE_LIST.REGION_OPERATOR,
      ROLE_LIST.MINISTRY_DXSH_B_B,
      ROLE_LIST.ADMIN,
      ROLE_LIST.USER,
      ROLE_LIST.MINISTRY_DXSH_B_X,
      ROLE_LIST.MINISTRY_M_B_B,
      ROLE_LIST.DEPUTY_MINISTRY,
      ROLE_LIST.MINISTRY,
      ROLE_LIST.MINISTRY_FINANCE,
      ROLE_LIST.OPERATOR,
      ROLE_LIST.HEAD,
      ROLE_LIST.FINANCE_EMPLOYEE,
    ],
    order: {
      [ROLE_LIST.APPLICANT]: 2,
      [ROLE_LIST.BASIN_B_B]: 2,
      [ROLE_LIST.BALANCE]: 2,
      [ROLE_LIST.MINISTRY_DXSH_B_B]: 2,
      [ROLE_LIST.REGION_OPERATOR]: 2,
    },
  },
  // Elonlar
  {
    id: "/announcements",
    label: "Announcements",
    icon: Applications,
    href: "/announcements",
    allowedRoles: [
      ROLE_LIST.APPLICANT,
      ROLE_LIST.MINISTRY_DXSH_B_B,
      ROLE_LIST.MINISTRY_M_B_B,
      ROLE_LIST.DEPUTY_MINISTRY,
      ROLE_LIST.MINISTRY,
      ROLE_LIST.MINISTRY_FINANCE,
    ],
    order: {
      [ROLE_LIST.APPLICANT]: 3,
      [ROLE_LIST.MINISTRY_DXSH_B_B]: 3,
      [ROLE_LIST.MINISTRY_M_B_B]: 3,
      [ROLE_LIST.DEPUTY_MINISTRY]: 3,
      [ROLE_LIST.MINISTRY]: 3,
      [ROLE_LIST.MINISTRY_FINANCE]: 3,
      [ROLE_LIST.REGION_OPERATOR]: 3,
      [ROLE_LIST.BASIN_B_B]: 3,
    },
  },
  // Tenderlar
  {
    id: "/tenders",
    label: "Tenders",
    icon: Applications,
    href: "/tenders",
    allowedRoles: [
      ROLE_LIST.APPLICANT,
      ROLE_LIST.MINISTRY_DXSH_B_B,
      ROLE_LIST.MINISTRY_M_B_B,
      ROLE_LIST.DEPUTY_MINISTRY,
      ROLE_LIST.MINISTRY,
      ROLE_LIST.MINISTRY_FINANCE,
    ],
    order: {
      [ROLE_LIST.APPLICANT]: 4,
      [ROLE_LIST.MINISTRY_DXSH_B_B]: 4,
      [ROLE_LIST.MINISTRY_M_B_B]: 4,
      [ROLE_LIST.DEPUTY_MINISTRY]: 4,
      [ROLE_LIST.MINISTRY]: 4,
      [ROLE_LIST.MINISTRY_FINANCE]: 4,
      [ROLE_LIST.REGION_OPERATOR]: 4,
      [ROLE_LIST.BASIN_B_B]: 4,
    },
  },
  // Bitim shartnomalar
  {
    id: "/deals",
    label: "Deals",
    icon: Deals,
    href: "/deals",
>>>>>>> ca8fb436a239f9c133a56afcf00da7122b8de05f

    allowedRoles: [
      ROLE_LIST.APPLICANT,
      ROLE_LIST.MINISTRY_DXSH_B_B,
      ROLE_LIST.MINISTRY_M_B_B,
      ROLE_LIST.DEPUTY_MINISTRY,
      ROLE_LIST.MINISTRY,
      ROLE_LIST.MINISTRY_FINANCE,
      ROLE_LIST.OPERATOR,
    ],
    order: {
      [ROLE_LIST.APPLICANT]: 5,
      [ROLE_LIST.MINISTRY_DXSH_B_B]: 5,
      [ROLE_LIST.MINISTRY_M_B_B]: 5,
      [ROLE_LIST.DEPUTY_MINISTRY]: 5,
      [ROLE_LIST.MINISTRY]: 5,
      [ROLE_LIST.MINISTRY_FINANCE]: 5,
      [ROLE_LIST.REGION_OPERATOR]: 5,
      [ROLE_LIST.BASIN_B_B]: 5,
      [ROLE_LIST.OPERATOR]: 5,
    },
  },
  // Moliyalashtirish grafigi
  {
    id: "/finans",
    label: "Financial Plans",
    icon: Finans,
    href: "/finans",
    allowedRoles: [ROLE_LIST.APPLICANT, ROLE_LIST.BASIN_B_B, ROLE_LIST.BALANCE],
    order: {
      [ROLE_LIST.APPLICANT]: 6,
      [ROLE_LIST.BASIN_B_B]: 6,
      [ROLE_LIST.BALANCE]: 6,
    },
  },
  // Investitsion majburiyatlar
  {
    id: "/investments",
    label: "Investment obligation",
    icon: Investment,
    href: "/investments",
    allowedRoles: [ROLE_LIST.APPLICANT, ROLE_LIST.BASIN_B_B, ROLE_LIST.BALANCE],
    order: {
      [ROLE_LIST.APPLICANT]: 7,
      [ROLE_LIST.BASIN_B_B]: 7,
      [ROLE_LIST.BALANCE]: 7,
    },
  },
  // Dalolatnoma Tuzish
  {
    id: "/deed",
    label: "Deed",
    icon: Deed,
    href: "/deed",
    allowedRoles: [ROLE_LIST.APPLICANT, ROLE_LIST.BALANCE],
    order: {
      [ROLE_LIST.APPLICANT]: 8,
      [ROLE_LIST.BALANCE]: 8,
    },
  },
  // Talabnoma tuzish shakillantirish
  {
    id: "/applicationform",
    label: "Application form",
    icon: ApplicationsForm,
    href: "/aplicationform",
    allowedRoles: [ROLE_LIST.APPLICANT, ROLE_LIST.BASIN_B_B, ROLE_LIST.BALANCE],
    order: {
      [ROLE_LIST.APPLICANT]: 9,
      [ROLE_LIST.BASIN_B_B]: 9,
      [ROLE_LIST.BALANCE]: 9,
    },
  },
  //Konsepsiya qo'shish
  {
    id: "/add",
    label: "Concept",
    icon: Monitoring,
    href: "/add",
    allowedRoles: [ROLE_LIST.APPLICANT],
    order: {
      [ROLE_LIST.APPLICANT]: 5,
    },
  },
  // Hisobot
  {
    id: "/electricity",
    label: "Reports",
    icon: Reports,
    href: "/electricity",
    allowedRoles: [
      ROLE_LIST.BALANCE,
      ROLE_LIST.MINISTRY_DXSH_B_X,
      ROLE_LIST.REGION_OPERATOR,
      ROLE_LIST.MINISTRY_DXSH_B_B,
      ROLE_LIST.MINISTRY_M_B_B,
      ROLE_LIST.OPERATOR,
      ROLE_LIST.DEPUTY_MINISTRY,
      ROLE_LIST.MINISTRY,
      ROLE_LIST.MINISTRY_FINANCE,
      ROLE_LIST.FINANCE_EMPLOYEE,
      ROLE_LIST.HEAD,
    ],
    order: {
      [ROLE_LIST.HEAD]: 5,
      [ROLE_LIST.OPERATOR]: 4,
      [ROLE_LIST.REGION_OPERATOR]: 4,
      [ROLE_LIST.APPLICANT]: 4,
    },
  },
  // // Mponitoring
  // {
  //   id: "/monitoring",
  //   label: "Monitoring",
  //   icon: Monitoring,
  //   href: "/monitoring",
  //   allowedRoles: [ROLE_LIST.HEAD, ROLE_LIST.MINISTRY_DXSH_B_B],
  //   order: {
  //     [ROLE_LIST.HEAD]: 1,
  //     [ROLE_LIST.MINISTRY_DXSH_B_B]: 2,
  //   },
  // },
];
