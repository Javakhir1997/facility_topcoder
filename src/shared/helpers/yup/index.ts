import * as yup from "yup";

const addProjectPassportScheme = yup.object().shape({
  region: yup.number().required("This field is required"),
  districts: yup
    .array()
    .of(yup.number())
    .min(1, "You have to select at least one value")
    .required("This field is required"),
  owner_organization: yup.number().required("This field is required"),
  object: yup
    .array()
    .of(yup.number())
    .min(1, "You have to select at least one value")
    .required("This field is required"),
  private_partner: yup.string().required("This field is required"),
  stir: yup
    .string()
    .trim()
    .required("This field is required")
    .length(9, "The entered data is not valid"),
  registry_number: yup
    .string()
    .max(20, "Registry number should not be longer than 20")
    .required("This field is required"),
  interval_years: yup
    .string()
    .required("This field is required")
    .matches(
      /^\d{4}-\d{4}$/,
      "The year format must be correct. For instance: 2022-2023"
    ),
  contract_term: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? undefined : value
    )
    .typeError("The year must be a number")
    .min(1, "The year must be greater than zero")
    .required("This field is required"),
  project_price: yup.string().required("This field is required"),
  status: yup.boolean(),
});

const addProjectFilesScheme = yup.object().shape({
  files: yup.array().of(
    yup.object().shape({
      file: yup.mixed().nullable().required("File is required"),
    })
  ),
});

const projectPlanScheme = yup.object().shape({
  plans: yup.array().of(
    yup.object().shape({
      object: yup.string().required("This field is required"),
      object_type: yup.number().required("This field is required"),
      report: yup.array().of(
        yup.object().shape({
          plan: yup.string().required("This field is required"),
          price: yup.string().required("This field is required"),
          date: yup
            .number()
            .typeError("Date must be a number")
            .required("This field is required")
            .min(2001, "Year must be greater than 2000")
            .max(2999, "Year must be less than 3000")
            .test(
              "len",
              "Year must be 4 digits",
              (val) => val !== null && val.toString().length === 4
            ),
        })
      ),
    })
  ),
});

const currentInvestmentScheme = yup.object().shape({
  investments: yup.array().of(
    yup.object().shape({
      object: yup.string().required("This field is required"),
      report: yup.array().of(
        yup.object().shape({
          fact: yup.string().required("This field is required"),
          price: yup.string().required("This field is required"),
          date: yup
            .string()
            .required("Date is required")
            .matches(
              /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/,
              "Date must be in dd-mm-yyyy format"
            ),
          file: yup.mixed().nullable().required("File is required").nullable(),
        })
      ),
    })
  ),
});

const additionalInvestmentScheme = yup.object().shape({
  additionalInvestments: yup.array().of(
    yup.object().shape({
      object: yup.string().required("This field is required"),
      report: yup.array().of(
        yup.object().shape({
          addition: yup.string().required("This field is required"),
          price: yup.string().required("This field is required"),
          date: yup
            .string()
            .required("Date is required")
            .matches(
              /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/,
              "Date must be in yyyy-mm-dd format"
            ),
          file: yup.mixed().nullable().required("File is required").nullable(),
        })
      ),
    })
  ),
});

const monitoringScheme = yup.object().shape({
  items: yup.array().of(
    yup.object().shape({
      date: yup
        .string()
        .required("Date is required")
        .matches(
          /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/,
          "Date must be in yyyy-mm-dd format"
        ),
      file: yup.mixed().nullable().required("File is required").nullable(),
      comment: yup.string().required("This field is required"),
    })
  ),
});

const projectScheme = yup.object().shape({
  name: yup.string().required("This field is required"),
  type: yup.number().required("This field is required"),
  owner_organization: yup.number().required("This field is required"),
  district: yup
    .array()
    .min(1, "You have to select at least one value")
    .required("This field is required"),
  address: yup.string().required("This field is required"),
});
const loginSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required("This field is required")
    .min(5, "Username must be at least 5 characters long")
    .max(20, "Username must not exceed 20 characters"),
  password: yup
    .string()
    .trim()
    .required("This field is required")
    .min(8, "Password must be at least 8 characters long")
    .max(30, "Password must not exceed 30 characters"),
});

const appealSchema = (t: (key: string) => string) =>
  yup.object().shape({
    owner_type: yup.string().required(t("form.required")),

    stir: yup.string().when("owner_type", {
      is: "yuridik",
      then: (schema) =>
        schema
          .required(t("form.required"))
          .length(9, t("form.stir_length_error")),
      otherwise: (schema) => schema.notRequired(),
    }),
    company_name: yup.string().when("owner_type", {
      is: "yuridik",
      then: (schema) => schema.required(t("form.required")),
      otherwise: (schema) => schema.notRequired(),
    }),

    lastname: yup.string().when("owner_type", {
      is: "jismoniy",
      then: (schema) => schema.required(t("form.required")),
      otherwise: (schema) => schema.notRequired(),
    }),
    firstname: yup.string().when("owner_type", {
      is: "jismoniy",
      then: (schema) => schema.required(t("form.required")),
      otherwise: (schema) => schema.notRequired(),
    }),
    middle_name: yup.string().notRequired(),
    pinfl: yup.string().when("owner_type", {
      is: "jismoniy",
      then: (schema) =>
        schema
          .required(t("form.required"))
          .length(14, t("form.pinfl_length_error")),
      otherwise: (schema) => schema.notRequired(),
    }),
    objects: yup.array().required("This field is required"),
    passport_seria: yup.string().when("owner_type", {
      is: "jismoniy",
      then: (schema) =>
        schema
          .required(t("form.required"))
          .length(2, t("form.passport_seria_length_error")),
      otherwise: (schema) => schema.notRequired(),
    }),
    passport_number: yup.string().when("owner_type", {
      is: "jismoniy",
      then: (schema) =>
        schema
          .required(t("form.required"))
          .length(7, t("form.passport_number_length_error")),
      otherwise: (schema) => schema.notRequired(),
    }),

    address: yup.string().required(t("form.required")),
    object_type: yup.array().required("This field is required"),
    balance_organization: yup.array().required("This field is required"),
    phone: yup.string().required(t("form.required")),
    email: yup.string().email(t("form.email")).required(t("form.required")),
    region: yup.string().required("This field is required"),
    district: yup.string().required("This field is required"),
    activity_type: yup.string().required("This field is required"),
    activity_experience: yup
      .number()
      .typeError(t("form.number"))
      .required(t("form.required"))
      .min(0),
    indebtedness_file: yup
      .object()
      .shape({
        name: yup.string().required("This field is required"),
        file: yup.string().required("This field is required"),
        id: yup.number().required("This field is required"),
      })
      .nullable()
      .test("This field is required", (value) => {
        if (!value || !value.id) {
          return false;
        } else {
          return true;
        }
      })
      .optional(),
    stability_rating: yup.string().required("This field is required"),
    success_projects: yup.string().required(t("form.required")),
    success_projects_file: yup
      .object()
      .shape({
        name: yup.string().optional(),
        file: yup.string().optional(),
        id: yup.number().optional(),
      })
      .nullable()
      .optional(),
    investment_ability: yup
      .number()
      .typeError(t("form.number"))
      .required(t("form.required"))
      .min(0),
    techniques: yup.string().required("This field is required"),
    financing_opportunity: yup.string().required("This field is required"),
    return_on_investment: yup.string().required(t("form.required")),
    indebtedness: yup.string().required(t("form.required")),
    body: yup.string().required(t("form.required")),
  });
const tenderWinnerSchema = (t: (key: string) => string) =>
  yup.object().shape({
    // 1. Protokol fayli majburiy bo'lishi kerak (agar shunday bo'lsa)
    protocol: yup.mixed().nullable().required(t("Fayl yuklash majburiy")),

    // 2. G'olib (Winner) majburiy va u raqam (ID) bo'ladi
    winner: yup
      .string()
      .typeError(t("G'olibni tanlash majburiy buldi")) // Agar null kelsa shu xato chiqadi
      .required(t("G'olibni tanlash majburiy buldi ")),

    // 3. Vitse-g'olib (Vice Winner) ixtiyoriy, LEKIN tanlansa G'olib bilan bir xil bo'lmasligi kerak
    vice_winner: yup
      .string()
      .nullable()
      .notRequired()
      .notOneOf(
        [yup.ref("winner")],
        t("G'olib va Vitse-g'olib bir xil bo'lishi mumkin emas")
      ),
  });

const operatorReplySchema = yup.object().shape({
  responseType: yup.string().required("This field is required"),
  // responseDate: yup.string().required("This field is required"),
  responseText: yup.string().required("This field is required"),
  files: yup.array().required("This field is required"),
});

const operatorReturnSchema = yup.object().shape({
  responseText: yup.string().required("This field is required"),
  files: yup.array().nullable(),
});

const sentSchema = yup.object().shape({
  files: yup.array().required("This field is required"),
});

const returnSchema = yup.object().shape({
  comment: yup.string().required("This field is required"),
});

// Applications

const applicationSchema = yup.object().shape({
  name: yup.string().trim().required("This field is required"),
  cost: yup.string().trim().required("This field is required"),
  startDate: yup.string().required("This field is required"),
  endDate: yup.string().required("This field is required"),
  files: yup.array().required("This field is required"),
  content: yup.string().trim().required("This field is required"),
  // project_name: yup.string().trim().required('This field is required'),
  project_type: yup.string().trim().required("This field is required"),
  volume_work: yup.string().trim().required("This field is required"),
  description_documents_list: yup
    .string()
    .trim()
    .required("This field is required"),
  point3_1: yup.string().trim().required("This field is required"),
  point3_2: yup.string().trim().required("This field is required"),
  point3_3: yup.string().trim().required("This field is required"),
  point3_4: yup.string().trim().required("This field is required"),
  point3_5_a: yup.string().trim().required("This field is required"),
  point3_5_b: yup.string().trim().required("This field is required"),
  point3_5_v: yup.string().trim().required("This field is required"),
  point3_5_g: yup.string().trim().required("This field is required"),
  point3_5_d: yup.string().trim().required("This field is required"),
  point3_6_a: yup.number().required("This field is required"),
  point3_6_b_0: yup.string().trim().required("This field is required"),
  point3_6_b: yup.number().required("This field is required"),
  point3_7: yup.number().required("This field is required"),
  point3_8_1: yup.number().required("This field is required"),
  point3_8_2: yup.number().required("This field is required"),
  point3_8_3: yup.number().required("This field is required"),
  point3_8_4: yup.number().required("This field is required"),
  point3_8_5: yup.number().required("This field is required"),
  point3_8_6: yup.number().required("This field is required"),
  point3_8_7: yup.number().required("This field is required"),
  point3_8_8: yup.number().required("This field is required"),
  point3_8_9: yup.number().required("This field is required"),
  point3_8_10: yup.number().required("This field is required"),
  point3_8_11: yup.number().required("This field is required"),
  point3_8_12: yup.number().required("This field is required"),
  point3_8_13: yup.number().required("This field is required"),
  point3_8_14: yup.number().required("This field is required"),
  point3_8_15: yup.number().required("This field is required"),
  point3_8_16: yup.number().required("This field is required"),
  point3_8_17: yup.number().required("This field is required"),
  point3_8_18: yup.number().required("This field is required"),
  point3_8_19: yup.number().required("This field is required"),
  point3_8_20: yup.number().required("This field is required"),
  point3_8_21: yup.number().required("This field is required"),
  point3_8_22: yup.number().required("This field is required"),
  point3_8_23: yup.number().required("This field is required"),
  point3_9_a: yup.string().trim().required("This field is required"),
  point3_9_b: yup.string().trim().required("This field is required"),
  point3_9_v: yup.string().trim().required("This field is required"),
  point3_9_d: yup.string().trim().required("This field is required"),
  point3_9_e: yup.string().trim().required("This field is required"),
  point3_9_g: yup.string().trim().required("This field is required"),
  point3_10_comment: yup.string().trim().required("This field is required"),
  point3_11_comment: yup.string().trim().required("This field is required"),
  point3_12_comment: yup.string().trim().required("This field is required"),
  point3_13: yup.string().trim().required("This field is required"),
  point3_14: yup.string().trim().required("This field is required"),
  point3_15: yup.string().trim().required("This field is required"),
  point3_16: yup.string().trim().required("This field is required"),
  point3_17: yup.string().trim().required("This field is required"),
  point3_18_a: yup.string().trim().required("This field is required"),
  point3_18_b: yup.string().trim().required("This field is required"),
});

// confirm application

const confirmApplicationSchema = yup.object().shape({
  responsibility: yup
    .array()
    .of(
      yup.object({
        id: yup.string(),
        deadline: yup.string(),
      })
    )
    .required("This field is required"),
});

// Investments
const investmentsPlanSchema = yup.object().shape({
  foracast_electricity_cost: yup
    .string()
    .trim()
    .required("This field is required"),
  exploitation_cost: yup.string().trim().required("This field is required"),
  exploitation_salary: yup.string().trim().required("This field is required"),
  exploitation_electricity_cost: yup
    .string()
    .trim()
    .required("This field is required"),
  exploitation_full_repair: yup
    .string()
    .trim()
    .required("This field is required"),
  exploitation_current_repair: yup
    .string()
    .trim()
    .required("This field is required"),
  exploitation_other_cost: yup
    .string()
    .trim()
    .required("This field is required"),
  investment_funds: yup.string().trim().required("This field is required"),
  year: yup.string().required("This field is required"),
});

const addReportSchema = yup.object().shape({
  cost: yup.string().trim().required("This field is required"),
  description: yup.string().trim().required("This field is required"),
  files: yup.array().required("This field is required"),
});

// Electricity
const electricityPlanSchema = yup.object().shape({
  electricity_capacity: yup.string().trim().required("This field is required"),
  year: yup.string().required("This field is required"),
});

const electricityReportSchema = yup.object().shape({
  electricity_capacity: yup.string().trim().required("This field is required"),
  description: yup.string().trim().required("This field is required"),
  files: yup.array().required("This field is required"),
});

// Concept
const conceptSchema = yup.object().shape({
  project_name: yup.string().trim().required("This field is required"),
  project_type: yup.string().trim().required("This field is required"),
  volume_work: yup.string().trim().required("This field is required"),
  description_documents_list: yup
    .string()
    .trim()
    .required("This field is required"),
  point3_1: yup.string().trim().required("This field is required"),
  point3_2: yup.string().trim().required("This field is required"),
  point3_3: yup.string().trim().required("This field is required"),
  point3_4: yup.string().trim().required("This field is required"),
  point3_5_a: yup.string().trim().required("This field is required"),
  point3_5_b: yup.string().trim().required("This field is required"),
  point3_5_v: yup.string().trim().required("This field is required"),
  point3_5_g: yup.string().trim().required("This field is required"),
  point3_5_d: yup.string().trim().required("This field is required"),
  point3_6_a: yup.number().required("This field is required"),
  point3_6_b_0: yup.string().trim().required("This field is required"),
  point3_6_b: yup.number().required("This field is required"),
  point3_7: yup.number().required("This field is required"),
  point3_8_1: yup.number().required("This field is required"),
  point3_8_2: yup.number().required("This field is required"),
  point3_8_3: yup.number().required("This field is required"),
  point3_8_4: yup.number().required("This field is required"),
  point3_8_5: yup.number().required("This field is required"),
  point3_8_6: yup.number().required("This field is required"),
  point3_8_7: yup.number().required("This field is required"),
  point3_8_8: yup.number().required("This field is required"),
  point3_8_9: yup.number().required("This field is required"),
  point3_8_10: yup.number().required("This field is required"),
  point3_8_11: yup.number().required("This field is required"),
  point3_8_12: yup.number().required("This field is required"),
  point3_8_13: yup.number().required("This field is required"),
  point3_8_14: yup.number().required("This field is required"),
  point3_8_15: yup.number().required("This field is required"),
  point3_8_16: yup.number().required("This field is required"),
  point3_8_17: yup.number().required("This field is required"),
  point3_8_18: yup.number().required("This field is required"),
  point3_8_19: yup.number().required("This field is required"),
  point3_8_20: yup.number().required("This field is required"),
  point3_8_21: yup.number().required("This field is required"),
  point3_8_22: yup.number().required("This field is required"),
  point3_8_23: yup.number().required("This field is required"),
  point3_9_a: yup.string().trim().required("This field is required"),
  point3_9_b: yup.string().trim().required("This field is required"),
  point3_9_v: yup.string().trim().required("This field is required"),
  point3_9_d: yup.string().trim().required("This field is required"),
  point3_9_e: yup.string().trim().required("This field is required"),
  point3_9_g: yup.string().trim().required("This field is required"),
  point3_10_comment: yup.string().trim().required("This field is required"),
  point3_11_comment: yup.string().trim().required("This field is required"),
  point3_12_comment: yup.string().trim().required("This field is required"),
  point3_13: yup.string().trim().required("This field is required"),
  point3_14: yup.string().trim().required("This field is required"),
  point3_15: yup.string().trim().required("This field is required"),
  point3_16: yup.string().trim().required("This field is required"),
  point3_17: yup.string().trim().required("This field is required"),
  point3_18_a: yup.string().trim().required("This field is required"),
  point3_18_b: yup.string().trim().required("This field is required"),
});

export {
  loginSchema,
  appealSchema,
  operatorReplySchema,
  returnSchema,
  operatorReturnSchema,
  applicationSchema,
  sentSchema,
  investmentsPlanSchema,
  addReportSchema,
  electricityPlanSchema,
  electricityReportSchema,
  conceptSchema,
  addProjectPassportScheme,
  addProjectFilesScheme,
  projectPlanScheme,
  currentInvestmentScheme,
  additionalInvestmentScheme,
  monitoringScheme,
  projectScheme,
  confirmApplicationSchema,
  tenderWinnerSchema,
};
