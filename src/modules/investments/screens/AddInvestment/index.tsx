import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    BUTTON_THEME,
    convertDateFormat,
    FIELD,
    formatString,
    generateYearsList,
    getSearchParamsAsObject,
    getSelectValue,
    investmentsPlanSchema
} from "@app/shared";
import {
    PageLayout,
    PageTitle,
    Button,
    FormGrid,
    Select,
    NumberFormattedInput,
    Tag,
    Status,
    GridWrapper,
    Row,
    Wrapper,
    Loader
} from "@app/components";
import {
    useAddInvestment,
    useApplicationDuration,
    useEditInvestment,
    useInvestmentDetail
} from "@modules/investments/hooks";
import {FC, useEffect} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {IAddInvestmentForm} from "@app/interfaces";
import {useApplicationDetail} from "@modules/applicationsOld/hooks";
import HR from "@components/HR";
import {useTranslation} from "react-i18next";

interface IProperties {
    edit?: boolean;
}

const Index: FC<IProperties> = ({edit = false}) => {
    const navigate = useNavigate();
    const {id = ""} = useParams();
    const {t} = useTranslation()
    const [searchParams] = useSearchParams();
    const {applicationId = ""} = getSearchParamsAsObject(searchParams);
    const {data} = useApplicationDetail(!!applicationId || (!edit && !!id), applicationId ? applicationId : id)
    const {
        isPending,
        starDate,
        endDate
    } = useApplicationDuration(!!applicationId || (!edit && !!id), applicationId ? applicationId : id)

    const {
        handleSubmit,
        reset,
        control,
        formState: {errors},
    } = useForm({
        mode: "onTouched",
        defaultValues: {
            foracast_electricity_cost: "",
            exploitation_cost: "",
            exploitation_salary: "",
            exploitation_electricity_cost: "",
            exploitation_full_repair: "",
            exploitation_current_repair: "",
            exploitation_other_cost: "",
            investment_funds: "",
            year: undefined,
        },
        resolver: yupResolver(investmentsPlanSchema),
    });


    const {addInvestment, isPending: isAdding} = useAddInvestment(reset);
    const {data: investmentDetail} = useInvestmentDetail(edit);
    const {editInvestment, isPending: isEditing} = useEditInvestment(reset, applicationId);

    useEffect(() => {
        if (investmentDetail && edit && id) {
            reset({
                foracast_electricity_cost: investmentDetail.foracast_electricity_cost.cost,
                exploitation_cost: investmentDetail.exploitation_cost.cost,
                exploitation_salary: investmentDetail.exploitation_salary.cost,
                exploitation_electricity_cost: investmentDetail.exploitation_electricity_cost.cost,
                exploitation_full_repair: investmentDetail.exploitation_full_repair.cost,
                exploitation_current_repair: investmentDetail.exploitation_current_repair.cost,
                exploitation_other_cost: investmentDetail.exploitation_other_cost.cost,
                investment_funds: investmentDetail.investment_funds.cost,
                year: String(investmentDetail.year),
            })
        }
    }, [investmentDetail, id, reset, edit]);

    if (isPending) {
        return <PageLayout>
            <Loader/>
        </PageLayout>
    }

    return (
        <PageLayout>
            <PageTitle title={edit ? `ID: ${applicationId} - ${t('Edit')}` : "Fill in the plan"}/>
            <Wrapper>
                <div className="flex gap--5xl items-center">
                    <Tag title="Application status">
                        {
                            data?.status &&
                            <Status status={data.status}/>
                        }
                    </Tag>
                    <Tag title="Date" string>
                        {convertDateFormat(data?.created_at)}
                    </Tag>
                </div>
                <HR/>
                <div className="grid grid--cols-2 gap--lg">
                    <GridWrapper>
                        <Row label="Objects" value={formatString(data?.appeal?.sxo_objects ?? [])}/>
                        <Row label="Amount (in sum)" value={data?.cost} background/>
                    </GridWrapper>
                    <GridWrapper>
                        <Row label="Duration (from)" value={data?.from_date ? `${data?.from_date} ${t('year')}` : ''}/>
                        <Row
                            label="Duration (to)" value={data?.to_date ? `${data?.to_date} ${t('year')}` : ''}
                            background
                        />
                    </GridWrapper>
                </div>
            </Wrapper>
            <FormGrid
                onSubmit={handleSubmit((data: IAddInvestmentForm) => edit ? editInvestment(data) : addInvestment(data))}
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
                            name="foracast_electricity_cost"
                            render={({field}) => (
                                <NumberFormattedInput
                                    id="foracast_electricity_cost"
                                    label="Electricity expenses"
                                    placeholder="Enter electricity expenses"
                                    error={errors.foracast_electricity_cost?.message}
                                    {...field}
                                />
                            )}
                        />
                    </div>
                </Tag>

                <Tag
                    title="Total expenses forecast for project implementation by the private partner"
                    className="col-span--2"
                    bold={true}
                    type="vertical"
                >
                    <div className="grid grid--cols-3 gap--2xl w-full">

                        <Controller
                            control={control}
                            name="exploitation_cost"
                            render={({field}) => (
                                <NumberFormattedInput
                                    id="exploitation_cost"
                                    label="Operation (Allocation of budget funds)"
                                    placeholder="Enter operation (Allocation of budget funds)"
                                    error={errors?.exploitation_cost?.message}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="exploitation_salary"
                            render={({field}) => (
                                <NumberFormattedInput
                                    id="exploitation_salary"
                                    label="Wages"
                                    placeholder="Enter wages"
                                    error={errors?.exploitation_salary?.message}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="exploitation_electricity_cost"
                            render={({field}) => (
                                <NumberFormattedInput
                                    id="exploitation_electricity_cost"
                                    label="Electricity expenses"
                                    placeholder="Enter electricity expenses"
                                    error={errors?.exploitation_electricity_cost?.message}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="exploitation_full_repair"
                            render={({field}) => (
                                <NumberFormattedInput
                                    id="exploitation_full_repair"
                                    label="Full repair"
                                    placeholder="Enter full repair"
                                    error={errors?.exploitation_full_repair?.message}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="exploitation_current_repair"
                            render={({field}) => (
                                <NumberFormattedInput
                                    id="exploitation_current_repair"
                                    label="Current repair"
                                    placeholder="Enter current repair"
                                    error={errors?.exploitation_current_repair?.message}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="exploitation_other_cost"
                            render={({field}) => (
                                <NumberFormattedInput
                                    id="exploitation_other_cost"
                                    label="Other expenses"
                                    placeholder="Enter other expenses"
                                    error={errors?.exploitation_other_cost?.message}
                                    {...field}
                                />
                            )}
                        />
                    </div>
                </Tag>


                <Tag
                    title="Investment funds contributed by the private partner"
                    className="col-span--2"
                    bold={true}
                    type="vertical"
                >
                    <div className="grid grid--cols-3 gap--2xl w-full">
                        <Controller
                            control={control}
                            name="investment_funds"
                            render={({field}) => (
                                <NumberFormattedInput
                                    id="investment_funds"
                                    label="Investment funds contributed by private partner"
                                    placeholder="Enter investment funds contributed by private partner"
                                    error={errors?.investment_funds?.message}
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
