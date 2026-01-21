import {
    Button,
    FileUpLoader,
    Wrapper,
    Switch,
    PageLayout,
    PageTitle,
    HR,
    Input,
    FormGrid, Tag, Status, ShowIf,
} from "@app/components";
import {
    FIELD,
    BUTTON_THEME,
    appealStatusOptions,
    operatorReplySchema,
    ROLE_LIST,
    STATUS_LIST,
    convertDateFormat
} from "@app/shared";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useNavigate} from "react-router-dom";
import {useReply} from "@modules/applications/hooks";
import {useAppContext} from "@app/hooks";
import {IReplyAppealForm} from "@app/interfaces";
import {useApplicationDetail} from "@modules/applicationsOld/hooks";


const Index = () => {
    const {
        handleSubmit,
        control,
        register,
        reset,
        formState: {errors},
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(operatorReplySchema),
        defaultValues: {
            responseType: 'positive',
            responseText: '',
            files: undefined,
        },
    });

    const navigate = useNavigate()
    const {data} = useApplicationDetail()
    const {user} = useAppContext()
    const {replyAppeal, isPending} = useReply(reset, true)

    return (
        <PageLayout>
            <PageTitle title="Send conclusion"/>
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
                <FormGrid onSubmit={handleSubmit((data: IReplyAppealForm) => replyAppeal(data))}>
                    <div className='col-span--2'>
                        <Controller
                            name="responseType"
                            control={control}
                            render={({field: {value, onChange}}) => (
                                <Switch
                                    onChange={onChange}
                                    value={value}
                                    items={appealStatusOptions}
                                />
                            )}
                        />
                    </div>

                    <Controller
                        name="files"
                        control={control}
                        render={({field: {value, ref, onChange, onBlur}}) => (
                            <FileUpLoader
                                id="files"
                                ref={ref}
                                multi={true}
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                label="Documents"
                                error={errors?.files?.message}
                            />
                        )}
                    />

                    <div className='col-span--2'>
                        <Input
                            id="responseText"
                            type={FIELD.TEXTAREA}
                            textarea={true}
                            label="Reply letter"
                            placeholder="Enter the reply letter"
                            error={errors?.responseText?.message}
                            {...register("responseText")}
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
                            Submit
                        </Button>
                    </div>
                </FormGrid>
            </Wrapper>
        </PageLayout>
    )
}

export default Index
