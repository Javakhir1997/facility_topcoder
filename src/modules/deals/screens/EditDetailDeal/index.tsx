import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    Button,
    FileUpLoader,
    FileUpLoaderDoc,
    FormColumn,
    PageLayout,
    PageTitle,
    Tag,
    Wrapper
} from '@app/components';
import { BUTTON_THEME } from '@app/shared';
import { useDealDetail, useEditDealFile } from '@modules/deals/hooks';
import { IFIle } from "@app/interfaces";

const Index = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // 1. Bitim tafsilotlarini yuklash
    const { data, isPending: isDataLoading } = useDealDetail();

    // 2. Forma sozlamalari
    const { control, handleSubmit, reset, setValue } = useForm({
        defaultValues: {
            docx_file: null as IFIle | null,
        }
    });

    // 3. Edit mutation hook
    const { editDealFile, isPending: isMutationPending } = useEditDealFile(reset);

    // 4. Ma'lumot kelishi bilan mavjud fayl ID-sini biriktiramiz
    useMemo(() => {
        if (data?.docx_attachment) {
            // data ichidagi haqiqiy UUID maydonini toping
            const realId = data.docx_attachment_id || data.attachment_id || data.docx_file_id;

            if (realId) {
                setValue('docx_file', {
                    id: realId, // BU YERDA UUID BO'LISHI SHART
                    name: data.docx_attachment.split('/').pop() || "bitim.docx",
                    url: data.docx_attachment,
                } as IFIle);
            }
        }
    }, [data, setValue]);

    // 5. Saqlash funksiyasi
    const onSubmit = (formData: any) => {
        const currentFile = formData.docx_file;

        // 1. Fayl yoki uning ID-si yo'qligini tekshirish
        if (!currentFile?.id) {
            alert("Fayl ID-si topilmadi!");
            return;
        }

        // 2. Payload: { file: IFIle }
        const payload = {
            file: currentFile
        };

        console.log("Backendga ketayotgan haqiqiy ID:", currentFile.id);
        editDealFile(payload as any);
    };

    if (isDataLoading) return <PageLayout>Yuklanmoqda...</PageLayout>;

    return (
        <PageLayout>
            <div className="w-full">
                <div className="flex justify-between items-center mb--md">
                    <PageTitle title={`Hujjatni yangilash #${data?.id || ''}`} />
                    <Button type="button" theme={BUTTON_THEME.OUTLINE} onClick={() => navigate(-1)}>
                        {t('common.back') || 'Orqaga'}
                    </Button>
                </div>

                <FormColumn>
                    <Wrapper className="w-full">
                        <Tag title="Hujjatni tahrirlash" type="vertical">
                            <div className="py--md w-full">
                                <div className="p--md border--radius-md bg--white border">
                                    <Controller
                                        name="docx_file"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                                            <div className="flex flex-col gap--sm">
                                                <FileUpLoaderDoc
                                                    key={value?.id || 'uploader'}
                                                    id="docx_update"
                                                    value={value as unknown as IFIle}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    label="Bitim Word (DOCX) fayli"
                                                    error={error?.message}
                                                    className="w-full"
                                                />
                                            </div>
                                        )}
                                    />
                                    <p className="text--xs text--gray mt--sm italic">
                                        * Mavjud fayl ID-si orqali yangilanadi. Yangi fayl tanlasangiz, ID avtomatik o'zgaradi.
                                    </p>
                                </div>
                            </div>
                        </Tag>

                        <div className="flex justify-end mt--xl pb--xl">
                            <Button
                                theme={BUTTON_THEME.PRIMARY}
                                size="lg"
                                loading={isMutationPending ? true : undefined}
                                onClick={handleSubmit(onSubmit)}
                            >
                                {t('common.save') || 'Saqlash va yangilash'}
                            </Button>
                        </div>
                    </Wrapper>
                </FormColumn>
            </div>
        </PageLayout>
    );
};

export default Index;