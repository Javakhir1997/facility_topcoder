import {
    FileUpLoader, GridWrapper,
    HR,
    PageLayout,
    PageTitle,
    Restricted, Row,
    Status,
    Tag,
    Wrapper,
} from "@app/components";
import {
    convertDateFormat,
    ROLE_LIST,
} from "@app/shared";
import {useAppealDetail} from "@modules/applications/hooks";
import {
    Form, FormControl, FormField, FormItem, FormMessage,
} from '@shared/component/ui/form';
import {Button} from "@shared/component/ui/button";
import useBalanceObjectInfoApplication from "@modules/applications/hooks/useBalanceObjectInfoApplication.ts";
import {SetBalanceObjectInfoApplicationDTO} from "@entities/application";
import {IFIle} from "@app/interfaces";
import {CircleX} from "lucide-react";
const Index = () => {

    // const navigate = useNavigate()
    const {data} = useAppealDetail()
    const {form, setBalanceObjectInfo, fields, remove, append} = useBalanceObjectInfoApplication()


    const handleFormSubmit = (data: SetBalanceObjectInfoApplicationDTO) => {
        setBalanceObjectInfo(data)
    };


    return (
        <PageLayout>
            <PageTitle title="ballance_object_info"/>
            <Wrapper>
                <div className="flex gap--5xl items-center">
                    <Tag title="Request status">
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

                <GridWrapper>
                    <Row label="applications.region" value={data?.region?.label} background/>
                    <Row label="applications.district" value={data?.district?.name} />
                    <Row label="applications.address" value={data?.address} background/>
                    <Row label="applications.company_name" value={data?.company_name} />
                </GridWrapper>


                <Restricted permittedRole={ROLE_LIST.BALANCE}>
                    <Form {...form}>
                        <form autoComplete="off" onSubmit={form.handleSubmit(handleFormSubmit)}>

                            {fields.map((item, index) => (
                                <div className="grid grid-cols-12 gap-4 mb-4" key={item.id}>
                                    <div className={'col-span-4'}>
                                        <FormField
                                            control={form.control}
                                            name={`attachments.${index}.attachment`}
                                            render={({field}) => {
                                                return (
                                                    <FormItem>
                                                        <FormControl>
                                                            <FileUpLoader
                                                                id={`attachments.${index}.attachment`}
                                                                ref={field.ref}
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
                                    <div className="col-span-3">
                                        <button
                                            className={'px-3 pt-5 text-red-500 cursor-pointer'}
                                            type="button" onClick={() => remove(index)}>
                                            <CircleX/>
                                        </button>
                                    </div>

                                </div>
                            ))}
                            <div className="mb-5">
                                <Button
                                    variant={'default'}
                                    type="button"
                                    onClick={() => append({attachment: undefined})}
                                >
                                    Qoshish
                                </Button>
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
