import {
    Button, FileUpLoader,
    FormGrid,
    HR,
    Input,
    PageLayout,
    PageTitle,
    Restricted,
    Tag,
    Wrapper,
} from "@app/components";
import {
    BUTTON_THEME,
    convertDateFormat,
    FIELD,
    returnSchema,
    ROLE_LIST,
} from "@app/shared";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useNavigate} from "react-router-dom";
import {useReturn} from "@modules/applications/hooks";
import {IReturnAppealForm} from "@app/interfaces";
import {useReportDetail} from "@modules/investments/hooks";


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

    const navigate = useNavigate()
    const {data} = useReportDetail()
    const {returnAppeal, isPending} = useReturn(reset, true)

    return (
        <PageLayout>
            <PageTitle title="Return"/>
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
                <HR/>
                <Restricted permittedRole={ROLE_LIST.REGION_OPERATOR}>
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
