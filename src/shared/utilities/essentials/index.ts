import {
  ICertificate,
  IFIle,
  IPlanTableDetail,
  IPlanTableItem,
  ISearchParams,
  ISelectOption,
} from "@app/interfaces";
import { STATUS_LIST } from "@app/shared";
import { Chart, Plugin } from "chart.js";
import { TFunction } from "i18next";

const noop = (): void => {};

function getSelectValue(
  options: ISelectOption[],
  value:
    | string
    | number
    | boolean
    | (string | number | boolean)[]
    | undefined
    | null,
): ISelectOption[] | null | ISelectOption {
  if (Array.isArray(value)) {
    return options.filter((item) => value.includes(item.value));
  }
  return options.find((item) => item?.value == value) ?? null;
}

function getSelectLabel(
  options: ISelectOption[],
  value: string | undefined | number,
): string {
  if (!value) return "-";
  return options.find((item) => item?.value == value)?.label.toString() ?? "-";
}

function getCertSelectValue(
  options: {
    value: ICertificate;
    label: string;
  }[],
  value: ICertificate | undefined | null,
): { value: ICertificate; label: string } | null {
  return (
    options.find((item) => {
      return item?.value?.serialNumber == value?.serialNumber;
    }) ?? null
  );
}

const cleanParams = (params: ISearchParams) => {
  const filteredParams: ISearchParams = {};
  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value !== null && value !== undefined && value !== "") {
      filteredParams[key] = value;
    }
  });
  return filteredParams;
};

function arrayToString(input: string[] | undefined | null): string {
  if (!input || input.length === 0) {
    return "";
  }
  if (input.length === 1) {
    return input[0];
  }
  return input.join(", ");
}

function formatString(input: ISelectOption[] | undefined | null): string {
  if (!input || input.length === 0) {
    return "";
  }
  if (input.length === 1) {
    return String(input[0]?.label);
  }
  return input.map((option) => String(option.label)).join(", ");
}

function extractIds(files?: IFIle[] | null): (string | number)[] | null {
  if (!files || files.length === 0) return [];
  return files.map((file) => file.id);
}

function extractValues(files?: ISelectOption[] | null): (string | number)[] {
  if (!files || files.length === 0) return [];
  return files.map((file) => file.value);
}

function convertDateFormat(dateTime: string | null | undefined): string | null {
  if (!dateTime) return null;

  if (dateTime.includes("T")) {
    const date = new Date(dateTime);
    if (isNaN(date.getTime())) return null;

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  const parts = dateTime.split(" ");
  const [day, month, year] = parts[0].split("-");

  if (!day || !month || !year) return null;

  const time = parts[1] ?? "00:00";

  return `${day}.${month}.${year} ${time}`;
}

function generateYearsList(
  startYear?: number,
  endYear?: number,
): ISelectOption[] {
  const currentYear = new Date().getFullYear();

  const start = startYear ?? currentYear;
  const end = endYear ?? start + 100;

  const finalStart = Math.min(start, end);
  const finalEnd = Math.max(start, end);

  const yearsList = [];
  for (let i = finalStart; i <= finalEnd; i++) {
    yearsList.push({
      value: i.toString(),
      label: i.toString(),
    });
  }

  return yearsList;
}

const getPlanTableRows = (
  data: IPlanTableDetail | undefined,
): IPlanTableItem[] => {
  if (data) {
    return [
      {
        indicator:
          "Forecast when the project is implemented by the state partner",
        plan: data.foracast_project_plan,
        fact: data.foracast_project_fact,
        main: true,
        bold: true,
        index: 1,
        status: "new",
      },
      {
        indicator: "Wages (with YAIT)",
        plan: data.foracast_salary_plan,
        fact: data.foracast_salary_fact,
        main: false,
        bold: false,
        index: null,
        status: "new",
      },
      {
        indicator: "Electricity expenses",
        plan: data.foracast_electricity_cost?.cost,
        fact: data.foracast_electricity_cost.report?.cost,
        main: false,
        bold: false,
        edit: data?.id,
        planId: data?.foracast_electricity_cost?.id,
        reportId: data?.foracast_electricity_cost?.report?.id,
        index: null,
        status:
          data.foracast_electricity_cost?.report?.status ?? STATUS_LIST.NEW,
      },
      {
        indicator: "Other expenses (Full and current repair costs)",
        plan: data.foracast_other_cost_plan,
        fact: data.foracast_other_cost_fact,
        main: false,
        bold: false,
        index: null,
        status: "new",
      },
      {
        indicator: "Total income",
        plan: data.total_income_plan,
        fact: data.total_income_fact,
        main: true,
        bold: false,
        index: 2,
        status: "new",
      },
      {
        indicator: "State budget funds",
        plan: data.state_budget_funds_plan,
        fact: data.state_budget_funds_fact,
        main: false,
        bold: false,
        index: null,
        status: "new",
      },
      {
        indicator:
          "Total expenses forecast for project implementation by the private partner",
        plan: data.total_private_partner_cost_plan,
        fact: data.total_private_partner_cost_fact,
        main: true,
        bold: false,
        index: 3,
        status: "new",
      },
      {
        indicator: "Operation (Allocation of budget funds)",
        plan: data.exploitation_cost?.cost,
        fact: data.exploitation_cost?.report?.cost,
        main: false,
        bold: true,
        edit: data?.id,
        planId: data?.exploitation_cost?.id,
        reportId: data?.exploitation_cost?.report?.id,
        index: null,
        status: data.exploitation_cost?.report?.status ?? STATUS_LIST.NEW,
      },
      {
        indicator: "Wages",
        plan: data.exploitation_salary?.cost,
        fact: data.exploitation_salary?.report?.cost,
        main: false,
        edit: data?.id,
        planId: data?.exploitation_salary?.id,
        reportId: data?.exploitation_salary?.report?.id,
        bold: false,
        index: null,
        status: data.exploitation_salary?.report?.status ?? STATUS_LIST.NEW,
      },
      {
        indicator: "Electricity expenses",
        plan: data.exploitation_electricity_cost?.cost,
        fact: data.exploitation_electricity_cost?.report?.cost,
        edit: data?.id,
        planId: data?.exploitation_electricity_cost?.id,
        reportId: data?.exploitation_electricity_cost?.report?.id,
        main: false,
        bold: false,
        index: null,
        status:
          data.exploitation_electricity_cost?.report?.status ?? STATUS_LIST.NEW,
      },
      {
        indicator: "Full repair",
        plan: data.exploitation_full_repair?.cost,
        fact: data.exploitation_full_repair?.report?.cost,
        main: false,
        edit: data?.id,
        planId: data?.exploitation_full_repair?.id,
        reportId: data?.exploitation_full_repair?.report?.id,
        bold: false,
        index: null,
        status:
          data.exploitation_full_repair?.report?.status ?? STATUS_LIST.NEW,
      },
      {
        indicator: "Current repair",
        plan: data.exploitation_current_repair?.cost,
        fact: data.exploitation_current_repair?.report?.cost,
        main: false,
        edit: data?.id,
        planId: data?.exploitation_current_repair?.id,
        reportId: data?.exploitation_current_repair?.report?.id,
        bold: false,
        index: null,
        status:
          data.exploitation_current_repair?.report?.status ?? STATUS_LIST.NEW,
      },
      {
        indicator: "Other expenses",
        plan: data.exploitation_other_cost?.cost,
        fact: data.exploitation_other_cost?.report?.cost,
        main: false,
        edit: data?.id,
        planId: data?.exploitation_other_cost?.id,
        reportId: data?.exploitation_other_cost?.report?.id,
        bold: false,
        index: null,
        status: data.exploitation_other_cost?.report?.status ?? STATUS_LIST.NEW,
      },
      {
        indicator: "Investment funds contributed by the private partner",
        plan: data.investment_funds?.cost,
        fact: data.investment_funds?.report?.cost,
        main: false,
        edit: data?.id,
        planId: data?.investment_funds?.id,
        reportId: data?.investment_funds?.report?.id,
        bold: true,
        index: null,
        status: data.investment_funds?.report?.status ?? STATUS_LIST.NEW,
      },
      {
        indicator: "Balance (Profit/Loss)",
        plan: data.balance_profit_loss_plan,
        fact: data.balance_profit_loss_fact,
        main: true,
        bold: false,
        index: 4,
        status: "new",
      },
      {
        indicator: "Savings on budget funds",
        plan: data.budget_savings_plan,
        fact: data.budget_savings_fact,
        main: true,
        bold: false,
        index: 5,
        status: "new",
      },
      {
        indicator: "Investment fund recovery",
        plan: data.investment_recovery_plan,
        fact: data.investment_recovery_fact,
        main: false,
        bold: false,
        index: null,
        status: "new",
      },
      {
        indicator: "Total profit",
        plan: data.total_profit_plan,
        fact: data.total_profit_fact,
        main: true,
        bold: false,
        index: 6,
        status: "new",
      },
    ];
  }
  return [];
};

function formatToMillion(
  value: string | number | null | undefined,
  precision: number = 2,
): string | null {
  if (!value || isNaN(Number(value))) {
    return null;
  }
  return (Number(value) / 1_000_000).toFixed(precision);
}

function formatToThousand(
  value: string | number | null | undefined,
  precision: number = 2,
): string | null {
  if (!value || isNaN(Number(value))) {
    return null;
  }
  return (Number(value) / 1_000).toFixed(precision);
}

const transformYearsToOptions = (
  years: number[],
): { value: string; label: string }[] => {
  return years.map((year) => ({
    value: year.toString(),
    label: year.toString(),
  }));
};

const centerTextPlugin = (t?: TFunction<"translation", undefined>): Plugin => {
  return {
    id: "centerText",
    beforeDraw: (chart: Chart) => {
      const {
        ctx,
        chartArea: { left, right, top, bottom },
      } = chart;
      const total = chart.data?.datasets[0]?.data?.reduce((acc, value) => {
        if (acc) return (acc as number) + (value as number);
        return value;
      }, 0);
      ctx.save();
      const x = (left + right) / 2;
      const y = (top + bottom) / 2;

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.font = "400 1rem Inter-Regular";
      ctx.fillStyle = "#A5A3A9";
      if (t) {
        ctx.fillText(t("All"), x, y + 13);
      }

      ctx.font = "700 1.5rem Inter-Bold";
      ctx.fillStyle = "#1D1929";
      ctx.fillText(`${!total ? "0" : total?.toString()}`, x, y - 13);

      ctx.restore();
    },
  };
};

const getStatusesLabels = (
  t?: TFunction<"translation">,
  arr?: ISelectOption[],
): string[] => {
  return arr?.map((i) => (t ? t(i.label as string) : "")) ?? [];
};

function getLabelsFromIds(
  ids: string | number | (string | number)[],
  options: ISelectOption[],
): string {
  const idArray = Array.isArray(ids) ? ids : [ids];

  const labels = idArray
    .map((id) => {
      const match = options.find((option) => option.value == id);
      return match ? match.label : "";
    })
    .filter((label) => label);

  return labels.join(", ");
}

function getTodayAsString(): number {
  const today = new Date();
  return today.getDate();
}

function getMonthInRussian(): string {
  const russianMonths = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  const today = new Date();
  const monthIndex = today.getMonth();
  return russianMonths[monthIndex];
}

function ensureHttps(
  url: string | undefined | null,
): string | undefined | null {
  if (url?.startsWith("http://")) {
    return url.replace("http://", "https://");
  }
  return url;
}

export {
  noop,
  cleanParams,
  getSelectValue,
  getSelectLabel,
  arrayToString,
  extractIds,
  formatString,
  convertDateFormat,
  extractValues,
  generateYearsList,
  getPlanTableRows,
  formatToMillion,
  transformYearsToOptions,
  formatToThousand,
  centerTextPlugin,
  getStatusesLabels,
  getCertSelectValue,
  getLabelsFromIds,
  getTodayAsString,
  getMonthInRussian,
  ensureHttps,
};
