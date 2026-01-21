import {Button, PageLayout, PageTitle, Restricted, Status, Tab, Table} from '@app/components'
import {convertDateFormat, ROLE_LIST, statusTabOptions} from '@app/shared'
import {Add} from '@app/assets'
import {Column} from 'react-table'
import {useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {AnnouncementListFilter} from '@modules/announcements/components'
import {useAnnouncements} from '@modules/announcements/hooks'
import {IAnnouncementList} from '@app/interfaces' // Interfeys nomi yangilandi
import {useNavigate} from 'react-router-dom'
import {useAppContext} from '@app/hooks'

const Index = () => {
    const {t} = useTranslation()
    const {announcements, isPending, total, totalPages, currentPage} = useAnnouncements()
    const navigate = useNavigate()
    const {user} = useAppContext()

    // const columns: Column<IAnnouncementList>[] = useMemo(
    //     () => [
    //         // {
    //         //     Header: 'No.',
    //         //     accessor: (_row, i) => (currentPage - 1) * 10 + i + 1, // Sahifalangan tartib raqami
    //         //     width: 50,
    //         // },
    //         {
    //             Header: t('Object'),
    //             accessor: row => row.object_name // Backend'dan keladigan maydon nomi
    //         },
    //         {
    //             Header: t('WMF type'),
    //             accessor: row => row.object_type
    //         },
    //         {
    //             Header: t('WMF address'),
    //             accessor: row => row.address
    //         },
    //         {
    //             Header: t('Start date'),
    //             accessor: row => convertDateFormat(row.start_date)
    //         },
    //         {
    //             Header: t('End date'),
    //             accessor: row => convertDateFormat(row.end_date)
    //         },
    //         {
    //             Header: t('Number of applicants'),
    //             accessor: 'applicants_count',
    //             style: {textAlign: 'center'}
    //         },
    //         {
    //             Header: t('Applicants'),
    //             accessor: 'applicant_name'
    //         },
    //         {
    //             Header: t('Status'),
    //             accessor: row => (<Status status={row.status}/>)
    //         }
    //     ], [t, user.role, currentPage]
    // )

    const columns: Column<IAnnouncementList>[] = useMemo(
    () => [
        {
            Header: t('Object'),
            accessor: row => row.object_name || t('Noma’lum')
        },
        {
            Header: t('WMF type'),
            // AGAR object_type ob'ekt bo'lsa (masalan: {id: 1, name: 'Bino'}), 
            // uni row.object_type.name deb yozish kerak
            accessor: row => typeof row.object_type === 'object' 
                ? row.object_type?.name 
                : row.object_type
        },
        {
            Header: t('WMF address'),
            accessor: row => row.address
        },
        {
            Header: t('Start date'),
            accessor: row => convertDateFormat(row.start_date)
        },
        {
            Header: t('End date'),
            accessor: row => convertDateFormat(row.end_date)
        },
        {
            Header: t('Number of applicants'),
            accessor: 'applicants_count',
            style: { textAlign: 'center' }
        },
        {
            Header: t('Applicants'),
            // Agar applicant_name ham ob'ekt bo'lsa, ichidagi 'name'ni oling
            accessor: row => typeof row.applicant_name === 'object' 
                ? row.applicant_name?.name 
                : row.applicant_name
        },
        {
            Header: t('Status'),
            id: 'status', // accessor funksiya bo'lsa, id berish shart
            Cell: ({ row }: { row: { original: IAnnouncementList } }) => (
                <Status status={row.original.status} />
            )
        }
    ], [t, user.role, currentPage]
)

    const handleRow = (id: string | number): void => {
        navigate(`/announcements/${id}`)
    }

    return (
        <PageLayout>
            <PageTitle title={t('E’lonlar ro‘yxati')}>
                {/* <Restricted permittedRole={ROLE_LIST.MINISTRY_DXSH_B_B}>
                    <Button
                        icon={<Add/>}
                        navigate="add"
                    >
                        {t('E’lon yaratish')}
                    </Button>
                </Restricted> */}
            </PageTitle>
            
            <AnnouncementListFilter/>
            
            <Tab tabs={statusTabOptions} query="status" fallbackValue="all"/>
            
            <Table
                total={total}
                currentPage={currentPage}
                totalPages={totalPages}
                isLoading={isPending}
                columns={columns}
                handleRow={handleRow}
                data={announcements}
                screen={true}
            />
        </PageLayout>
    )
}

export default Index