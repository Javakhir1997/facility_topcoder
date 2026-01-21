import {Table} from "@app/components";
import {Column} from "react-table";
import {useMemo} from "react";
import {useTranslation} from "react-i18next";
import {IObjectList} from '@app/interfaces'
import {useInvestments} from "@modules/investments/hooks";
import {useNavigate} from "react-router-dom";

const InvestmentList = () => {
    const {t} = useTranslation();
    const {investments, isPending, total, totalPages, currentPage} = useInvestments();
    const navigate = useNavigate();

    const columns: Column<IObjectList>[] = useMemo(
        () => [
            {
                Header: t("Project name"),
                accessor: (row) => row?.project_name,
            },
            {
                Header: t("Object"),
                accessor: (row) => row?.object_name,
            },
            {
                Header: t("WMF type"),
                accessor: (row) => row?.object_type,
            },
            {
                Header: t("Duration (from)"),
                accessor: row => `${row?.from_date} ${t('year')}`
            },
            {
                Header: t("Duration (to)"),
                accessor: row => `${row?.to_date} ${t('year')}`
            }
        ],
        [t]
    );

    const handleRow = (id: string | number): void => {
        navigate(`/investments/${id}`);
    };

    return (
        <Table
            total={total}
            currentPage={currentPage}
            totalPages={totalPages}
            isLoading={isPending}
            columns={columns}
            handleRow={handleRow}
            data={investments}
            screen={true}
        />
    );
};

export default InvestmentList;
