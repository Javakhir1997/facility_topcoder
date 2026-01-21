import { useMemo } from "react";
import {
  Button,
  FileUpLoaderView,
  GridWrapper,
  PageLayout,
  PageTitle,
  Row,
  Tag,
} from "@app/components";
import Wrapper from "@components/Wrapper";
import { BUTTON_THEME } from "@app/shared";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { IWinnerObjectDetail } from "@interfaces/application.interface";
import { useWinnerDetailToDeal } from "@modules/tender/hooks";

const Index = () => {
  const { data } = useWinnerDetailToDeal();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const formattedProtocol = useMemo(() => {
    if (!data?.protocol) return null;
    const fileName = data.protocol.split("/").pop() || "unknown_file.pdf";
    const extension = fileName.split(".").pop();

    return {
      id: "protocol_unique_id",
      name: fileName,
      url: data.protocol,
      size: 0,
      ext: extension,
      type: extension,
    };
  }, [data?.protocol]);

  const formattedConception = useMemo(() => {
    if (!data?.concept) return null;
    const fileName = data.concept.split("/").pop() || "unknown_file.pdf";

    const extension = fileName.split(".").pop();

    return {
      id: "concept_unique_id",
      name: fileName,
      url: data.concept,
      size: 0,
      ext: extension,
      type: extension,
    };
  }, [data?.concept]);

  return (
    <div>
      <PageLayout>
        <PageTitle title="Asosiy" />

        <div className="mt-5">
          <Wrapper>
            <div className="grid grid-cols-12 gap-5">
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
                    value={(data?.region?.name as string) || "Бухоро вилояти"}
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
                          {data.object.map((item: IWinnerObjectDetail) => (
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
                      value={formattedConception}
                      id="concep_file"
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
                      value={formattedProtocol}
                      id="protocol_file"
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

        <div className="grid grid-cols-12 gap-4 mt-5">
          <div className="col-span-6">
            <Button onClick={() => navigate(-1)} theme={BUTTON_THEME.OUTLINE}>
              Back
            </Button>
          </div>

          <div className="col-span-6 justify-end flex">
            <div className="flex gap--lg items-center">
              <Button theme={BUTTON_THEME.PRIMARY}>Bitim tuzish</Button>
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default Index;
