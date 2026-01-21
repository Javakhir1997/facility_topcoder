import {
    Button,
    PageLayout,
    PageTitle,
    Restricted,
    Status,
    Tab,
    Table
} from '@app/components'
import { convertDateFormat, ROLE_LIST, statusTabOptions } from '@app/shared'
import { Add } from '@app/assets'
import { Column } from 'react-table'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
// import { AppealListFilter } from '@modules/applications/components' // Agar filterlar deal uchun mos bo'lmasa o'chirib turing
// import { useDeals } from '@modules/deals/hooks' // Hook nomini o'zgartirish kerak bo'lishi mumkin
import { useDeals } from '@modules/deals/hooks' // Hozircha eskisi turibdi, lekin buni yangisiga almashtirish kerak
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '@app/hooks'

// 1. JSON ga mos yangi interfeys (interface.ts ga olib o'tsangiz ham bo'ladi)
export interface IDeal {
    id: number;
    status: string;
    application: number;
    start_date: string | null;
    end_date: string | null;
    pdf_attachment: string | null;
    docx_attachment: string | null;
}

const Index = () => {
    const { t } = useTranslation()
    // DIQQAT: useAppeals o'rniga useDeals yoki shunga o'xshash, yangi JSON ni qaytaradigan hook ishlatilishi kerak
    // Hozircha o'zgaruvchi nomlarini "deals" deb oldim
    const { deals, isPending, total, totalPages, currentPage } = useDeals() 
    console.log(deals,'ssdsdsdsdd')
    
    const navigate = useNavigate()
    const { user } = useAppContext()

    const columns: Column<IDeal>[] = useMemo(
        () => [
            {
                Header: t('ID'),
                accessor: 'id',
                width: 50,
            },
            {
                Header: t('Application ID'), // Ariza raqami
                accessor: 'application',
            },
            {
                Header: t('Start Date'),
                accessor: (row) => convertDateFormat(row.start_date) || '-',
            },
            {
                Header: t('End Date'),
                accessor: (row) => convertDateFormat(row.end_date) || '-',
            },
            {
                Header: t('Status'),
                accessor: (row) => (<Status status={row.status} />)
            },
            {
                Header: t('Documents'), // Hujjatlar
                Cell: ({ row }) => (
                    <div className="flex gap-2">
                        {row.original.pdf_attachment && (
                            <a 
                                href={row.original.pdf_attachment} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-red-600 hover:underline font-medium text-sm"
                                onClick={(e) => e.stopPropagation()} // Qator bosilishini to'xtatish uchun
                            >
                                PDF
                            </a>
                        )}
                        {row.original.docx_attachment && (
                            <a 
                                href={row.original.docx_attachment} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-blue-600 hover:underline font-medium text-sm"
                                onClick={(e) => e.stopPropagation()}
                            >
                                DOCX
                            </a>
                        )}
                        {!row.original.pdf_attachment && !row.original.docx_attachment && (
                            <span className="text-gray-400 text-sm">-</span>
                        )}
                    </div>
                )
            }
        ], [t]
    )

    const handleRow = (id: string | number): void => {
        // Bu yerni o'zingizning yangi route ga moslang (masalan: /deals/3)
        navigate(`/deals/${id}`) 
    }

    return (
        <PageLayout>
            <PageTitle title={t("Deals")}> {/* "Bitimlar" yoki mos nom */}
                <Restricted permittedRole={ROLE_LIST.APPLICANT}>
                    <Button
                        icon={<Add />}
                        navigate="add"
                    >
                        {t("Create Deal")}
                    </Button>
                </Restricted>
            </PageTitle>
            
            {/* Agar filtrlar kerak bo'lsa qoldiring, bo'lmasa o'chiring */}
            {/* <AppealListFilter /> */} 
            
            <Tab tabs={statusTabOptions} query="status" fallbackValue="all" />
            
            <Table
                total={total}
                currentPage={currentPage}
                totalPages={totalPages}
                isLoading={isPending}
                columns={columns}
                handleRow={handleRow}
                data={deals || []} // Agar data undefined bo'lsa bo'sh massiv
                screen={true}
            />
        </PageLayout>
    )
}

export default Index