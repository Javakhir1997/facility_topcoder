import {
    Button,
    FileUpLoader,
    FormGrid,
    HR,
    Input,
    PageLayout,
    PageTitle,
    Restricted,
    Status,
    Tag,
    Wrapper,
} from "@app/components";
import {
    BUTTON_THEME,
    convertDateFormat,
    FIELD,
    operatorReturnSchema,
    returnSchema,
    ROLE_LIST,
    STATUS_LIST
} from "@app/shared";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useNavigate} from "react-router-dom";
import {useAppealDetail, useOperatorReturn, useReturn} from "@modules/applications/hooks";
import {useAppContext} from "@app/hooks";
import {IOperatorReturnAppealForm, IReturnAppealForm} from "@app/interfaces";


const Index = () => {
    const {
        handleSubmit,
        register,
        reset,
        formState: {errors},
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(returnSchema),
        defaultValues: {
            comment: '',
        },
    });

    const {
        handleSubmit: operatorHandleSubmit,
        register: operatorRegister,
        reset: operatorReset,
        control: operatorControl,
        formState: {errors: operatorErrors},
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(operatorReturnSchema),
        defaultValues: {
            files: undefined,
            responseText: '',
        },
    });

    const navigate = useNavigate()
    const {data} = useAppealDetail()
    const {user} = useAppContext()
    const {returnAppeal, isPending} = useReturn(reset)
    const {operatorReturnAppeal, isOperatorPending} = useOperatorReturn(operatorReset)

    return (
        <PageLayout>
            <PageTitle title="Return"/>
            <Wrapper>
                <div className="flex gap--5xl items-center">
                    <Tag title="Request status">
                        {
                            data?.status &&
                            <Status status={data.status}/>
                        }
                    </Tag>
                    {
                        [ROLE_LIST.OPERATOR, ROLE_LIST.HEAD, ROLE_LIST.FINANCE_EMPLOYEE].includes(user.role) &&
                        <>
                            <Tag title="Reply letter">
                                {
                                    data?.status &&
                                    <Status status={data.answer_type ?? STATUS_LIST.INCOMPLETE}/>
                                }
                            </Tag>
                            <Tag title="Type of request">
                                {
                                    data?.status &&
                                    <Status status={data.type}/>
                                }
                            </Tag>
                        </>
                    }
                    <Tag title="Date" string>
                        {convertDateFormat(data?.created_at)}
                    </Tag>
                </div>
                <HR/>

                <Restricted permittedRole={ROLE_LIST.BALANCE}>
                    <FormGrid
                        onSubmit={operatorHandleSubmit((data: IOperatorReturnAppealForm) => operatorReturnAppeal(data))}>

                        <div className='col-span--2'>
                            <Input
                                id="responseText"
                                type={FIELD.TEXTAREA}
                                textarea={true}
                                label="Comment"
                                placeholder="Enter the comment"
                                error={operatorErrors?.responseText?.message}
                                {...operatorRegister("responseText")}
                            />
                        </div>

                        <Controller
                            name="files"
                            control={operatorControl}
                            render={({field: {value, ref, onChange, onBlur}}) => (
                                <FileUpLoader
                                    id="files"
                                    ref={ref}
                                    multi={true}
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    label="Documents"
                                    error={operatorErrors?.files?.message}
                                />
                            )}
                        />

                        <div className="flex justify-between items-center col-span--2">
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
                                disabled={isOperatorPending}
                            >
                                Return
                            </Button>
                        </div>
                    </FormGrid>
                </Restricted>

                <Restricted permittedRole={ROLE_LIST.OPERATOR}>
                    <FormGrid
                        onSubmit={operatorHandleSubmit((data: IOperatorReturnAppealForm) => operatorReturnAppeal(data))}>

                        <div className='col-span--2'>
                            <Input
                                id="responseText"
                                type={FIELD.TEXTAREA}
                                textarea={true}
                                label="Comment"
                                placeholder="Enter the comment"
                                error={operatorErrors?.responseText?.message}
                                {...operatorRegister("responseText")}
                            />
                        </div>

                        <Controller
                            name="files"
                            control={operatorControl}
                            render={({field: {value, ref, onChange, onBlur}}) => (
                                <FileUpLoader
                                    id="files"
                                    ref={ref}
                                    multi={true}
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    label="Documents"
                                    error={operatorErrors?.files?.message}
                                />
                            )}
                        />

                        <div className="flex justify-between items-center col-span--2">
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
                                disabled={isOperatorPending}
                            >
                                Return
                            </Button>
                        </div>
                    </FormGrid>
                </Restricted>

                <Restricted permittedRole={ROLE_LIST.HEAD}>
                    <FormGrid onSubmit={handleSubmit((data: IReturnAppealForm) => returnAppeal(data))}>
                        <div className='col-span--2'>
                            <Input
                                id="comment"
                                type={FIELD.TEXTAREA}
                                textarea={true}
                                label="Comment"
                                placeholder="Enter the comment"
                                error={errors?.comment?.message}
                                {...register("comment")}
                            />
                        </div>
                        <div className="flex justify-between items-center col-span--2">
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
                                disabled={isPending}
                            >
                                Return
                            </Button>
                        </div>
                    </FormGrid>
                </Restricted>
            </Wrapper>
        </PageLayout>
    )
}

export default Index
