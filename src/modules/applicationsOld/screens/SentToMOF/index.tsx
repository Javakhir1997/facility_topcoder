import {
    Button,
    FileUpLoader,
    FormGrid,
    HR,
    PageLayout,
    PageTitle,
    Restricted, ShowIf,
    Status,
    Tag,
    Wrapper,
} from "@app/components";
import {
    BUTTON_THEME,
    convertDateFormat,
    FIELD,
    ROLE_LIST, sentSchema,
    STATUS_LIST
} from "@app/shared";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useNavigate} from "react-router-dom";
import {useAppContext} from "@app/hooks";
import {ISentForm} from "@app/interfaces";
import {useApplicationDetail, useSent} from "@modules/applicationsOld/hooks";


const Index = () => {

    const {
        handleSubmit: operatorHandleSubmit,
        reset: operatorReset,
        control: operatorControl,
        formState: {errors: operatorErrors},
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(sentSchema),
        defaultValues: {
            files: undefined,
        },
    });

    const navigate = useNavigate()
    const {data} = useApplicationDetail()
    const {user} = useAppContext()
    const {isPending, sentApplication} = useSent(operatorReset)

    return (
        <PageLayout>
            <PageTitle title="Send the application to MOF"/>
            <Wrapper>
                <div className="flex gap--5xl items-center">
                    <Tag title="Application status">
                        {
                            data?.status &&
                            <Status status={data.status}/>
                        }
                    </Tag>
                    <ShowIf show={![ROLE_LIST.APPLICANT].includes(user.role)}>
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
                <Restricted permittedRole={ROLE_LIST.OPERATOR}>
                    <FormGrid
                        onSubmit={operatorHandleSubmit((data: ISentForm) => sentApplication(data))}>
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
                                Send the application to MOF
                            </Button>
                        </div>
                    </FormGrid>
                </Restricted>
            </Wrapper>
        </PageLayout>
    )
}

export default Index
