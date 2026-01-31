import { useMemo } from "react";
import {
  Button,
  GridWrapper,
  PageLayout,
  PageTitle,
  Row,
  Wrapper,
} from "@app/components";
import { BUTTON_THEME } from "@app/shared";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { IWinnerObjectDetail } from "@interfaces/application.interface";
import { useWinnerDetailToDeal } from "@modules/tender/hooks";
import HR from "@components/HR";

// --- YORDAMCHI IKONKALAR ---
const FileIcon = ({ ext }: { ext?: string }) => {
  const isPdf = ext === "pdf";
  return (
    <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${isPdf ? "bg-red-100 text-red-500" : "bg-blue-100 text-blue-500"}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
    </div>
  );
};

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="22.01"></line><line x1="15" y1="22" x2="15" y2="22.01"></line><line x1="12" y1="22" x2="12" y2="22.01"></line><line x1="12" y1="2" x2="12" y2="22"></line><line x1="4" y1="10" x2="20" y2="10"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="14" x2="20" y2="14"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
);

// --- FILE CARD KOMPONENTI ---
const DocumentCard = ({ url, label }: { url?: string; label: string }) => {
  const fileName = url ? url.split("/").pop() : null;
  const ext = url ? url.split(".").pop() : "file";

  if (!url) {
    return (
      <div className="flex flex-col gap-2 p-4 bg-gray-50 border border-dashed border-gray-300 rounded-xl">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</span>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
           Hujjat mavjud emas
        </div>
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-blue-400 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="flex items-center gap-4 z-10">
        <FileIcon ext={ext} />
        <div className="flex flex-col">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">{label}</span>
          <span className="font-bold text-gray-800 text-sm group-hover:text-blue-700 transition-colors line-clamp-1 break-all max-w-[150px]">
            {fileName}
          </span>
        </div>
      </div>
      <div className="z-10 w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
        <DownloadIcon />
      </div>
    </a>
  );
};

const Index = () => {
  const { data } = useWinnerDetailToDeal();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <PageLayout>
      <PageTitle title={t("Winner Detail")} />

      <div className="mt-5">
        <Wrapper>
          
          {/* --- HEADER QISMI --- */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
             <div className="p-3 bg-blue-50 rounded-full">
                <UserIcon />
             </div>
             <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {data?.lastname || ""} {data?.firstname || ""} {data?.middle_name || ""}
                </h2>
                <div className="flex items-center gap-4 mt-1">
                   <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-bold">
                     ID: {data?.id_number || "-"}
                   </span>
                   {data?.company_name && (
                     <div className="flex items-center gap-1 text-sm text-gray-500 font-medium">
                        <BuildingIcon />
                        {data.company_name}
                     </div>
                   )}
                </div>
             </div>
          </div>

          <HR />

          {/* --- MA'LUMOTLAR GRIDI --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            
            {/* CHAP TOMON: Shaxsiy ma'lumotlar */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 pl-2 border-l-4 border-blue-500">
                 {t("Personal Information")}
              </h3>
              <GridWrapper>
                <Row
                  label={t("Full Name")}
                  value={`${data?.lastname || "-"} ${data?.firstname || ""} ${data?.middle_name || ""}`}
                  background
                />
                <Row
                  label={t("ID Number")}
                  value={data?.id_number}
                />
                <Row
                  label={t("Region")}
                  value={data?.region?.name}
                  background
                />
                <Row
                  label={t("District / Address")}
                  value={data?.district?.name}
                />
                <Row
                  label={t("Phone Number")}
                  value={data?.phone}
                  background
                />
              </GridWrapper>
            </div>

            {/* O'NG TOMON: Tashkilot va Moliyaviy */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 pl-2 border-l-4 border-green-500">
                 {t("Organization & Financial")}
              </h3>
              <GridWrapper>
                 <Row
                  label={t("STIR (INN)")}
                  value={data?.stir}
                  background
                />
                 <Row
                  label={t("Bank Account")}
                  value={data?.winner_bank_account}
                />
                 <Row
                  label={t("Email")}
                  value={data?.email}
                  background
                />
                <Row
                  label={t("Company Name")}
                  value={data?.company_name}
                />
                 <Row
                  label={t("Balance Keeper Organization")}
                  value={data?.balance_keeper}
                  background
                />
              </GridWrapper>
            </div>
          </div>

          <HR />

          {/* --- OBYEKTLAR VA HUJJATLAR --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
             
             {/* OBYEKTLAR RO'YXATI */}
             <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pl-2 border-l-4 border-indigo-500">
                  {t("Object Information")}
                </h3>
                <GridWrapper>
                  <Row
                      label={t("WMF Type")}
                      value={data?.sxo_type}
                      background
                   />
                   <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <span className="text-gray-400 font-medium text-sm block mb-2">{t("Attached Objects")}:</span>
                      {data?.object?.length ? (
                         <ul className="list-disc list-inside space-y-1">
                            {data.object.map((item: IWinnerObjectDetail) => (
                              <li key={item.id} className="text-gray-800 font-medium text-sm">
                                {item.name}
                              </li>
                            ))}
                         </ul>
                      ) : (
                        <span className="text-gray-500 italic">-</span>
                      )}
                   </div>
                </GridWrapper>
             </div>

             {/* HUJJATLAR (File Cards) */}
             <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pl-2 border-l-4 border-purple-500">
                   {t("Winner Documents")}
                </h3>
                <div className="flex flex-col gap-4">
                   <DocumentCard 
                      label={t("Conception")} 
                      url={data?.concept} 
                   />
                   <DocumentCard 
                      label={t("Protocol")} 
                      url={data?.protocol} 
                   />
                </div>
             </div>
          </div>

          {/* --- FOOTER BUTTONS --- */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-6">
            <Button 
                onClick={() => navigate(-1)} 
                theme={BUTTON_THEME.OUTLINE}
                className="px-6"
            >
              {t("Back")}
            </Button>

            {/* <Button 
                theme={BUTTON_THEME.PRIMARY}
                className="px-8 shadow-lg shadow-blue-500/30"
                onClick={() => {
                   // Bitim tuzish logikasi
                   navigate("create-deal"); // Yoki modal ochish
                }}
            >
              {t("Bitim tuzish")}
            </Button> */}
          </div>

        </Wrapper>
      </div>
    </PageLayout>
  );
};

export default Index;