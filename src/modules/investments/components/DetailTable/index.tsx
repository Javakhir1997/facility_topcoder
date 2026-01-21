import {Button, Restricted, ShowIf, Status, Table} from "@app/components";
import {Column} from "react-table";
import {FC, useMemo} from "react";
import {useTranslation} from "react-i18next";
import {IPlanTableItem} from "@app/interfaces";
import {BUTTON_THEME, formatToMillion, ROLE_LIST, STATUS_LIST} from "@app/shared";
import styles from "./styles.module.scss"
import {Edit} from "@app/assets";
import {useAppContext} from "@app/hooks";
import {useNavigate} from "react-router-dom";

interface Properties {
    data?: IPlanTableItem[] | null;
    isPending?: boolean;
}

const InvestmentList: FC<Properties> = ({data = [], isPending = false}) => {
    const {t} = useTranslation();
    const {user} = useAppContext();
    const navigate = useNavigate();

    const columns: Column<IPlanTableItem>[] = useMemo(
        () => [
            {
                Header: t("List of indicators"),
                accessor: (row) => row.main ? (
                    <div className={styles.main}><span>{row.index})</span>{t(row?.indicator)}</div>
                ) : row.bold ? (<div className={styles.bold}>{t(row?.indicator)}</div>) :
                    <div className={styles.common}>{t(row?.indicator)}</div>,
                style: {
                    textAlign: 'start',
                }
            },
            {
                Header: t("Plan (mln. so‘m)"),
                accessor: (row: IPlanTableItem) => formatToMillion(row.plan),
                style: {
                    width: '15rem'
                }
            },
            {
                Header: t("Actual (mln. so‘m)"),
                accessor: (row) => formatToMillion(row.fact) ?
                    <span
                        style={row.status === STATUS_LIST.REJECTED ? {color: "#F65354"} : row.status === STATUS_LIST.APPROVED ? {color: "#18BA92"} : row.edit ? {color: "#3363FF"} : {}}
                    >
                        {
                            formatToMillion(row.fact)
                        }
                    </span> :
                    <Restricted permittedRole={ROLE_LIST.APPLICANT}>
                        <ShowIf show={!!row.edit && row.status === STATUS_LIST.NEW}>
                            <div
                                className={styles.add}
                                onClick={() => navigate(`/investments/${row.planId}/report/add?name=${row.indicator}`)}
                            >
                                <Button icon={<Edit/>} mini={true} theme={BUTTON_THEME.PRIMARY}/>
                            </div>
                        </ShowIf>
                    </Restricted>,
                style: {
                    width: '15rem'
                }
            },
            {
                Header: t("Status"),
                accessor: (row) => <Status status={row?.status ?? STATUS_LIST.NEW}/>,
                style: {
                    width: '10rem'
                }
            },
            ...(user.role === ROLE_LIST.REGION_OPERATOR || user.role === ROLE_LIST.APPLICANT) ? [
                {
                    Header: t("Actions"),
                    accessor: (row: IPlanTableItem) => (
                        <>
                            <Restricted permittedRole={ROLE_LIST.REGION_OPERATOR}>
                                <ShowIf
                                    show={!!formatToMillion(row.fact) && !!row.edit && row.status === STATUS_LIST.NEW}
                                >
                                    <div
                                        className={styles.add}
                                        onClick={() => navigate(`/investments/${row.reportId}/report?name=${row.indicator}`)}
                                    >
                                        <Button icon={<Edit/>} mini={true} theme={BUTTON_THEME.PRIMARY}/>
                                    </div>
                                </ShowIf>
                            </Restricted>
                            <Restricted permittedRole={ROLE_LIST.APPLICANT}>
                                <ShowIf show={!!row.edit && row.status === STATUS_LIST.REJECTED}>
                                    <div
                                        className={styles.add}
                                        onClick={() => navigate(`/investments/${row.reportId}/report/edit?name=${row.indicator}&planId=${row.planId}`)}
                                    >
                                        <Button icon={<Edit/>} mini={true} theme={BUTTON_THEME.PRIMARY}/>
                                    </div>
                                </ShowIf>
                            </Restricted>
                        </>
                    ),
                    style: {
                        width: '12rem'
                    }
                }
            ] : []
        ],
        [navigate, t, user.role]
    );


    return (
        <Table
            border={true}
            spacing={false}
            numeric={false}
            isLoading={isPending}
            columns={columns}
            data={data}
            screen={true}
            pagination={false}
        />
    );
};

export default InvestmentList;
