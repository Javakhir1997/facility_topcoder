import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    addReportSchema,
    BUTTON_THEME, convertDateFormat,
    FIELD,
    getSearchParamsAsObject,
    STATUS_LIST
} from "@app/shared";
import {
    Button,
    Input,
    FormGrid,
    FileUpLoader,
    PageLayout,
    PageTitle,
    NumberFormattedInput,
    ShowIf,
    Tag,
    HR,
    Wrapper,
} from "@app/components";
import {useAddReport, useEditReport, useReportDetail} from "@modules/investments/hooks";
import {FC, useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

interface IProperties {
    edit?: boolean;
}

const AddReportPage: FC<IProperties> = ({edit = false}) => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const {name = ''} = getSearchParamsAsObject(searchParams);
    const {t} = useTranslation();

    const {
        control,
        handleSubmit,
        register,
        reset,
        formState: {errors},
    } = useForm({
        defaultValues: {
            cost: "",
            description: "",
            files: undefined,
        },
        resolver: yupResolver(addReportSchema),
    });

    const {data, isPending} = useReportDetail(edit);
    const {addReport, isPending: isAddPending} = useAddReport(reset);
    const {editReport, isPending: isEditPending} = useEditReport(reset);

    useEffect(() => {
        if (data && edit) {
            reset({
                description: data?.description as string,
                cost: data.cost,
                files: data.files ?? undefined
            })
        }
    }, [data, edit, reset]);

    return (
        <PageLayout>
            <PageTitle
                title={edit ? `${t('Edit')} - ${name ? t(name) : ""}` : `${t('Fill in the plan')} - ${name ? t(name) : ""}`}/>
            <ShowIf show={edit}>
                <Wrapper>
                    <div className="flex gap--5xl items-center">
                        <Tag title="Action" string>
                            {data?.cost}
                        </Tag>
                        <Tag title="Date" string>
                            {convertDateFormat(data?.created_at)}
                        </Tag>
                    </div>
                    <HR/>
                    <Tag title="Comment" type="vertical" string>
                        <div className="grid grid--cols-3 gap--lg">
                            {data?.description}
                        </div>
                    </Tag>
                    <HR/>
                    <Tag title="Documents" type="vertical">
                        <div className="grid grid--cols-3 gap--lg">
                            {data?.files?.map((file) => (
                                <FileUpLoader key={file.id} value={file} id={file.id as string}/>
                            ))}
                        </div>
                    </Tag>
                    <ShowIf show={data?.status === STATUS_LIST.REJECTED}>
                        <HR/>
                        <Tag title="Reason for return" type="vertical" string>
                            <div className="grid grid--cols-3 gap--lg">
                                {data?.operator_note}
                            </div>
                        </Tag>
                    </ShowIf>
                </Wrapper>
            </ShowIf>
            <FormGrid onSubmit={handleSubmit((data) => edit ? editReport(data) : addReport(data))}>
                <Controller
                    control={control}
                    name="cost"
                    render={({field}) => (
                        <NumberFormattedInput
                            id="cost"
                            label="Amount (in sum)"
                            placeholder="Enter the amount (in sum)"
                            error={errors?.cost?.message}
                            {...field}
                        />
                    )}
                />

                <div className='col-span--2'>
                    <Input
                        id="description"
                        type={FIELD.TEXTAREA}
                        textarea={true}
                        label="Comment"
                        placeholder="Enter the comment"
                        error={errors?.description?.message}
                        {...register("description")}
                    />
                </div>

                <Controller
                    name="files"
                    control={control}
                    render={({field: {value, onChange}}) => (
                        <FileUpLoader
                            id="files"
                            label="Documents"
                            value={value}
                            multi={true}
                            onChange={onChange}
                            error={errors?.files?.message}
                        />
                    )}
                />

                <div className="flex justify-between col-span--2 grid-row--4">
                    <Button theme={BUTTON_THEME.OUTLINE}
                            type="button" onClick={() => navigate(-1)}>
                        Back
                    </Button>
                    <Button type="submit" disabled={isPending || isAddPending || isEditPending}>
                        {
                            edit ? "Edit" : "Submit"
                        }
                    </Button>
                </div>
            </FormGrid>
        </PageLayout>
    );
};

export default AddReportPage;
