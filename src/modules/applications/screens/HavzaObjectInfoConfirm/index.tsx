import {
    GridWrapper,
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

import {Button} from "@shared/component/ui/button";
import {Link} from "@radix-ui/themes";

const Index = () => {

    // const navigate = useNavigate()
    const {data} = useAppealDetail()
    const {form, confirmByHavzaApplication} = useConfirmHavzaApplication()
    
    
    const handleFormSubmit = (data: setHavzaObjectEvolutionDTO) => {
         confirmByHavzaApplication(data)
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

                {
                    data && data.confirmation_documents.length > 0 ?
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12">
                                <h2 className={'text-gray-400 font-semibold'}>Obyet ma'lumotlari</h2>
                            </div>
                            {
                                data.confirmation_documents.map((item) => {
                                    return (

                                        <div className="col-span-6 col-start-1" key={item.id}>
                                            <div className={'flex item-center justify-between border-b'}>
                                                <div className={'text-black font-bold pl-3'}>
                                                    {
                                                        data && data.indebtedness_file && data.indebtedness_file.file ?
                                                            <Link className={'text-blue-400'}
                                                                  href={item.attachment.file}>{item.attachment.name}</Link>
                                                            : null
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                        : null
                }


                <Restricted permittedRole={ROLE_LIST.BASIN_B_B}>
                    <div className={'flex justify-end mt-5'}>
                        <Button type="submit" size={'lg'}>
                            confirm
                        </Button>
                    </div>
                </Restricted>
            </Wrapper>
        </PageLayout>
    )
}

export default Index
