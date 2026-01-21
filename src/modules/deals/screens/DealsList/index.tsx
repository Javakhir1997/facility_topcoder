import {
    Button,
    PageLayout,
    PageTitle,
    Restricted,
    Status,
    Tab,
    Table
} from '@app/components'
import { BUTTON_THEME, convertDateFormat, ROLE_LIST, statusTabOptions } from '@app/shared'
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
    console.log(deals, 'ssdsdsdsdd')

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
                Header: t('Actions'),
                id: 'actions', // accessor ishlatilmaganda id bo'lishi shart
                width: 80,
                Cell: ({ row }) => (
                    <div className="flex justify-center">
                        <Button
                            type="button"
                            theme={BUTTON_THEME.OUTLINE}
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation(); // Qator (row) bosilishini to'xtatamiz
                                navigate(`/deals/${row.original.id}/edit`); // Siz yaratgan confirm sahifasiga yo'l
                            }}
                            icon={
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                            }
                        >
                            {/* Faqat ikonka qoldirishingiz yoki matn qo'shishingiz mumkin */}
                            {/* {t('common.edit')} */}
                        </Button>
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