import {
  Button,
  FileUpLoader,
  FormColumn,
  PageLayout,
  PageTitle,
  Restricted,
  Status,
  Table,
  Wrapper,
} from "@app/components";
import AlertItem from "../../../../components/AlertItem"; // Komponent import qilindi
import {
  BUTTON_THEME,
  convertDateFormat,
  FIELD,
  ROLE_LIST,
} from "@app/shared";
import { Add } from "@app/assets";
import { Column } from "react-table";
import { useMemo, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAddWinnerApplicant, useATenderDetail } from "@modules/tender/hooks";
import { ExampleData, IFIle, IWinnerAddForm } from "@app/interfaces";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { tenderWinnerSchema } from "@app/shared/helpers/yup";

// ... Icons (CrownIcon, BadgeCheckIcon) o'zgarishsiz ...
const CrownIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
  </svg>
);

const BadgeCheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm4.458 4.543a.75.75 0 00-1.12-1.004l-3.397 3.793-.769-.854a.75.75 0 00-1.121 1.008l1.325 1.47a1.25 1.25 0 001.868.016l3.214-3.587z" clipRule="evenodd" />
  </svg>
);

const Index = () => {
  const { t } = useTranslation();
  const { data, isPending } = useATenderDetail();
  const navigate = useNavigate();
  const { id: tenderId } = useParams();

  const [activeRowId, setActiveRowId] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 1. Alert holatini boshqarish uchun state qo'shamiz
  const [alertState, setAlertState] = useState<{ visible: boolean; title: string; type: 'success' | 'error' }>({
    visible: false,
    title: '',
    type: 'success'
  });

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(tenderWinnerSchema(t)),
    defaultValues: {
      winner: undefined,
      vice_winner: undefined,
      protocol: undefined,
    },
  });

  const winnerId = useWatch({ control, name: "winner" });
  const viceWinnerId = useWatch({ control, name: "vice_winner" });

  const { addWinnerApplicant } = useAddWinnerApplicant(reset, (response: any) => {
    // 2. Funksiya ichida faqat STATE ni o'zgartiramiz
    setAlertState({
        visible: true,
        title: response?.detail || t("Muvaffaqiyatli yakunlandi"),
        type: 'success'
    });

    // Biroz kutib keyin navigate qilamiz (Alert ko'rinishi uchun)
    setTimeout(() => {
        navigate("/tenders");
    }, 2000); 
  });

  // ... (boshqa useEffect va event listenerlar) ...
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveRowId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRowSelect = (applicantId: any, type: "winner" | "vice_winner") => {
    if (!applicantId) return;
    if (type === "winner") {
      setValue("winner", applicantId, { shouldValidate: true, shouldDirty: true });
      if (String(viceWinnerId) === String(applicantId)) setValue("vice_winner", undefined);
    } else {
      setValue("vice_winner", applicantId, { shouldValidate: true, shouldDirty: true });
      if (String(winnerId) === String(applicantId)) setValue("winner", undefined);
    }
    setActiveRowId(null);
  };

  const isSelectionCompleted = useMemo(() => {
    if (!data?.applications) return false;
    const hasWinner = data.applications.some((app: any) => app.is_winner === "winner");
    const hasViceWinner = data.applications.some((app: any) => app.is_winner === "vice_winner");
    return hasWinner && hasViceWinner;
  }, [data]);

  const columns: Column<ExampleData>[] = useMemo(
    // ... Columns logikasi o'zgarishsiz ...
    () => [
      {
        Header: t("Full Name"),
        accessor: (row) => `${row.firstname || ""} ${row.middle_name || ""} ${row.lastname || ""}`,
        Cell: ({ value }) => <span className="font-medium text-gray-900">{value}</span>
      },
      {
        Header: t("Date"),
        accessor: (row) => convertDateFormat(row.created_at) || "-",
        Cell: ({ value }) => <span className="text-gray-500">{value}</span>
      },
      {
        Header: t("Status"),
        accessor: (row) => row.status,
        Cell: ({ row }) => <Status status={row.original.status || "unknown"} />,
      },
      {
        Header: t("Action / Result"),
        id: "actions",
        Cell: ({ row }) => {
          const id = row.original?.id;
          const status = row.original?.is_winner;
          if (!id) return null;
          const isWinner = status === "winner" || String(winnerId) === String(id);
          const isVice = status === "vice_winner" || String(viceWinnerId) === String(id);

          return (
            <div className="relative flex justify-center" ref={activeRowId === id ? dropdownRef : null}>
              <Button
                size="sm"
                type="button"
                disabled={isSelectionCompleted}
                icon={isWinner ? <CrownIcon className="w-4 h-4" /> : isVice ? <BadgeCheckIcon className="w-4 h-4" /> : undefined}
                className={`min-w-[140px] px-4 py-2 font-medium transition-all duration-200 border ${isWinner ? "bg-green-50 text-green-700 border-green-200" : isVice ? "bg-orange-50 text-orange-700 border-orange-200" : "bg-white text-gray-600 border-gray-300"} ${isSelectionCompleted ? "opacity-70 cursor-not-allowed" : ""}`}
                theme={BUTTON_THEME.OUTLINE} 
                onClick={(e) => {
                  e.stopPropagation();
                  if (isSelectionCompleted) return;
                  setActiveRowId(activeRowId === id ? null : id);
                }}
              >
                {isWinner ? t("Winner") : isVice ? t("Vice Winner") : t("Select Status")}
              </Button>
              {activeRowId === id && !isSelectionCompleted && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 z-[9999] overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                  <div className="py-1">
                    <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100">{t("Assign Role")}</p>
                    <button type="button" onClick={(e) => { e.stopPropagation(); handleRowSelect(id, "winner"); }} className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors hover:bg-green-50 group ${isWinner ? "bg-green-50" : ""}`}>
                      <div className={`p-1.5 rounded-full ${isWinner ? "bg-green-200 text-green-700" : "bg-gray-100 text-gray-400 group-hover:bg-green-200 group-hover:text-green-700"}`}><CrownIcon className="w-4 h-4" /></div>
                      <span className={`${isWinner ? "font-bold text-green-800" : "text-gray-700 font-medium"}`}>{t("Winner")}</span>
                    </button>
                    <button type="button" onClick={(e) => { e.stopPropagation(); handleRowSelect(id, "vice_winner"); }} className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors hover:bg-orange-50 group border-t border-gray-50 ${isVice ? "bg-orange-50" : ""}`}>
                      <div className={`p-1.5 rounded-full ${isVice ? "bg-orange-200 text-orange-700" : "bg-gray-100 text-gray-400 group-hover:bg-orange-200 group-hover:text-orange-700"}`}><BadgeCheckIcon className="w-4 h-4" /></div>
                      <span className={`${isVice ? "font-bold text-orange-800" : "text-gray-700 font-medium"}`}>{t("Vice Winner")}</span>
                    </button>
                    {(isWinner || isVice) && (
                       <button type="button" onClick={(e) => { e.stopPropagation(); if(isWinner) setValue("winner", undefined); if(isVice) setValue("vice_winner", undefined); setActiveRowId(null); }} className="w-full text-left px-4 py-2 text-xs text-red-500 hover:bg-red-50 border-t border-gray-100 transition-colors flex justify-center">{t("Reset Selection")}</button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        },
      },
    ],
    [t, winnerId, viceWinnerId, activeRowId, isSelectionCompleted]
  );

  const handleFinalSubmit = handleSubmit((data) => {
    const formData = new FormData();
    if (winnerId) formData.append("winner", winnerId);
    if (viceWinnerId) formData.append("vice_winner", viceWinnerId);
    if (data.protocol?.id) {
      formData.append("protocol", data.protocol?.id?.toString());
    }
    addWinnerApplicant(formData as unknown as IWinnerAddForm);
  });

  const handleRow = (id: string | number): void => {};

  return (
    <PageLayout>
      <PageTitle title={t("Tender Management")} />
      
      {/* 3. AlertItem ni return qismiga, Wrapper dan oldin qo'shamiz (yoki kerakli joyga) */}
      <AlertItem 
         title={alertState.title}
         type={alertState.type}
         visible={alertState.visible}
         onClose={() => setAlertState(prev => ({ ...prev, visible: false }))}
      />

      <Wrapper>
        <FormColumn onSubmit={handleSubmit(handleFinalSubmit)}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <div>
                   <h3 className="text-xl font-bold text-gray-800 tracking-tight">{t("Applicants List")}</h3>
                   <p className="text-sm text-gray-500 mt-1">{t("Select a winner and vice-winner from the list below.")}</p>
                </div>
                <Restricted permittedRole={ROLE_LIST.APPLICANT}>
                  <Button icon={<Add />} navigate="add" size="sm" theme={BUTTON_THEME.PRIMARY}>
                    {t("New Application")}
                  </Button>
                </Restricted>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-visible">
                <Table
                  isLoading={isPending}
                  columns={columns}
                  handleRow={handleRow}
                  data={isPending ? [] : data?.applications || []}
                  screen={true}
                  className="min-h-[300px]" 
                />
              </div>

              {(errors.winner || errors.vice_winner) && (
                <div className="flex items-center gap-3 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg animate-pulse">
                   <div className="text-red-500">⚠</div>
                   <div className="text-red-700 font-medium">{t("Please select both a Winner and a Vice-Winner.")}</div>
                </div>
              )}
            </div>

            <div className="h-px bg-gray-200 w-full" />

            <div className="flex flex-col gap-4">
               <h3 className="text-xl font-bold text-gray-800">{t("Protocol Document")}</h3>
               <div className="bg-gray-50 hover:bg-white transition-colors p-8 rounded-xl border-2 border-dashed border-gray-300 w-full max-w-3xl">
                  <Controller
                    name="protocol"
                    control={control}
                    render={({
                      field: { value, ref, onChange, onBlur },
                      fieldState: { error },
                    }) => (
                      <div className="flex flex-col gap-3">
                        <FileUpLoader
                          id="protocol"
                          ref={ref}
                          value={value as unknown as IFIle}
                          onBlur={onBlur}
                          onChange={onChange}
                          label={t("Upload Official Protocol File")}
                        />
                        {error && <span className="text-sm text-red-500">{error.message}</span>}
                      </div>
                    )}
                  />
               </div>
            </div>

            <div className="sticky bottom-0 bg-white/80 backdrop-blur-sm py-4 border-t border-gray-200 mt-6 flex justify-between items-center z-40">
              <Button onClick={() => navigate(-1)} theme={BUTTON_THEME.OUTLINE} type="button" className="px-6">
                {t("Cancel & Back")}
              </Button>
              <Button type={FIELD.SUBMIT} theme={BUTTON_THEME.PRIMARY} disabled={isPending} className="px-10 py-2.5 shadow-lg shadow-blue-500/30 font-semibold">
                {isPending ? t("Processing...") : t("Confirm & Finish")}
              </Button>
            </div>
          </div>
        </FormColumn>
      </Wrapper>
    </PageLayout>
  );
};

export default Index;