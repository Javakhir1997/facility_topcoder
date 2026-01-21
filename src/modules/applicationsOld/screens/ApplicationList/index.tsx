import {PageLayout, PageTitle, Status, Tab, Table} from "@app/components";
import {applicationTabOption, STATUS_LIST} from "@app/shared";
import {Column} from "react-table";
import {useMemo} from "react";
import {useTranslation} from "react-i18next";
import {ApplicationListFilter} from "@modules/applicationsOld/components";
import {IApplicationList} from "@app/interfaces";
import {useApplications} from "@modules/applicationsOld/hooks";
import {useNavigate} from "react-router-dom";

const Index = () => {
    const {t} = useTranslation();
    const {appeals, isPending, total, totalPages, currentPage} = useApplications()
    const navigate = useNavigate()
    const columns: Column<IApplicationList>[] = useMemo(
        () => [
            {
                Header: t("Project name"),
                accessor: row => row?.project_name
            },
            {
                Header: t("Amount (in sum)"),
                accessor: row => row?.cost
            },
            {
                Header: t("Duration (from)"),
                accessor: row => `${row?.from_date} ${t('year')}`
            },
            {
                Header: t("Duration (to)"),
                accessor: row => `${row?.to_date} ${t('year')}`
            },
            {
                Header: t("Application status"),
                accessor: (row: IApplicationList) => (
                    <Status status={row.status}/>)
            },
            {
                Header: t("MOF conclusion"),
                accessor: (row: IApplicationList) => (
                    <Status status={row.answer_type ?? STATUS_LIST.INCOMPLETE}/>
                )
            },
            {
                Header: t("Application type"),
                accessor: (row: IApplicationList) => (<Status status={row.type}/>)
            }
        ], [t]
    );

    const handleRow = (id: string | number): void => {
        navigate(`/applications/${id}`)
    }

    return (
        <PageLayout>
            <PageTitle title="Applications"/>
            <ApplicationListFilter/>
            <Tab tabs={applicationTabOption} query="status" fallbackValue="all"/>
            <Table
                total={total}
                currentPage={currentPage}
                totalPages={totalPages}
                isLoading={isPending}
                columns={columns}
                handleRow={handleRow}
                data={appeals}
                screen={true}
            />
        </PageLayout>
    )
}

export default Index;
