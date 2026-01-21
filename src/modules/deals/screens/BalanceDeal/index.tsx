import {
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
import {useAppealDetail} from "@modules/applications/hooks";
import {useAppContext} from "@app/hooks";
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@shared/component/ui/form';
import {Textarea} from "@shared/component/ui/textarea.tsx";
import UseBalanceApplication from "@modules/applications/hooks/useBalanceApplication.ts";
import {Button} from "@shared/component/ui/button";
import {SetBalanceApplicationDTO} from "@entities/application";
const Index = () => {

    // const navigate = useNavigate()
    const {data} = useAppealDetail()
    const {user} = useAppContext()
    const {form, setBalanceApplication} = UseBalanceApplication()

    const isBalance = form.watch('object_evaluation_balance_organization')

    const handleFormSubmit = (data: SetBalanceApplicationDTO) => {
        setBalanceApplication(data)
    };

    console.log(form.getValues())


    return (
        <PageLayout>
            <PageTitle title="set_balance_organization"/>
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
                    <Form {...form}>
                        <form autoComplete="off" onSubmit={form.handleSubmit(handleFormSubmit)}>
                            <div className="grid grid-cols-12 mb-5">
                                <div className={'col-span-12 mb-5'}>
                                    <FormField
                                        control={form.control}
                                        name={'object_evaluation_balance_organization'}
                                        render={() => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className={'flex items-center'}>
                                                            <Button
                                                                type={'button'}
                                                                onClick={() => form.setValue('object_evaluation_balance_organization', true)}
                                                                className={'mr-5'}
                                                                variant={isBalance ? 'default' : 'secondary'}
                                                                size={'lg'}
                                                            >
                                                                Банд
                                                            </Button>
                                                            <Button
                                                                type={'button'}
                                                                onClick={() => form.setValue('object_evaluation_balance_organization', false)}
                                                                variant={!isBalance ? 'default' : 'secondary'}
                                                                className={'active'}
                                                                size={'lg'}
                                                            >
                                                                Банд эмас
                                                            </Button>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>
                                {
                                    isBalance ?
                                        <div className={'col-span-12 mb-5'}>
                                            <FormField
                                                control={form.control}
                                                name={'object_evaluation_balance_organization_text'}
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
                                    : null
                                }

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
