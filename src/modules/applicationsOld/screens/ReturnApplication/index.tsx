import {
    Button,
    FileUpLoader,
    FormGrid,
    HR,
    Input,
    PageLayout,
    PageTitle,
    Restricted,
    ShowIf,
    Status,
    Tag,
    Wrapper,
} from "@app/components";
import {BUTTON_THEME, convertDateFormat, FIELD, operatorReturnSchema, ROLE_LIST, STATUS_LIST} from "@app/shared";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useNavigate} from "react-router-dom";
import {useApplicationDetail, useReturn} from "@modules/applicationsOld/hooks";
import {useAppContext} from "@app/hooks";
import {IOperatorReturnAppealForm} from "@app/interfaces";


const Index = () => {
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
    const {data} = useApplicationDetail()
    const {user} = useAppContext()
    const {returnApplication, isPending} = useReturn(operatorReset)

    return (
        <PageLayout>
            <PageTitle title="Return"/>
            <Wrapper>
                <div className="flex gap--5xl items-center">
                    <Tag title="Application status">
                        {
                            data?.status &&
                            <Status status={data.status}/>
                        }
                    </Tag>
                    <ShowIf show={[ROLE_LIST.OPERATOR, ROLE_LIST.HEAD, ROLE_LIST.FINANCE_EMPLOYEE].includes(user.role)}>
                        <Tag title="MOF conclusion">
                            <Status status={data?.answer_type ?? STATUS_LIST.INCOMPLETE}/>
                        </Tag>
                        <Tag title="Application type">
                            {
                                data?.type &&
                                <Status status={data.type}/>
                            }
                        </Tag>
                    </ShowIf>
                    <Tag title="Date" string>
                        {convertDateFormat(data?.created_at)}
                    </Tag>
                </div>
                <HR/>
                <Restricted permittedRole={[ROLE_LIST.OPERATOR, ROLE_LIST.HEAD, ROLE_LIST.FINANCE_EMPLOYEE]}>
                    <FormGrid
                        onSubmit={operatorHandleSubmit((data: IOperatorReturnAppealForm) => returnApplication(data))}>

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
