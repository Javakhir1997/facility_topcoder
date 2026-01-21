import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    BUTTON_THEME,
    convertDateFormat,
    electricityReportSchema,
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
import {FC, useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useReportDetail, useAddReport, useEditReport} from "@modules/electricity/hooks";

interface IProperties {
    edit?: boolean;
}

const AddReportPage: FC<IProperties> = ({edit = false}) => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const {year = ''} = getSearchParamsAsObject(searchParams);
    const {t} = useTranslation();

    const {
        control,
        handleSubmit,
        register,
        reset,
        formState: {errors},
    } = useForm({
        defaultValues: {
            electricity_capacity: "",
            description: "",
            files: undefined,
        },
        resolver: yupResolver(electricityReportSchema),
    });

    const {data, isPending} = useReportDetail(edit);
    const {addReport, isPending: isAddPending} = useAddReport(reset);
    const {editReport, isPending: isEditPending} = useEditReport(reset);

    useEffect(() => {
        if (data && edit) {
            reset({
                description: data?.description as string,
                electricity_capacity: data.electricity_capacity,
                files: data.files ?? undefined
            })
        }
    }, [data, edit, reset]);

    return (
        <PageLayout>
            <PageTitle
                title={edit ? `${t('Edit')} - ${year ? `${t(year)} ${t('year')}` : ""}` : `${t('Fill in the plan')} - ${year ? `${t(year)} ${t('year')}` : ""}`}/>
            <ShowIf show={edit}>
                <Wrapper>
                    <div className="flex gap--5xl items-center">
                        <Tag title="Action" string>
                            {data?.electricity_capacity}
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
                    name="electricity_capacity"
                    render={({field}) => (
                        <NumberFormattedInput
                            id="electricity_capacity"
                            placeholder="Enter actual electricity consumption (kWh)"
                            label="Actual electricity consumption (kWh)"
                            error={errors?.electricity_capacity?.message}
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
