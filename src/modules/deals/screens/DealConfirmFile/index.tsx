import {
  Button,
  FileUpLoader,
  FileUpLoaderView,
  FormGrid,
  PageLayout,
  PageTitle,
  Tag,
  Wrapper
} from '@app/components'
import { useDealDetail } from '@modules/deals/hooks'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { IFIle } from "@app/interfaces";
import { useEffect, useMemo } from "react";
// 1. useForm va Controller import qilindi
import { Controller, useForm } from 'react-hook-form' 

const Index = () => {
    const { data, isPending } = useDealDetail();
    console.log(data, 'yayayayaya')
    
    // 2. XATO BERAYOTGAN QATOR OLIB TASHLANDI:
    // const { user } = useAppContext(); <--- Bu qator xato va kerak emas edi

    const navigate = useNavigate();
    const { t } = useTranslation();

    // 3. useForm chaqirildi (Control xatosi uchun)
    const { control } = useForm({
        defaultValues: {
            indebtedness_file: null 
        }
    });

    const formattedpdf_attachment = useMemo(() => {
        if (!data?.pdf_attachment) return null;
        const fileName = data?.pdf_attachment.split('/').pop() || "unknown_file.pdf";
        const extension = fileName.split('.').pop();

        return {
            id: "protocol_unique_id",
            name: fileName,
            url: data.pdf_attachment,
            size: 0,
            ext: extension,
            type: extension
        };
    }, [data?.pdf_attachment]);

    const formatteddocx_attachment = useMemo(() => {
        if (!data?.docx_attachment) return null;
        const fileName = data?.docx_attachment.split('/').pop() || "unknown_file.pdf";
        const extension = fileName.split('.').pop();

        return {
            id: "concept_unique_id",
            name: fileName,
            url: data.docx_attachment,
            size: 0,
            ext: extension,
            type: extension
        };
    }, [data?.docx_attachment]);

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
                                    value={formattedpdf_attachment}
                                    id="concep_file"
                                />
                            </div>
                            <div className="">
                                <span>Deal file docx</span>
                                <FileUpLoaderView
                                    value={formatteddocx_attachment}
                                    id="protocol_file"
                                />
                            </div>

                            <Controller
                                name="indebtedness_file"
                                control={control} // Endi control mavjud
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