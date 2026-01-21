import {
  Button,
  FileUpLoader,
  FileUpLoaderView,
  GridWrapper,
  PageLayout,
  PageTitle,
  Restricted,
  Row,
  ShowIf,
  Status,
  Tag,
} from "@app/components";
import Wrapper from "@components/Wrapper";


import {
  useWinnerDetailToDeal
} from "@modules/tender/hooks";
import {
  BUTTON_THEME,
  convertDateFormat,
  getSelectLabel,
  sourceOfIncomeOptions,
  ROLE_LIST,
  STATUS_LIST,
} from "@app/shared";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

const Index = () => {
  const { data } = useWinnerDetailToDeal();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const formattedProtocol = useMemo(() => {
    if (!data?.protocol) return null;

    // URL: .../attachments/Master_Food_8VSdkeI.pdf
    // "split" orqali oxirgi qismini (fayl nomini) ajratib olamiz
    const fileName = data.protocol.split('/').pop() || "unknown_file.pdf";

    // Fayl kengaytmasini olamiz (pdf, docx va h.k - icon uchun kerak)
    const extension = fileName.split('.').pop();

    return {
      id: "protocol_unique_id", // Shunchaki unikal ID
      name: fileName,           // "Master_Food_8VSdkeI.pdf"
      url: data.protocol,       // To'liq havola
      size: 0,                  // DIQQAT: URL dan hajmni bilib bo'lmaydi, shuning uchun 0 yoki yashirib qo'yasiz
      ext: extension,           // "pdf"
      type: extension           // Ba'zi komponentlar type kutadi
    };
  }, [data?.protocol]);

  const formattedConception = useMemo(() => {
    if (!data?.concept) return null;

    // URL: .../attachments/Master_Food_8VSdkeI.pdf
    // "split" orqali oxirgi qismini (fayl nomini) ajratib olamiz
    const fileName = data.concept.split('/').pop() || "unknown_file.pdf";

    // Fayl kengaytmasini olamiz (pdf, docx va h.k - icon uchun kerak)
    const extension = fileName.split('.').pop();

    return {
      id: "concept_unique_id", // Shunchaki unikal ID
      name: fileName,           // "Master_Food_8VSdkeI.pdf"
      url: data.concept,       // To'liq havola
      size: 0,                  // DIQQAT: URL dan hajmni bilib bo'lmaydi, shuning uchun 0 yoki yashirib qo'yasiz
      ext: extension,           // "pdf"
      type: extension           // Ba'zi komponentlar type kutadi
    };
  }, [data?.concept]);

  return (
    <div>
      <PageLayout>
        <PageTitle title="Asosiy" />

        {/* ASOSIY MA'LUMOTLAR BLOKI */}

        {/* YANGI QO'SHILGAN: G'OLIB MA'LUMOTLARI BLOKI */}
        <div className="mt-5">
          <Wrapper>
            <div className="grid grid-cols-12 gap-5">
              {/* Chap ustun - Shaxsiy ma'lumotlar va Manzil */}
              <div className="col-span-6">
                <GridWrapper>
                  <Row
                    label={t("Ғолибнинг фамилияси")}
                    value={data?.lastname || "Abdulazizov"}
                  />
                  <Row
                    label={t("Ғолибнинг исми")}
                    value={data?.firstname || "Aziz"}
                    background
                  />
                  <Row
                    label={t("Ғолибнинг отасининг исми")}
                    value={data?.middle_name || "Azizovich"}
                  />
                  <Row
                    label={t("Ғолибнинг ID Рақами")}
                    value={data?.id_number || "1233122423123"}
                    background
                  />
                  <Row
                    label={t("Яшаш вилояти")}
                    value={data?.region?.name || "Бухоро вилояти"}
                  />
                  <Row
                    label={t("Яшаш манзили")}
                    value={
                      data?.district?.name || "Бухоро вилояти, Олот тумани"
                    }
                    background
                  />
                  <Row
                    label={t("Телефон рақами")}
                    value={data?.phone || "+998 99 123-45-67"}
                  />
                </GridWrapper>
              </div>

              {/* O'ng ustun - Tashkilot va Bank ma'lumotlari */}
              <div className="col-span-6">
                <GridWrapper>
                  <Row
                    label={t("СТИР (INN)")}
                    value={data?.stir || "123456789"}
                  />
                  <Row
                    label={t("Банк ҳисоб рақами")}
                    value={data?.winner_bank_account || "20208000..."}
                    background
                  />
                  <Row
                    label={t("Ташкилот электрон почта манзили")}
                    value={data?.email || "fakemail@icloud.com"}
                  />
                  <Row
                    label={t("СХО тури")}
                    value={data?.sxo_type || "Андижон сув омбори"}
                    background
                  />
                  <Row
                    label={t("Объект")}
                    value={
                      data?.object?.length ? (
                        <div className="flex flex-col gap-1">
                          {data.object.map((item) => (
                            <span key={item.id} className="block">
                              • {item.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        "-"
                      )
                    }
                  />
                  <Row
                    label={t("Ташкилот номи")}
                    value={data?.company_name || "Бухоро вилояти, Олот тумани"}
                    background
                  />
                  <Row
                    label={t("Балансда сақловчи ташкилот")}
                    value={data?.balance_keeper || "43,4"}
                  />
                </GridWrapper>
              </div>
            </div>

            <Tag title="Documents" type="vertical">
              <div className="grid grid--cols-3 gap--lg items-center">
                {formattedConception ? (

                  <div className="">
                    <span>Концепция</span>
                    <FileUpLoaderView
                      // Endi bu yerga string emas, tayyorlagan obyektimizni beramiz

                      value={formattedConception}
                      id="concep_file"
                    // Agar sizda "view mode" bo'lsa, o'chirish/yuklashni bloklash uchun:
                    // readonly={true} 
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-start">
                    <span>Концепция</span>
                    <span>Hujjat mavjud emas</span>
                  </div>
                )}

                {formattedProtocol ? (
                  <div className="">
                    <span>Протокол</span>
                    <FileUpLoaderView
                      // Endi bu yerga string emas, tayyorlagan obyektimizni beramiz
                      value={formattedProtocol}

                      id="protocol_file"
                    // Agar sizda "view mode" bo'lsa, o'chirish/yuklashni bloklash uchun:
                    // readonly={true} 
                    />
                  </div>
                ) : (

                  <div className="flex flex-col items-start">
                    <span>Protocol</span>
                    <span>Hujjat mavjud emas</span>
                  </div>
                )}
              </div>
            </Tag>




          </Wrapper>
        </div>

        {/* BUTTONLAR BLOKI */}
        <div className="grid grid-cols-12 gap-4 mt-5">
          <div className="col-span-6">
            <Button onClick={() => navigate(-1)} theme={BUTTON_THEME.OUTLINE}>
              Back
            </Button>
          </div>

          <div className="col-span-6 justify-end flex">
            <div className="flex gap--lg items-center">
              <Button
                // onClick={() => operatorApproveAppeal()}
                theme={BUTTON_THEME.PRIMARY}
              >
                Bitim tuzish
              </Button>
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default Index;
