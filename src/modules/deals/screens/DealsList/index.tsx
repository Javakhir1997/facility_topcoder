import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Column } from 'react-table'

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
import { useDeals } from '@modules/deals/hooks'

// --- Interfaces ---
export interface IDeal {
    id: number;
    status: string;
    application: number;
    start_date: string | null;
    end_date: string | null;
    pdf_attachment: string | null;
    docx_attachment: string | null;
}

// --- Sub-components ---

// Hujjat Badge komponenti
const DocumentBadge = ({ url, type }: { url: string | null, type: 'pdf' | 'docx' }) => {
    if (!url) return null;

    const styles = {
        pdf: "text-red-600 bg-red-50 border-red-200 hover:bg-red-100",
        docx: "text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100"
    };

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-2 py-1 rounded border text-xs font-bold transition-colors uppercase ${styles[type]}`}
            onClick={(e) => e.stopPropagation()} 
        >
            {type}
        </a>
    );
};

const Index = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    
    // Ma'lumotlarni olish
    const { deals, isPending, total, totalPages, currentPage } = useDeals()

    // Ustunlar konfiguratsiyasi
    const columns: Column<IDeal>[] = useMemo(
        () => [
            {
                Header: t('Application ID'),
                accessor: 'application',
                Cell: ({ value }) => <span className="text-gray-600"> {value}</span>
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
                accessor: 'status',
                Cell: ({ value }) => <Status status={value} />
            },
            {
                Header: t('Documents'),
                accessor: 'id', // Accessor qolaveradi
                id: 'documents', // <--- 1. MUHIM: Unikal ID berildi (Duplicate error yechimi)
                disableSortBy: true,
                Cell: ({ row }) => {
                    const { pdf_attachment, docx_attachment } = row.original;
                    
                    // <--- 2. MUHIM: Markazlash uchun klasslar (justify-center items-center)
                    return (
                        <div className="flex items-center justify-center gap-2 h-full w-full">
                            {!pdf_attachment && !docx_attachment ? (
                                <span className="text-gray-400 text-sm">-</span>
                            ) : (
                                <>
                                    <DocumentBadge url={pdf_attachment} type="pdf" />
                                    <DocumentBadge url={docx_attachment} type="docx" />
                                </>
                            )}
                        </div>
                    );
                }
            }
        ], [t]
    )

    const handleRowClick = (id: number) => {
        navigate(`/deals/${id}`)
    }

    return (
        <PageLayout>
            <PageTitle title={t("Deals")}>
                <Restricted permittedRole={ROLE_LIST.APPLICANT}>
                    <Button
                        icon={<Add />}
                        navigate="add"
                    >
                        {t("Create Deal")}
                    </Button>
                </Restricted>
            </PageTitle>
            
            <Tab tabs={statusTabOptions} query="status" fallbackValue="all" />

            <Table
                data={deals || []}
                columns={columns}
                isLoading={isPending}
                total={total}
                totalPages={totalPages}
                currentPage={currentPage}
                handleRow={handleRowClick}
                screen={true}
                emptyMessage={t("No deals found")}
            />
        </PageLayout>
    )
}

export default Index