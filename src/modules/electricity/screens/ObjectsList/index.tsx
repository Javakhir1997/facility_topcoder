import {useNavigate, useSearchParams} from "react-router-dom";
import {getSearchParamsAsObject, investmentTabOption, ROLE_LIST} from "@app/shared";
import {PageLayout, PageTitle, Restricted, Tab, Table} from "@app/components";
import {Column} from "react-table";
import {IObjectList} from "@app/interfaces";
import {useMemo} from "react";
import {useTranslation} from "react-i18next";
import {useObjects} from "@modules/electricity/hooks";
import {useAppContext} from "@app/hooks";


const Index = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [searchParams] = useSearchParams();
    const {user} = useAppContext();
    const {objects, isPending, total, totalPages, currentPage} = useObjects();
    const {tab = "new"} = getSearchParamsAsObject(searchParams);

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
        if (tab === "new" && user.role === ROLE_LIST.REGION_OPERATOR) {
            navigate(`/electricity/${id}/add`)
        } else {
            navigate(`/electricity/${id}`);
        }
    };

    return (
        <PageLayout>
            <PageTitle title='Investment obligation'/>
            <Restricted permittedRole={[ROLE_LIST.REGION_OPERATOR]}>
                <Tab tabs={investmentTabOption} query="tab" fallbackValue="new"/>
            </Restricted>
            <Table
                total={total}
                currentPage={currentPage}
                totalPages={totalPages}
                isLoading={isPending}
                columns={columns}
                handleRow={handleRow}
                data={objects}
                screen={true}
            />
        </PageLayout>
    );
};

export default Index;