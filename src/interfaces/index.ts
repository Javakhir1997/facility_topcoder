export * from "./authentication.interface";
export * from "./application.interface";
export * from "./announcement.interface"; // Announcement barcha turlari (ExampleData, IPerformer va h.k.)
export * from "./configuration.interface";

// Appeal faylidan faqatgina nomlari to'qnashmaydiganlarini aniq ko'rsatib eksport qilamiz
export type {
  IAppealList,
  IAppealDetail,
  IAppealAnswer,
  IAppealFileGenerate,
} from "./appeal.interface";

// Qolgan umumiy fayllar
export * from "./params.interface";
export * from "./form.interface";
export * from "./yup.interface";
export * from "./investment.interface";
export * from "./electricity.interface";
export * from "./dashboard.inteface";
export * from "./signature.interface";
export * from "./projects.interface";
export * from "./tender.interface";

export * from "./financePlans.interface";
