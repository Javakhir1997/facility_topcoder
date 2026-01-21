enum ROLE_LIST {
  APPLICANT = "entrepreneur", //Tadbirkor
  BASIN_B_B = "basin_b_b", // Xavza boshqarma boshlig'i
  BALANCE = "balance", //Balans tashkilot
  MINISTRY_DXSH_B_X = "ministry_dxsh_b_x", //DXSH viloyat xodimi
  REGION_OPERATOR = "region_dxsh", //Hududiy DXSH
  MINISTRY_DXSH_B_B = "ministry_dxsh_b_b", //DXSH viloyat boshligi
  MINISTRY_M_B_B = "ministry_m_b_b", //DXSH Xodimi markaziy
  OPERATOR = "operator", //Ma'sul bo'lim DXSH xodimi
  DEPUTY_MINISTRY = "deputy_ministry", //Vazir o'rinbosari
  MINISTRY = "ministry", //Vazirlik
  MINISTRY_FINANCE = "ministry_finance", //Moliya Dxsh
  FINANCE_EMPLOYEE = "finance_operator", //Moliya bo'limi xodimi
  HEAD = "director", // Ma'sul bo'lim DXSH boshligi
  ADMIN = "admin",
  USER = "user",
}

const ROLE_LABEL: Record<ROLE_LIST, string> = {
  [ROLE_LIST.ADMIN]: "Admin",
  [ROLE_LIST.USER]: "System admin",
  [ROLE_LIST.APPLICANT]: "Entrepreneur",
  [ROLE_LIST.REGION_OPERATOR]: "Region DXSH",
  [ROLE_LIST.BALANCE]: "Balance organization",
  [ROLE_LIST.BASIN_B_B]: "Basin department head",
  [ROLE_LIST.MINISTRY_DXSH_B_B]: "Ministry DXSH department head",
  [ROLE_LIST.MINISTRY_DXSH_B_X]: "Operator",
  [ROLE_LIST.MINISTRY_M_B_B]: "Operator",
  [ROLE_LIST.DEPUTY_MINISTRY]: "Operator",
  [ROLE_LIST.MINISTRY]: "Operator",
  [ROLE_LIST.MINISTRY_FINANCE]: "Operator",
  [ROLE_LIST.OPERATOR]: "Operator",
  [ROLE_LIST.HEAD]: "Head",
  [ROLE_LIST.FINANCE_EMPLOYEE]: "Finance employee",
};

export { ROLE_LIST, ROLE_LABEL };
