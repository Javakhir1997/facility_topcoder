import {
  Button,
  GridWrapper,
  PageLayout,
  PageTitle,
  Row,
  Status,
  Table,
  Tag,
  Wrapper,
} from "@app/components";
import {
  BUTTON_THEME,
  formatString,
} from "@app/shared";
import HR from "@components/HR";
import { useATenderDetail } from "@modules/tender/hooks";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Column } from "react-table";
import { useMemo } from "react";

// --- YORDAMCHI KOMPONENTLAR (Visual Ikonkalar) ---

const FileIcon = ({ ext }: { ext?: string }) => {
  const isPdf = ext === "pdf";
  const isDoc = ext === "doc" || ext === "docx";
  
  let bgColor = "bg-gray-100";
  let textColor = "text-gray-500";

  if (isPdf) {
    bgColor = "bg-red-100";
    textColor = "text-red-500";
  } else if (isDoc) {
    bgColor = "bg-blue-100";
    textColor = "text-blue-500";
  }

  return (
    <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${bgColor} ${textColor}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
    </div>
  );
};

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

// --- ASOSIY KOMPONENT ---

interface IApplication {
  id: number;
  firstname: string;
  lastname: string;
  middle_name: string;
  created_at: string;
  status: string;
  is_winner: string;
  company_name: string;
  region: { id: number; name: string };
  district: { id: number; name: string };
}

const Index = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isPending } = useATenderDetail();

  // 1. JADVAL USTUNLARI
  const columns: Column<IApplication>[] = useMemo(
    () => [
      {
        Header: t("Full Name"),
        accessor: (row) => (
          <span className="font-medium text-gray-900">
             {`${row.lastname || ""} ${row.firstname || ""} ${row.middle_name || ""}`}
          </span>
        ),
      },
      {
        Header: t("Company"),
        accessor: (row) => row.company_name || "-",
      },
      {
        Header: t("Region"),
        accessor: (row) => (
          <div className="flex flex-col text-sm">
            <span>{row.region?.name || "-"}</span>
            <span className="text-gray-400 text-xs">{row.district?.name || ""}</span>
          </div>
        ),
      },
      {
        Header: t("Date"),
        accessor: (row) => <span className="text-gray-500">{row.created_at || "-"}</span>,
      },
      {
        Header: t("Status"),
        accessor: (row) => <Status status={row.status} />,
      },
      {
        Header: t("Result"),
        accessor: (row) => {
           if (row.is_winner === "winner") {
             return <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold border border-green-200">{t("WINNER")}</span>;
           }
           if (row.is_winner === "vice_winner") {
             return <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-bold border border-orange-200">{t("VICE WINNER")}</span>;
           }
           return <span className="text-gray-400">-</span>;
        },
      },
    ],
    [t]
  );

  // Protocol fayl nomini olish
  const protocolName = useMemo(() => {
    if (!data?.protocol) return null;
    return data.protocol.split("/").pop();
  }, [data?.protocol]);

  const protocolExt = useMemo(() => {
    if (!data?.protocol) return "file";
    return data.protocol.split(".").pop();
  }, [data?.protocol]);

  // --- YANGI QO'SHILGAN ACTION ---
  const handleRow = (id:any) => {
    // Bu yerda URL ni loyihangizdagi Routerga moslab o'zgartiring.
    // Masalan: "winner/${row.id}" yoki "/applications/${row.id}"
    navigate(`/tenders/${id}/get-participant`);
  };

  return (
    <PageLayout>
      <PageTitle title={t("Tender Detail")} />
      
      <Wrapper>
        {/* --- HEADER: COUNT & DATE --- */}
        <div className="flex gap--5xl items-center">
          <Tag title="Applicants Count">
            <span className="font-bold text-xl text-blue-600">{data?.count || 0}</span>
          </Tag>

          <Tag title="Start Date" string>
             <span className="font-medium">{data?.start_date || "-"}</span>
          </Tag>
        </div>

        <HR />

        {/* --- MAIN CONTENT: OBJECT INFO & PROTOCOL --- */}
        <div className="flex flex-col gap-6">
          <h2 className="text-gray-800 font-bold text-lg border-l-4 border-blue-500 pl-3">
            {t("Water Management Facility Info")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* CHAP TOMON: Obyekt ma'lumotlari */}
            <GridWrapper>
              {data?.object?.map((obj: any, index: number) => (
                <div key={obj.id || index} className="flex flex-col gap-1">
                  <Row 
                    label="Object Name" 
                    value={obj.name} 
                    background={true} 
                  />
                  <Row 
                    label="Object Type" 
                    value={obj.type?.name} 
                  />
                   <Row
                    label="Region"
                    value={obj.region?.name}
                    background={true}
                  />
                   <Row
                    label="District"
                    value={formatString(
                      obj.district?.map((d: any) => ({
                        label: d.name,
                        value: d.name,
                      })) || []
                    )}
                  />
                  <Row
                    label="Balance Organization"
                    value={obj.balans_organization?.name}
                    background={true}
                  />
                </div>
              ))}
            </GridWrapper>

            {/* O'NG TOMON: Protocol File (PROFESSIONAL DESIGN) */}
            <div className="flex flex-col gap-3">
              <div className="text-gray-400 font-semibold text-sm uppercase tracking-wide">
                {t("Protocol Document")}
              </div>
              
              {data?.protocol ? (
                <a
                  href={data.protocol}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between p-5 bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:border-blue-400 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  {/* Orqa fon bezagi */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>

                  <div className="flex items-center gap-5 z-10">
                    {/* 1. Icon */}
                    <div className="bg-white p-1 rounded-xl shadow-sm">
                       <FileIcon ext={protocolExt} />
                    </div>
                    
                    {/* 2. Text */}
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 text-sm md:text-base group-hover:text-blue-700 transition-colors line-clamp-1 break-all max-w-[180px]">
                        {protocolName || "Protocol_Document"}
                      </span>
                      <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mt-0.5">
                        {protocolExt} FILE • {t("Click to download")}
                      </span>
                    </div>
                  </div>

                  {/* 3. Download Action */}
                  <div className="z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-blue-200">
                    <DownloadIcon />
                  </div>
                </a>
              ) : (
                // Empty State
                <div className="flex flex-col items-center justify-center gap-2 p-8 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="12" y1="18" x2="12" y2="12"></line>
                    <line x1="9" y1="15" x2="12" y2="18"></line>
                    <line x1="15" y1="15" x2="12" y2="18"></line>
                  </svg>
                  <span className="text-sm font-medium">{t("No protocol file uploaded")}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <HR />

        {/* --- APPLICATIONS TABLE --- */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center justify-between">
             <h2 className="text-gray-800 font-bold text-lg border-l-4 border-green-500 pl-3">
                {t("Applications List")}
             </h2>
             <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">
                Total: {data?.applications?.length || 0}
             </span>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <Table
              isLoading={isPending}
              columns={columns}
              data={data?.applications || []}
              screen={true}
              pagination={false}
              // handleRow ulandi
              handleRow={handleRow} 
              emptyMessage={t("No applications found for this tender.")}
            />
          </div>
        </div>

        {/* --- FOOTER ACTIONS --- */}
        <div className="flex gap--lg items-center justify-between pt-6 border-t border-gray-100">
          <Button 
             onClick={() => navigate(-1)} 
             theme={BUTTON_THEME.OUTLINE}
             className="px-6"
          >
            {t("Back to List")}
          </Button>
        </div>

      </Wrapper>
    </PageLayout>
  );
};

export default Index;