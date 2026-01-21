import {
    Button,
    FileUpLoader,
    FileUpLoaderView,
    FormColumn,
    GridWrapper,
    PageLayout,
    PageTitle,
    Row,
    Status,
    Tag,
    Wrapper
} from '@app/components'
import { BUTTON_THEME, STATUS_LIST } from '@app/shared'
import { useDealDetail, useConfirmFileDeal } from '@modules/deals/hooks'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { IFIle } from "@app/interfaces";
import { useMemo } from "react";
import { useForm, Controller, useFieldArray } from 'react-hook-form'

const Index = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    
    // 1. Ma'lumotlarni yuklab olish
    const { data, isPending: isDataLoading } = useDealDetail();

    // 2. Forma sozlamalari
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            indebtedness_file: null as any,
            additional_files: [] as { file: any }[]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "additional_files"
    });

    // 3. Mutation hook (reset funksiyasini uzatamiz)
    const { addConfirmFilesDeal, isPending: isMutationPending } = useConfirmFileDeal(reset);

    // 4. Submit mantiqi (JSON formatida faqat ID-larni yuborish)
    const onSubmit = (formData: any) => {
        const fileIds: string[] = [];

        // Asosiy fayl ID sini olish
        if (formData.indebtedness_file?.id) {
            fileIds.push(formData.indebtedness_file.id);
        }

        // Qo'shimcha fayllar ID larini olish
        formData.additional_files?.forEach((item: any) => {
            if (item.file?.id) {
                fileIds.push(item.file.id);
            }
        });

        // Backend kutyatgan format: { files: ["id1", "id2"] }
        addConfirmFilesDeal({ files: fileIds } as any);
    };

    // Fayllarni ko'rinish uchun formatlash
    const formatFile = (url: string | undefined, id: string) => {
        if (!url) return null;
        const fileName = url.split('/').pop() || "file";
        const extension = fileName.split('.').pop();
        return { id, name: fileName, url, size: 0, ext: extension, type: extension };
    };

    const formattedFiles = useMemo(() => ({
        pdf: formatFile(data?.pdf_attachment, "pdf_id"),
        docx: formatFile(data?.docx_attachment, "docx_id")
    }), [data]);

    if (isDataLoading) return <PageLayout>Yuklanmoqda...</PageLayout>;

    const safeT = (key: string, fallback: string) => {
        return typeof key === 'string' && key.length > 0 ? t(key) : fallback;
    };

    return (
        <PageLayout>
            <div className="w-full">
                <div className="flex justify-between items-center mb--md">
                    <PageTitle title={`Bitim tafsilotlari #${data?.id || ''}`} />
                    <Button type="button" theme={BUTTON_THEME.OUTLINE} onClick={() => navigate(-1)}>
                        {safeT('common.back', 'Orqaga')}
                    </Button>
                </div>

                <Wrapper className="mb--lg w-full">
                    <Tag title="Umumiy ma'lumotlar" type="vertical">
                        <GridWrapper cols={3} gap="xl" className="py--md">
                            <Row title="ID"><span className="text--bold">#{data?.id}</span></Row>
                            <Row title="Ariza raqami"><span>{data?.application || '—'}</span></Row>
                            <Row title="Holati"><Status statusList={STATUS_LIST} status={data?.status} /></Row>
                        </GridWrapper>
                    </Tag>
                </Wrapper>

                <FormColumn>
                    <Wrapper className="w-full">
                        <Tag title="Hujjatlar to'plami" type="vertical">
                            <div className="flex flex-col gap--lg py--md w-full" style={{ gap: '1.5rem' }}>

                                <div className="flex gap--md">
                                    <div className="flex-1 p--md border--radius-md bg--light-gray">
                                        <span className="text--sm font--bold display--block mb--xs">Bitim PDF</span>
                                        <FileUpLoaderView value={formattedFiles.pdf} id="pdf-v" readonly />
                                    </div>
                                    <div className="flex-1 p--md border--radius-md bg--light-gray">
                                        <span className="text--sm font--bold display--block mb--xs">Bitim Word</span>
                                        <FileUpLoaderView value={formattedFiles.docx} id="docx-v" readonly />
                                    </div>
                                </div>

                                <div className="w-full p--md border--radius-md bg--white border">
                                    <Controller
                                        name="indebtedness_file"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, ref, onChange, onBlur }, fieldState: { error } }) => (
                                            <FileUpLoader
                                                id="indebtedness_file"
                                                ref={ref}
                                                value={value as unknown as IFIle}
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                label={safeT('appeals.debt_certificate', "Qarz yo'qligi haqida ma'lumotnoma")}
                                                error={error?.message}
                                                className="w-full"
                                            />
                                        )}
                                    />
                                </div>

                                <div className="flex justify-between items-center mt--md border--top pt--md">
                                    <span className="text--md font--bold">Qo'shimcha hujjatlar</span>
                                    <Button
                                        type="button"
                                        size="sm"
                                        theme={BUTTON_THEME.OUTLINE}
                                        onClick={() => append({ file: null })}
                                    >
                                        + Qo'shish
                                    </Button>
                                </div>

                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex gap--md items-end w-full p--md border--radius-md bg--white shadow--sm border">
                                        <div className="flex-1">
                                            <Controller
                                                name={`additional_files.${index}.file`}
                                                control={control}
                                                render={({ field: { value, ref, onChange, onBlur }, fieldState: { error } }) => (
                                                    <FileUpLoader
                                                        id={`file_${index}`}
                                                        ref={ref}
                                                        value={value as unknown as IFIle}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        label={`Hujjat #${index + 1}`}
                                                        error={error?.message}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <Button
                                            type="button"
                                            theme={BUTTON_THEME.DANGER_OUTLINE}
                                            onClick={() => remove(index)}
                                            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>}
                                            style={{ height: '42px', marginBottom: '4px' }}
                                        >
                                            {/* Faqat string bo'lishi kerak tarjima xatosi bermasligi uchun */}
                                            {String(t('common.delete') || 'Ochirish')}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </Tag>

                        <div className="flex justify-end mt--xl pb--xl">
                            <Button
                                theme={BUTTON_THEME.PRIMARY}
                                size="lg"
                                // Loading warningni oldini olish
                                loading={isMutationPending ? true : undefined}
                                onClick={handleSubmit(onSubmit)}
                            >
                                Saqlash va Tasdiqlash
                            </Button>
                        </div>
                    </Wrapper>
                </FormColumn>
            </div>
        </PageLayout>
    )
}

export default Index;