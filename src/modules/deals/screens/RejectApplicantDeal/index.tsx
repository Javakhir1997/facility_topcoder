import {
    Button, FileUpLoader,
    HR,
    PageLayout,
    PageTitle,
    Restricted,
    Status,
    Tag,
    Wrapper,
} from "@app/components";
import {
    convertDateFormat,
    ROLE_LIST,
    STATUS_LIST
} from "@app/shared";
import {useDealDetail} from "@modules/deals/hooks";
import {useAppContext} from "@app/hooks";
import useRejectApplicantDeal from "@modules/deals/hooks/useRejectApplicantDeal";
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@shared/component/ui/form';
import {Textarea} from "@shared/component/ui/textarea.tsx";
import type {RejectApplicationDTO} from "@entities/application";
import {IFIle} from "@app/interfaces";
import { RejectDealDTO } from "@entities/deal";

const Index = () => {
    // const navigate = useNavigate()
    const {data} = useDealDetail()
    const {user} = useAppContext()
    const {form, rejectApplicantDeal} = useRejectApplicantDeal()

    const handleFormSubmit = (data: RejectDealDTO) => {
        // Zod schema formani avtomatik tarzda performer obyekti ichiga joylaydi
        rejectApplicantDeal(data)
    };

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
                        [ROLE_LIST.OPERATOR, ROLE_LIST.HEAD, ROLE_LIST.FINANCE_EMPLOYEE, ROLE_LIST.APPLICANT].includes(user.role) &&
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

                <Restricted permittedRole={[ROLE_LIST.MINISTRY_DXSH_B_B, ROLE_LIST.MINISTRY_FINANCE,ROLE_LIST.APPLICANT]}>
                    <Form {...form}>
                        <form autoComplete="off" onSubmit={form.handleSubmit(handleFormSubmit)}>
                            <div className="grid grid-cols-12 mb-5">
                                <div className={'col-span-12 mb-5'}>
                                    <FormField
                                        control={form.control}
                                        // O'ZGARISH: name 'performer.reject_text' ga o'zgartirildi
                                        name={'reject_text'}
                                        render={({field}) => {
                                            return (
                                                <FormItem>
                                                    <FormLabel required>Izoh</FormLabel>
                                                    <FormControl>
                                                        <Textarea {...field}/>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>
                                <div className={'col-span-12 mb-5'}>
                                    <FormField
                                        control={form.control}
                                        // O'ZGARISH: name 'performer.reject_file' ga o'zgartirildi
                                        name={'reject_file'}
                                        render={({field}) => {
                                            return (
                                                <FormItem>
                                                    <FormLabel required>File</FormLabel>
                                                    <FormControl>
                                                        <FileUpLoader
                                                            id="rejection_file"
                                                            ref={field.ref}
                                                            // Typescript xatosini oldini olish uchun
                                                            value={field.value as unknown as IFIle}
                                                            onBlur={field.onBlur}
                                                            onChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <Button type="submit">
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Form>
                </Restricted>
            </Wrapper>
        </PageLayout>
    )
}

export default Index