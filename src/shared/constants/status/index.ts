enum STATUS_LIST {
    ALL = "all", // Бачаси
    ACCEPTED = "accepted", // Қабул қилинди
    SENT_TO_MOF = "in_MoF", // Молия вазирлигига юборилди
    RESPONSE_IN_PROGRESS = "negotiated", // Жавоб хати келишишда
    RESPONSE_RECEIVED = "RESPONSE_RECEIVED", // Жавоб келган
    RETURNED = "returned", // Қайтариб юборилган
    RESPONSE_SENT = "RESPONSE_SENT", // Жавоб юборилган
    IN_PROGRESS = "in_progress", // Ўрганишда
    DELETED = "DELETED", // Ўчирилган
    NEW = "new", // Янги
    APPROVED = "approved", // Тасдиқланган
    REJECTED = "rejected", // Рад этилган
    POSITIVE = "positive", // Ижобий
    NEGATIVE = "negative", // Салбий
    FIRST_TIME = "first", // Биринчи марта
    REPEATED = "repetitive", // Такрорий
    INCOMPLETE = "INCOMPLETE", // Тугалланмаган
    PENDING_APPROVAL = "PENDING_APPROVAL", // Тасдиқлашда
    RETURNED_TO_CORRECTION = "RETURNED_TO_CORRECTION", // Қайта тузатиш учун қайтариб юборилган
    SENT = "SENT", // Юборилган
    APPLICATION_RETURNED = "APPLICATION_RETURNED", // Ариза қайтариб юборилган

    RESPONSE_PENDING = "RESPONSE_PENDING", // Жавоб кутиляпти
    IN_REVIEW = "IN_REVIEW", // Ўрганилаяпти
    CANCELED = "CANCELED", // Бекор қилинган
    MONITORING = "MONITORING", // Мониторинг
    IN_PROCES = "in_proces",
    COMPLETED = "completed", // Якунланган
    WAITING = "waiting"
}

const STATUS_LABEL: { [key: string]: string } = {
    [STATUS_LIST.ALL]: "All", // Бачаси
    [STATUS_LIST.ACCEPTED]: "accepted", // Қабул қилинди
    [STATUS_LIST.SENT_TO_MOF]: "Sent to Ministry of Finance", // Молия Вазирлигига юборилди
    [STATUS_LIST.RESPONSE_IN_PROGRESS]: "Response in Progress", // Жавоб хати келишишда
    [STATUS_LIST.RESPONSE_RECEIVED]: "Response Received", // Жавоб келган
    [STATUS_LIST.RETURNED]: "Returned", // Қайтариб юборилган
    [STATUS_LIST.RESPONSE_SENT]: "Response Sent", // Жавоб юборилган
    [STATUS_LIST.IN_PROGRESS]: "Under Review", // Ўрганишда
    [STATUS_LIST.DELETED]: "Deleted", // Ўчирилган
    [STATUS_LIST.NEW]: "new", // Янги
    [STATUS_LIST.APPROVED]: "Approved", // Тасдиқланган
    [STATUS_LIST.REJECTED]: "rejected", // Рад этилган
    [STATUS_LIST.POSITIVE]: "Positive", // Ижобий
    [STATUS_LIST.NEGATIVE]: "Negative", // Салбий
    [STATUS_LIST.FIRST_TIME]: "First Time", // Биринчи марта
    [STATUS_LIST.REPEATED]: "Repeated", // Такрорий
    [STATUS_LIST.INCOMPLETE]: "Incomplete", // Тугалланмаган
    [STATUS_LIST.PENDING_APPROVAL]: "Pending Approval", // Тасдиқлашда
    [STATUS_LIST.RETURNED_TO_CORRECTION]: "Returned to Correction", // Қайта тузатиш учун қайтариб юборилган
    [STATUS_LIST.SENT]: "Sent", // Юборилган
    [STATUS_LIST.APPLICATION_RETURNED]: "Application Returned", // Ариза қайтариб юборилган
    [STATUS_LIST.COMPLETED]: "Completed", // Якунланган
    [STATUS_LIST.RESPONSE_PENDING]: "Response Pending", // Жавоб кутиляпти
    [STATUS_LIST.IN_REVIEW]: "In Review", // Ўрганилаяпти
    [STATUS_LIST.CANCELED]: "Canceled", // Бекор қилинган
    [STATUS_LIST.MONITORING]: "Monitoring", // Мониторинг
    [STATUS_LIST.IN_PROCES]: "in_proces", // Мониторинг
    [STATUS_LIST.WAITING]: "waiting" // Мониторинг
};




const STATUS_COLOR_LIST = {
  [STATUS_LIST.ALL]: {
    background: "var(--color-gray-light-2)",
    color: "var(--color-gray-4)",
  }, // Бачаси
  [STATUS_LIST.ACCEPTED]: {
    background: "var(--color-green-light-1)",
    color: "var(--color-green-1)",
  }, // Қабул қилинди
  [STATUS_LIST.SENT_TO_MOF]: {
    background: "var(--color-blue-light-2)",
    color: "var(--color-blue-1)",
  }, // Молия Вазирлигига юборилди
  [STATUS_LIST.RESPONSE_IN_PROGRESS]: {
    background: "var(--color-orange-light-1)",
    color: "var(--color-orange-1)",
  }, // Жавоб хати келишишда
  [STATUS_LIST.RESPONSE_RECEIVED]: {
    background: "var(--color-green-light-1)",
    color: "var(--color-green-1)",
  }, // Жавоб келган
  [STATUS_LIST.RETURNED]: {
    background: "var(--color-red-light-1)",
    color: "var(--color-red-1)",
  }, // Қайтариб юборилган
  [STATUS_LIST.RESPONSE_SENT]: {
    background: "var(--color-green-light-1)",
    color: "var(--color-green-1)",
  }, // Жавоб юборилган
  [STATUS_LIST.IN_PROCES]: {
    background: "var(--color-blue-light-1)",
    color: "var(--color-blue-1)",
  }, // Ўрганишда
  [STATUS_LIST.DELETED]: {
    background: "var(--color-red-light-1)",
    color: "var(--color-red-1)",
  }, // Ўчирилган
  [STATUS_LIST.NEW]: {
    background: "var(--color-blue-100)",
    color: "var(--color-blue-400)",
  }, // Янги
  [STATUS_LIST.APPROVED]: {
    background: "var(--color-green-light-1)",
    color: "var(--color-green-1)",
  }, // Тасдиқланган
  [STATUS_LIST.REJECTED]: {
    background: "var(--color-red-light-1)",
    color: "var(--color-red-1)",
  }, // Рад этилган
  [STATUS_LIST.POSITIVE]: {
    background: "var(--color-green-light-1)",
    color: "var(--color-green-1)",
  }, // Ижобий
  [STATUS_LIST.NEGATIVE]: {
    background: "var(--color-red-light-1)",
    color: "var(--color-red-1)",
  }, // Салбий
  [STATUS_LIST.FIRST_TIME]: {
    background: "var(--color-gray-light-1)",
    color: "var(--color-gray-4)",
  }, // Биринчи марта
  [STATUS_LIST.REPEATED]: {
    background: "var(--color-orange-light-1)",
    color: "var(--color-orange-1)",
  }, // Такрорий
  [STATUS_LIST.INCOMPLETE]: {
    background: "var(--color-gray-light-1)",
    color: "var(--color-gray-4)",
  }, // Тугалланмаган
  [STATUS_LIST.PENDING_APPROVAL]: {
    background: "var(--color-blue-light-2)",
    color: "var(--color-blue-1)",
  }, // Тасдиқлашда
  [STATUS_LIST.RETURNED_TO_CORRECTION]: {
    background: "var(--color-red-light-2)",
    color: "var(--color-red-1)",
  }, // Қайта тузатиш учун қайтариб юборилган
  [STATUS_LIST.SENT]: {
    background: "var(--color-orange-light-1)",
    color: "var(--color-orange-1)",
  }, // Юборилган
  [STATUS_LIST.APPLICATION_RETURNED]: {
    background: "var(--color-red-light-1)",
    color: "var(--color-red-1)",
  }, // Ариза қайтариб юборилган
  [STATUS_LIST.COMPLETED]: {
    background: "var(--color-green-light-1)",
    color: "var(--color-green-1)",
  }, // Якунланган
  [STATUS_LIST.RESPONSE_PENDING]: {
    background: "var(--color-orange-light-1)",
    color: "var(--color-orange-1)",
  }, // Жавоб кутиляпти
  [STATUS_LIST.IN_REVIEW]: {
    background: "var(--color-blue-light-1)",
    color: "var(--color-blue-1)",
  }, // Ўрганилаяпти
  [STATUS_LIST.CANCELED]: {
    background: "var(--color-gray-light-1)",
    color: "var(--color-gray-3)",
  }, // Бекор қилинган
  [STATUS_LIST.MONITORING]: {
    background: "var(--color-gray-light-1)",
    color: "var(--color-gray-3)",
  }, // Мониторинг
};

export {
    STATUS_COLOR_LIST,
    STATUS_LABEL,
    STATUS_LIST,
};
