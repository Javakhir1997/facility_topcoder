
import {PageLayout, PageTitle, Status, Table} from "@app/components";
import {useConceptions} from "@modules/conception/hooks";
import {Column} from "react-table";
import {IConceptionList} from "@app/interfaces";
import {useMemo} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

const Index = () => {

    const {conceptions, isPending, total, totalPages, currentPage} = useConceptions();
    const {t} = useTranslation();
    const navigate = useNavigate();

    console.log(conceptions, 'conceptions')

    const columns: Column<IConceptionList>[] = useMemo(
        () => [
            {
                Header: t('project_name'),
                accessor: row => row.project_name
            },
            {
                Header: t('Date'),
                accessor: row => row.created_at
            },
            {
                Header: t('volume_work'),
                accessor: row => row.volume_work
            },
            {
                Header: t('Request status'),
                accessor: row => (<Status status={row.status}/>)
            }
        ], [t]
    )

    const handleRow = (id: string | number): void => {
        navigate(`/conceptions/${id}`)
    }

    return (
        <PageLayout>
            <PageTitle title="conceptions" />
            
            <Table
                total={total}
                currentPage={currentPage}
                totalPages={totalPages}
                isLoading={isPending}
                columns={columns}
                handleRow={handleRow}
                data={conceptions}
                screen={true}
            />

        </PageLayout>
    );
};

export default Index;
