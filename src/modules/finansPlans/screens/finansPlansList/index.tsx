import React from "react";
import { PageLayout, PageTitle, ShowIf } from "@components/index";
import { FinansFilter } from "@modules/finansPlans/components";

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

const FinansPlansList: React.FC<{}> = () => {
  return (
    <PageLayout>
      <div className="d-flex flex-column gap-10 bg-white rounded-xl px-6 pb-2">
        <PageTitle title="Finans Plans List">
          <FinansFilter />
        </PageTitle>
      </div>

      <ShowIf show={true}>
        <div className="bg-white rounded-2xl p-6">
          <div className="max-h-[70vh] max-w-full overflow-auto">
            <table className="min-w-max border-collapse bg-white">
              <thead>
                <tr>
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

                <tr className="bg-blue-100 border-b-2 border-gray-500">
                  <th
                    rowSpan={2}
                    className="border border-gray-500 px-2 py-2 text-left text-sm font-bold min-w-10"
                  >
                    T/r
                  </th>

                  <th
                    rowSpan={2}
                    className="border border-gray-500 px-2 py-2 text-left text-sm font-bold min-w-40"
                  >
                    Ko'rsatkichlar
                  </th>

                  <th
                    rowSpan={2}
                    className="border border-gray-500 px-2 py-2 text-left text-sm font-bold min-w-24"
                  >
                    O'lchov birligi
                  </th>

                  <th
                    rowSpan={2}
                    className="border border-gray-500 px-2 py-2 text-center text-sm font-bold min-w-20"
                  >
                    Guruh
                  </th>

                  {term.map((itemTerm) => (
                    <th
                      key={itemTerm.key}
                      colSpan={itemTerm.colspan}
                      className="border border-gray-300 px-2 py-2 text-center text-sm font-bold bg-linear-to-b from-purple-50 to-white"
                    >
                      {itemTerm.label}
                    </th>
                  ))}

                  <th
                    rowSpan={2}
                    className="border border-gray-300 px-2 py-2 text-center text-sm font-bold min-w-24 bg-linear-to-b from-green-50 to-white"
                  >
                    Jami yillik
                  </th>

                  <th
                    rowSpan={2}
                    className="border border-gray-300 px-2 py-2 text-center text-sm font-bold min-w-24 bg-linear-to-b from-yellow-50 to-white"
                  >
                    bitim bo'icha
                  </th>
                </tr>

                <tr className="bg-purple-50 border-b-2 border-gray-500">
                  {months.map((month) => (
                    <th
                      key={month.key}
                      className="border border-gray-300 px-1 py-2 text-center text-xs font-semibold min-w-20 bg-linear-to-b from-blue-50 to-white"
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
                    <td className="border border-gray-500 px-2 py-2 text-sm font-medium text-gray-700">
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

                    <td className="border border-gray-300 px-2 py-2 text-center text-sm font-semibold text-green-700 bg-green-50">
                      {row.jami > 0 ? row.jami.toFixed(1) : "-"}
                    </td>

                    <td className="border border-gray-300 px-2 py-2 text-center text-sm font-semibold text-yellow-700 bg-yellow-50">
                      {row.jami > 0 ? row.jami.toFixed(1) : "-"}
                    </td>
                  </tr>
                ))}

                <tr className="bg-blue-100 border-t-2 border-b-2 border-gray-400 font-bold">
                  <td
                    colSpan={3}
                    className="border border-gray-400 px-2 py-2 text-sm text-gray-800"
                  >
                    Jami
                  </td>

                  <td className="border border-gray-600 px-2 py-2"></td>

                  {months.map((month) => (
                    <td
                      key={month.key}
                      className="border border-gray-400 px-1 py-2 text-center text-sm"
                    >
                      -
                    </td>
                  ))}

                  <td className="border border-gray-500 px-2 py-2 text-center text-sm font-bold text-blue-900 bg-blue-100">
                    1,635.5
                  </td>

                  <td className="border border-gray-500 px-2 py-2 text-center text-sm font-bold text-blue-900 bg-blue-100">
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

export default FinansPlansList;
