import React from "react";
import { Add } from "@app/assets";
import {
  PageLayout,
  ShowIf,
  PageTitle,
  Button,
  Restricted,
} from "@components/index";
import { ROLE_LIST } from "@app/shared";
import { useTranslation } from "react-i18next";
import { getFinansByDealId } from "@modules/finansPlans/hooks";

const months = [
  { label: "Jami", key: "jami1" },
  { label: "yanvar", key: "yanvar" },
  { label: "fevral", key: "fevral" },
  { label: "mart", key: "mart" },
  { label: "Jami", key: "jami2" },
  { label: "aprel", key: "aprel" },
  { label: "may", key: "may" },
  { label: "iyun", key: "iyun" },
  { label: "Jami", key: "jami3" },
  { label: "iyul", key: "iyul" },
  { label: "avgust", key: "avgust" },
  { label: "sentabr", key: "sentabr" },
  { label: "Jami", key: "jami4" },
  { label: "oktabr", key: "oktabr" },
  { label: "noyabr", key: "noyabr" },
  { label: "dekabr", key: "dekabr" },
];

const rows = [
  { id: 1, name: "Ish haqi", unit: "ming.so'm", jami: 1635.5 },
  { id: 2, name: "Ajratma (YIT) (12%)", unit: "ming.so'm", jami: 0 },
  { id: 2.1, name: "- Ishlchilar soni", unit: "dona", jami: 0 },
  { id: 3, name: "Elektr energiya", unit: "ming.so'm", jami: 0 },
  { id: 3.1, name: "- 1 kVt norxi (tarifи)", unit: "so'm", jami: 0 },
  { id: 3.2, name: "- elektektr energiya linatti", unit: "ming.kVt", jami: 0 },
  { id: 4, name: "Jo'iy ta'mirlash xarajat", unit: "ming.so'm", jami: 0 },
  { id: 5, name: "To'lig ta'mirlash xarajati", unit: "ming.so'm", jami: 0 },
  {
    id: 6,
    name: "Yoqilg'i moylash materiallari xarajati",
    unit: "ming.so'm",
    jami: 0,
  },
  { id: 7, name: "Transport xarajati", unit: "ming.so'm", jami: 0 },
  { id: 8, name: "Boshqa xarajatlar", unit: "ming.so'm", jami: 0 },
  {
    id: 9,
    name: "Kiriti igan investitsiyalarni budjetdan qoplab berilishi",
    unit: "ming.so'm",
    jami: 0,
  },
];

const term = [
  {
    label: "1-Chorak",
    key: "1-chorak",
    colspan: 4,
  },
  {
    label: "2-Chorak",
    key: "2-chorak",
    colspan: 4,
  },
  {
    label: "3-Chorak",
    key: "3-chorak",
    colspan: 4,
  },
  {
    label: "4-Chorak",
    key: "4-chorak",
    colspan: 4,
  },
];

const FinansPlansDetails: React.FC<{}> = () => {
  const { t } = useTranslation();
  const { data, isPending } = getFinansByDealId();

  return (
    <PageLayout>
      <div className="d-flex flex-column gap-10 bg-white rounded-xl px-6">
        <PageTitle title={t("Finans Plans Details")}>
          <Restricted permittedRole={ROLE_LIST.APPLICANT}>
            <Button icon={<Add />} navigate="/finans/add">
              Create Finans Plan
            </Button>
          </Restricted>
        </PageTitle>
      </div>

      <ShowIf show={!isPending}>
        <div className="bg-white rounded-2xl p-6">
          <div className="max-h-[70vh] max-w-full overflow-auto">
            <table className="min-w-max border-collapse bg-white">
              <thead>
                <tr className="bg-[#005ae6] text-white">
                  <th
                    colSpan={22}
                    className="p-4 text-center text-s font-bold m-auto border border-gray-500"
                  >
                    __________________ huzuridagi NS va EB xisobidagi
                    davlat-xususiy sheriklik shartlari asosida boshqaruvga
                    berish loyihasi bo‘yicha tuzilgan "______________" bilan
                    bitimiga muvofiq 2026-yilda amalga oshiriladigan xarajatlar
                    va ularni moliyalashtirish grafigi
                  </th>
                </tr>

                <tr className="bg-[#005ae6] text-white border-b-2 border-gray-200">
                  <th
                    rowSpan={2}
                    className="border border-gray-200 px-2 py-2 text-left text-sm font-bold min-w-10"
                  >
                    T/r
                  </th>

                  <th
                    rowSpan={2}
                    className="border border-gray-200 px-2 py-2 text-center text-sm font-bold max-w-70 w-70"
                  >
                    Ko'rsatkichlar
                  </th>

                  <th
                    rowSpan={2}
                    className="border border-gray-200 px-2 py-2 text-left text-sm font-bold min-w-24"
                  >
                    O'lchov birligi
                  </th>

                  <th
                    rowSpan={2}
                    className="border border-gray-200 px-2 py-2 text-center text-sm font-bold min-w-20"
                  >
                    Guruh
                  </th>

                  {term.map((itemTerm) => (
                    <th
                      key={itemTerm.key}
                      colSpan={itemTerm.colspan}
                      className="border border-gray-200 px-2 py-2 text-center text-sm font-bold"
                    >
                      {itemTerm.label}
                    </th>
                  ))}

                  <th
                    rowSpan={2}
                    className="border border-gray-200 px-2 py-2 text-center text-sm font-bold min-w-24 bg-[#005ae6] text-white"
                  >
                    Jami yillik
                  </th>

                  <th
                    rowSpan={2}
                    className="border border-gray-200 px-2 py-2 text-center text-sm font-bold min-w-24 bg-[#005ae6] text-white"
                  >
                    Bitim bo'icha
                  </th>
                </tr>

                <tr className="bg-[#005ae6] text-white border-b-2 border-gray-200">
                  {months.map((month) => (
                    <th
                      key={month.key}
                      className="border border-gray-200 px-1 py-2 text-center text-xs font-semibold min-w-20"
                    >
                      {month.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-gray-200 ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="border border-gray-200 px-2 py-2 text-sm font-medium bg-[#005ae6] text-white">
                      {row.id}
                    </td>

                    <td
                      className={`border border-gray-500 px-2 py-2 text-sm text-gray-700 ${
                        typeof row.id === "number" && row.id % 1 !== 0
                          ? "pl-6 italic"
                          : "font-semibold"
                      }`}
                    >
                      {row.name}
                    </td>

                    <td className="border border-gray-300 px-2 py-2 text-xs text-gray-600">
                      {row.unit}
                    </td>

                    <td className="border border-gray-300 px-2 py-2 text-center text-xs text-gray-500">
                      -
                    </td>

                    {months.map((month) => (
                      <td
                        key={month.key}
                        className="border border-gray-300 px-1 py-2 text-center text-sm"
                      >
                        -
                      </td>
                    ))}

                    <td className="border border-gray-300 px-2 py-2 text-center text-sm font-semibold bg-[#005ae6] text-white">
                      {row.jami > 0 ? row.jami.toFixed(1) : "-"}
                    </td>

                    <td className="border border-gray-300 px-2 py-2 text-center text-sm font-semibold bg-[#005ae6] text-white">
                      {row.jami > 0 ? row.jami.toFixed(1) : "-"}
                    </td>
                  </tr>
                ))}

                <tr className="bg-[#005ae6] text-white border-t-2 border-b-2 border-gray-200 font-bold">
                  <td
                    colSpan={3}
                    className="border border-gray-200 px-2 py-2 text-sm"
                  >
                    Jami
                  </td>

                  <td className="border border-gray-200 px-2 py-2"></td>

                  {months.map((month) => (
                    <td
                      key={month.key}
                      className="border border-gray-200 px-1 py-2 text-center text-sm"
                    >
                      -
                    </td>
                  ))}

                  <td className="border border-gray-200 px-2 py-2 text-center text-sm font-bold bg-[#005ae6] text-white">
                    1,635.5
                  </td>

                  <td className="border border-gray-200 px-2 py-2 text-center text-sm font-bold bg-[#005ae6] text-white">
                    1,335.5
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </ShowIf>
    </PageLayout>
  );
};

export default FinansPlansDetails;
