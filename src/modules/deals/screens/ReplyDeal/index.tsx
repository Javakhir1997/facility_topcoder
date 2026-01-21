import {
    Button,
    FileUpLoader,
    Wrapper,
    Switch,
    PageLayout,
    PageTitle,
    HR,
    Input,
    FormGrid, Tag, Status,
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
import {useAppealDetail, useReply} from "@modules/applications/hooks";
import {useAppContext} from "@app/hooks";
import {IReplyAppealForm} from "@app/interfaces";


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
            // responseDate: '',
            responseText: '',
            files: undefined,
        },
    });

    const navigate = useNavigate()
    const {data} = useAppealDetail()
    const {user} = useAppContext()
    const {replyAppeal, isPending} = useReply(reset)

    return (
        <PageLayout>
            <PageTitle title="Send reply letter"/>
            <Wrapper>
                <div className="flex gap--5xl items-center">
                    <Tag title="Request status">
                        {
                            data?.status &&
                            <Status status={data.status}/>
                        }
                    </Tag>
                    {
                        [ROLE_LIST.FINANCE_EMPLOYEE].includes(user.role) &&
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

                    {/*<Controller*/}
                    {/*    name="responseDate"*/}
                    {/*    control={control}*/}
                    {/*    render={({field: {value, onChange, onBlur, ref}}) => (*/}
                    {/*        <MaskInput*/}
                    {/*            ref={ref}*/}
                    {/*            id="responseDate"*/}
                    {/*            label="Date"*/}
                    {/*            placeholder="Enter the date"*/}
                    {/*            value={value}*/}
                    {/*            onChange={onChange}*/}
                    {/*            onBlur={onBlur}*/}
                    {/*            error={errors?.responseDate?.message}*/}
                    {/*        />*/}
                    {/*    )}*/}
                    {/*/>*/}

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
