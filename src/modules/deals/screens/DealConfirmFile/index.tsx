import {
    Button,
    FileUpLoader,
    FileUpLoaderView,
    FormGrid,
    GridWrapper,
    PageLayout,
    PageTitle,
    Restricted,
    Row, ShowIf,
    Status, Table,
    Tag,
    Wrapper
} from '@app/components'
import { BUTTON_THEME, convertDateFormat, formatString, ROLE_LIST, STATUS_LIST } from '@app/shared'
import HR from '@components/HR'
import { useDealDetail, useOperatorApprove } from '@modules/deals/hooks'
import { useAppContext } from '@app/hooks'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next";
// import UseConfirmApplication from "@modules/appeals/hooks/useConfirmApplication.ts";
import { Link } from "@radix-ui/themes";
import { Column } from "react-table";
import { IFIle, IPerformer } from "@app/interfaces";
import { useEffect, useMemo, useState } from "react";
import UseConfirmApplication from "@modules/deals/hooks/useConfirmApplication.ts";
import UseConfirmByPerformerApplication from "@modules/deals/hooks/useConfirmPerformerApplication.ts";
import UseConfirmByHavzaApplication from "@modules/deals/hooks/useConfirmHavzaApplication.ts";
import { Modal } from "@components/UI";
import { Controller } from 'react-hook-form'


const Index = () => {

    const { data, isPending } = useDealDetail();
    console.log(data, 'yayayayaya')
    const { user } = useAppContext();
    const navigate = useNavigate();




    const formattedpdf_attachment = useMemo(() => {
        if (!data?.pdf_attachment) return null;

        // URL: .../attachments/Master_Food_8VSdkeI.pdf
        // "split" orqali oxirgi qismini (fayl nomini) ajratib olamiz
        const fileName = data?.pdf_attachment.split('/').pop() || "unknown_file.pdf";

        // Fayl kengaytmasini olamiz (pdf, docx va h.k - icon uchun kerak)
        const extension = fileName.split('.').pop();

        return {
            id: "protocol_unique_id", // Shunchaki unikal ID
            name: fileName,           // "Master_Food_8VSdkeI.pdf"
            url: data.pdf_attachment,       // To'liq havola
            size: 0,                  // DIQQAT: URL dan hajmni bilib bo'lmaydi, shuning uchun 0 yoki yashirib qo'yasiz
            ext: extension,           // "pdf"
            type: extension           // Ba'zi komponentlar type kutadi
        };
    }, [data?.pdf_attachment]);

    const formatteddocx_attachment = useMemo(() => {
        if (!data?.docx_attachment) return null;

        // URL: .../attachments/Master_Food_8VSdkeI.pdf
        // "split" orqali oxirgi qismini (fayl nomini) ajratib olamiz
        const fileName = data?.docx_attachment.split('/').pop() || "unknown_file.pdf";

        // Fayl kengaytmasini olamiz (pdf, docx va h.k - icon uchun kerak)
        const extension = fileName.split('.').pop();

        return {
            id: "concept_unique_id", // Shunchaki unikal ID
            name: fileName,           // "Master_Food_8VSdkeI.pdf"
            url: data.docx_attachment,       // To'liq havola
            size: 0,                  // DIQQAT: URL dan hajmni bilib bo'lmaydi, shuning uchun 0 yoki yashirib qo'yasiz
            ext: extension,           // "pdf"
            type: extension           // Ba'zi komponentlar type kutadi
        };
    }, [data?.docx_attachment]);
    useEffect(() => {

    }, [data]);

    // const ConfirmApplication = async  () => {
    // 	confirmApplication()
    // }

    const { t } = useTranslation();



    useEffect(() => {

    }, [data]);


    return (
        <PageLayout>
            <PageTitle title="Bitim" />
            <FormGrid>
                <Wrapper>
                    <Tag title="Documents" type="vertical">
                        <div className="grid grid--cols-3 gap--lg items-center">

                            <div className="">
                                <span>Deal file pdf</span>
                                <FileUpLoaderView
                                    // Endi bu yerga string emas, tayyorlagan obyektimizni beramiz

                                    value={formattedpdf_attachment}
                                    id="concep_file"
                                // Agar sizda "view mode" bo'lsa, o'chirish/yuklashni bloklash uchun:
                                // readonly={true} 
                                />
                            </div>
                            <div className="">
                                <span>Deal file docx</span>
                                <FileUpLoaderView
                                    // Endi bu yerga string emas, tayyorlagan obyektimizni beramiz
                                    value={formatteddocx_attachment}

                                    id="protocol_file"
                                // Agar sizda "view mode" bo'lsa, o'chirish/yuklashni bloklash uchun:
                                // readonly={true} 
                                />
                            </div>

                            <Controller
                                name="indebtedness_file"
                                control={control}
                                render={({ field: { value, ref, onChange, onBlur }, fieldState: { error } }) => (
                                    <FileUpLoader
                                        id="indebtedness_file"
                                        ref={ref}
                                        value={value as unknown as IFIle}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        label={t('appeals.debt_certificate')}
                                        error={error?.message}
                                    />
                                )}
                            />



                        </div>
                    </Tag>
                </Wrapper>
            </FormGrid>


        </PageLayout>
    )
}

export default Index
