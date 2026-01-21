import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    BUTTON_THEME,
    electricityPlanSchema,
    FIELD,
    generateYearsList,
    getSearchParamsAsObject,
    getSelectValue,
} from "@app/shared";
import {
    PageLayout,
    PageTitle,
    Button,
    FormGrid,
    Select,
    NumberFormattedInput,
    Tag,
    Loader
} from "@app/components";
import {FC, useEffect} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useAddPlan, useApplicationDurationByObjectId, useEditPlan, usePlanDetail} from "@modules/electricity/hooks";

interface IProperties {
    edit?: boolean;
}

const Index: FC<IProperties> = ({edit = false}) => {
    const navigate = useNavigate();
    const {id = ""} = useParams();
    const {t} = useTranslation()
    const [searchParams] = useSearchParams();
    const {objectId = "", year = ""} = getSearchParamsAsObject(searchParams);
    // const {data} = useApplicationDetail(!!applicationId || (!edit && !!id), applicationId ? applicationId : id)

    const {
        isPending,
        starDate,
        endDate
    } = useApplicationDurationByObjectId(!!objectId || (!edit && !!id), objectId)

    const {
        handleSubmit,
        reset,
        control,
        formState: {errors},
    } = useForm({
        mode: "onTouched",
        defaultValues: {
            electricity_capacity: "",
            year: undefined,
        },
        resolver: yupResolver(electricityPlanSchema),
    });

    const {addElectricity, isPending: isAdding} = useAddPlan(reset);
    const {planDetail} = usePlanDetail(year ?? starDate, edit && (!!starDate || !!year));
    const {editElectricity, isPending: isEditing} = useEditPlan(reset);

    useEffect(() => {
        if (planDetail && edit && id) {
            reset({
                electricity_capacity: planDetail.electricity_capacity,
                year: String(planDetail.year),
            })
        }
    }, [planDetail, id, reset, edit]);

    if (isPending) {
        return <PageLayout>
            <Loader/>
        </PageLayout>
    }

    return (
        <PageLayout>
            <PageTitle title={edit ? `${t('Edit')} - ${year ? `${t(year)} ${t('year')}` : ""}` : "Fill in the plan"}/>
            {/*<Wrapper>*/}
            {/*    <div className="flex gap--5xl items-center">*/}
            {/*        <Tag title="Application status">*/}
            {/*            {*/}
            {/*                data?.status &&*/}
            {/*                <Status status={data.status}/>*/}
            {/*            }*/}
            {/*        </Tag>*/}
            {/*        <Tag title="Date" string>*/}
            {/*            {convertDateFormat(data?.created_at)}*/}
            {/*        </Tag>*/}
            {/*    </div>*/}
            {/*    <HR/>*/}
            {/*    <div className="grid grid--cols-2 gap--lg">*/}
            {/*        <GridWrapper>*/}
            {/*            <Row label="Objects" value={formatString(data?.appeal?.sxo_objects ?? [])}/>*/}
            {/*            <Row label="Amount (in sum)" value={data?.cost} background/>*/}
            {/*        </GridWrapper>*/}
            {/*        <GridWrapper>*/}
            {/*            <Row label="Duration (from)" value={data?.from_date ? `${data?.from_date} ${t('year')}` : ''}/>*/}
            {/*            <Row*/}
            {/*                label="Duration (to)" value={data?.to_date ? `${data?.to_date} ${t('year')}` : ''}*/}
            {/*                background*/}
            {/*            />*/}
            {/*        </GridWrapper>*/}
            {/*    </div>*/}
            {/*</Wrapper>*/}
            <FormGrid
                onSubmit={handleSubmit((data) => edit ? editElectricity(data) : addElectricity(data))}
            >
                <Controller
                    name="year"
                    control={control}
                    render={({field: {value, ref, onChange, onBlur}}) => (
                        <Select
                            ref={ref}
                            id="year"
                            disabled={edit}
                            options={generateYearsList(starDate, endDate)}
                            onBlur={onBlur}
                            label="Year"
                            error={errors?.year?.message}
                            value={getSelectValue(generateYearsList(starDate, endDate), value)}
                            placeholder="Select the year"
                            defaultValue={getSelectValue(generateYearsList(starDate, endDate), value)}
                            handleOnChange={(e) => onChange(e as string)}
                        />
                    )}
                />

                <Tag
                    title="Forecast when the project is implemented by the state partner"
                    className="col-span--2"
                    bold={true}
                    type="vertical"
                >
                    <div className="grid grid--cols-3 gap--2xl w-full">
                        <Controller
                            control={control}
                            name="electricity_capacity"
                            render={({field}) => (
                                <NumberFormattedInput
                                    id="electricity_capacity"
                                    label="Planned electricity consumption (kWh)"
                                    placeholder="Enter planned electricity consumption (kWh)"
                                    error={errors.electricity_capacity?.message}
                                    {...field}
                                />
                            )}
                        />
                    </div>
                </Tag>
                <div className="flex justify-between gap--lg items-center col-span--2">
                    <Button
                        type={FIELD.BUTTON}
                        theme={BUTTON_THEME.OUTLINE}
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </Button>
                    <Button
                        type={FIELD.SUBMIT}
                        theme={BUTTON_THEME.PRIMARY}
                        disabled={isAdding || isEditing}
                    >
                        {edit ? "Edit" : "Save"}
                    </Button>
                </div>
            </FormGrid>
        </PageLayout>
    );
};

export default Index;
