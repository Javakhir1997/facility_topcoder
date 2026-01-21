import {
  Button,
  FileUpLoader,
  FormColumn,
  FormGrid,
  PageLayout,
  PageTitle,
  Restricted,
  Status,
  Tab,
  Table,
  Wrapper,
} from "@app/components";
import {
  BUTTON_THEME,
  convertDateFormat,
  FIELD,
  ROLE_LIST,
  statusTabOptions,
} from "@app/shared";
import { Add } from "@app/assets";
import { Column } from "react-table";
import { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AppealListFilter } from "@modules/applications/components";
import { useAddWinnerApplicant, useATenderDetail } from "@modules/tender/hooks";
import { ExampleData, IFIle, IWinnerAddForm } from "@app/interfaces";
import { useNavigate, useParams } from "react-router-dom"; // 1. useParams qo'shildi
import { Controller, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { tenderWinnerSchema } from "@app/shared/helpers/yup";

const Index = () => {
  const { t } = useTranslation();
  const { data, isPending } = useATenderDetail();
  const navigate = useNavigate();


  // 1. URL dan Tender ID ni olamiz
  const { id: tenderId } = useParams();

  // ID raqam bo'lgani uchun number ishlatamiz
  const [activeRowId, setActiveRowId] = useState<number | null>(null);

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


  //   const { addWinnerApplicant } = useAddWinnerApplicant(reset);
  const { addWinnerApplicant } = useAddWinnerApplicant(reset, (response) => {
    const dealId = response?.deal_id || response?.id;
    console.log(dealId,'dealid')
    if (dealId) {
       navigate(`/deals/${dealId}/confirmfile`);
    }
  });

  // 2. ID type ni number ga o'zgartirdik
  const handleRowSelect = (
    applicantId: any,
    type: "winner" | "vice_winner"
  ) => {
    if (!applicantId) return;

    if (type === "winner") {
      setValue("winner", applicantId, {
        shouldValidate: true,
        shouldDirty: true,
      });
      if (String(viceWinnerId) === String(applicantId)) {
        setValue("vice_winner", undefined);
      }
    } else {
      setValue("vice_winner", applicantId, {
        shouldValidate: true,
        shouldDirty: true,
      });
      if (String(winnerId) === String(applicantId)) {
        setValue("winner", undefined);
      }
    }
    setActiveRowId(null);
  };
  const isSelectionCompleted = useMemo(() => {
    if (!data?.applications) return false;
    const hasWinner = data.applications.some((app: any) => app.is_winner === "winner");
    const hasViceWinner = data.applications.some((app: any) => app.is_winner === "vice_winner");
    return hasWinner && hasViceWinner;
  }, [data]);

  const isTenderFinished = useMemo(() => {
    if (!data?.applications) return false;

    // Bazada g'olib bormi?
    const hasWinner = data.applications.some((app: any) => app.is_winner === "winner");
    // Bazada vitse-g'olib bormi?
    const hasViceWinner = data.applications.some((app: any) => app.is_winner === "vice_winner");

    // Agar ikkalasi ham aniqlangan bo'lsa, demak tender tugagan (o'zgartirib bo'lmaydi)
    return hasWinner && hasViceWinner;
  }, [data]);

  useEffect(() => {
    const handleClickOutside = () => setActiveRowId(null);
    if (activeRowId) {
      window.addEventListener("click", handleClickOutside);
    }
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [activeRowId]);

  const columns: Column<ExampleData>[] = useMemo(
    () => [
      {
        Header: t("Full Name"),
        accessor: (row) =>
          `${row.firstname || ""} ${row.middle_name || ""} ${row.lastname || ""
          }`,
      },
      {
        Header: t("Date"),
        accessor: (row) => convertDateFormat(row.created_at) || "-",
      },
      {
        Header: t("Status"),
        accessor: (row) => <Status status={row.status || "unknown"} />,
      },
      {
        Header: t("Winner"),
        Cell: ({ row }) => {
          const id = row.original?.id;
          const status = row.original?.is_winner;

          if (!id) return <span>-</span>;

          const isWinner = status === "winner" || String(winnerId) === String(id);
          const isVice = status === "vice_winner" || String(viceWinnerId) === String(id);

          return (
            <div
              className="relative flex justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                size="sm"
                type="button"
                // 2. SHU YERDA DISABLE QILAMIZ
                // Agar hammasi tanlangan bo'lsa (isSelectionCompleted), tugma ishlamaydi
                disabled={isSelectionCompleted}

                // Disabled bo'lsa sal xiraroq ko'rinishi uchun style qo'shamiz
                className={`min-w-[110px] transition-all duration-200 ${isSelectionCompleted ? "opacity-60 cursor-not-allowed" : ""
                  }`}

                theme={
                  isWinner
                    ? BUTTON_THEME.PRIMARY
                    : isVice
                      ? BUTTON_THEME.SECONDARY
                      : BUTTON_THEME.OUTLINE
                }
                onClick={(e) => {
                  e.stopPropagation();
                  // Agar tender tugagan bo'lsa, menyu ochilmasin
                  if (isSelectionCompleted) return;
                  setActiveRowId(activeRowId === id ? null : id);
                }}
              >
                {isWinner
                  ? t("winner")
                  : isVice
                    ? t("vice_winner")
                    : t("select winner")}
              </Button>

              {/* 3. MENU FAQAT ACTIVE BO'LSA VA BLOKLANMAGAN BO'LSA CHIQADI */}
              {!isSelectionCompleted && activeRowId === id && (
                <div
                  className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-[9999] min-w-[160px] py-1 animate-in fade-in zoom-in duration-150"
                  style={{ filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.1))" }}
                >
                  <button
                    type="button"
                    className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-2 hover:bg-blue-50 transition-colors ${isWinner ? "text-blue-600 font-bold" : "text-gray-700"
                      }`}
                    onClick={() => handleRowSelect(id, "winner")}
                  >
                    {t("winner")}
                  </button>
                  <div className="h-[1px] bg-gray-100 mx-2" />
                  <button
                    type="button"
                    className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors ${isVice ? "text-orange-600 font-bold" : "text-gray-700"
                      }`}
                    onClick={() => handleRowSelect(id, "vice_winner")}
                  >
                    {t("vice_winner")}
                  </button>
                </div>
              )}
            </div>
          );
        },
      },
    ],
    [t, winnerId, viceWinnerId, activeRowId, isTenderFinished]
  );

  const handleFinalSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append("winner", winnerId);
    console.log(winnerId, viceWinnerId, "llllllll");
    formData.append("vice_winner", viceWinnerId);
    if (data.protocol?.id) {
      formData.append("protocol", data.protocol?.id?.toString());
    }
    console.log(data.protocol.id);

    console.log("Form Data qiymatlari:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    addWinnerApplicant(formData as unknown as IWinnerAddForm);
  });

  const handleRow = (id: string | number): void => { };

  return (
    <PageLayout>
      <PageTitle title="Tender">
        <Restricted permittedRole={ROLE_LIST.APPLICANT}>
          <Button icon={<Add />} navigate="add">
            Create application
          </Button>
        </Restricted>
      </PageTitle>

      {/* <AppealListFilter /> */}
      {/* <Tab tabs={statusTabOptions} query="status" fallbackValue="all" /> */}

      <FormColumn onSubmit={handleSubmit(handleFinalSubmit)}>
        {/* 1. Table qismi (To'liq kenglikda) */}
        <div className="w-full overflow-x-auto mb-6 flex flex-col">
          <Table
            isLoading={isPending}
            columns={columns}
            handleRow={handleRow}
            data={isPending ? [] : data?.applications || []}
            screen={true}
          />
          {(errors.winner || errors.vice_winner) && (
            <p className="text-red-500 text-sm mt-2 font-medium">
              {t("Iltimos, g'olib va vitse-g'olibni tanlang")}
            </p>
          )}
        </div>

        {/* 2. File Uploader qismi (Table pasida alohida blokda) */}
        <div className="w-[500px] mb-8">
          <Controller
            name="protocol"
            control={control}
            render={({
              field: { value, ref, onChange, onBlur },
              fieldState: { error },
            }) => (
              <div className="flex flex-col gap-2">
                <FileUpLoader
                  id="protocol"
                  ref={ref}
                  value={value as unknown as IFIle}
                  onBlur={onBlur}
                  onChange={onChange}
                  label={t("DXSH amalga oshirilgan ijobiy loyihalar fayli")}
                />
                {error && (
                  <p className="text-red-500 text-sm">{error.message}</p>
                )}
              </div>
            )}
          />
        </div>

        {/* 3. Buttonlar qismi (Pastda, yonma-yon yoki ustma-ust) */}
        <div className="flex justify-between items-center w-full pt-4 border-t border-gray-100">
          <Button
            onClick={() => navigate(-1)}
            theme={BUTTON_THEME.OUTLINE}
            type="button"
            className="min-w-[120px]"
          >
            {t("back")}
          </Button>
          <Button
            type={FIELD.SUBMIT}
            theme={BUTTON_THEME.PRIMARY}
            disabled={isPending}
            className="min-w-[150px]"
          >
            {t("Tasdiqlash")}
          </Button>
        </div>
      </FormColumn>
    </PageLayout>
  );
};

export default Index;
