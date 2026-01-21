import {useNavigate, useParams} from "react-router-dom";
import {BUTTON_THEME, FIELD, formatToThousand, ROLE_LIST, STATUS_LIST,} from "@app/shared";
import {Button, PageLayout, PageTitle, Restricted, ShowIf, Status, Table,} from "@app/components";
import {useTranslation} from "react-i18next";
import {useObjectDetail} from "@modules/electricity/hooks";
import {Column} from "react-table";
import {IElectricityPlanList} from "@app/interfaces";
import {useMemo} from "react";
import {useAppContext} from "@app/hooks";
import {Edit} from "@app/assets";
import styles from "@modules/investments/components/DetailTable/styles.module.scss";


const Index = () => {
    const navigate = useNavigate()
    const {id = ''} = useParams()
    const {plans, total, totalPages, currentPage, isPending} = useObjectDetail()
    const {t} = useTranslation();
    const {user} = useAppContext();

    // const {
    //     isPending: isPlanDetail,
    //     planDetail
    // } = useObjectDetail(year ? year : years?.years?.[0], !!year || !!years?.years?.[0])

    const columns: Column<IElectricityPlanList>[] = useMemo(
        () => [
            {
                Header: t("Year"),
                accessor: (row) => row.year
            },
            {
                Header: t("Planned electricity consumption (thousand kWh)"),
                accessor: (row) => formatToThousand(row.electricity_capacity)
            },
            {
                Header: t("Actual electricity consumption (thousand kWh)"),
                accessor: (row) => formatToThousand(row.report?.electricity_capacity) ?
                    <span
                        style={row.report?.status === STATUS_LIST.REJECTED ? {color: "#F65354"} : row.report?.status === STATUS_LIST.APPROVED ? {color: "#18BA92"} : {color: "#3363FF"}}
                    >
                        {
                            formatToThousand(row.report?.electricity_capacity)
                        }
                    </span> :
                    <Restricted permittedRole={ROLE_LIST.APPLICANT}>
                        <ShowIf show={(row.report?.status ?? STATUS_LIST.NEW) === STATUS_LIST.NEW}>
                            <div
                                className={styles.add}
                                onClick={() => navigate(`/electricity/${row.id}/report/add?year=${row.year}`)}
                            >
                                <Button icon={<Edit/>} mini={true} theme={BUTTON_THEME.PRIMARY}/>
                            </div>
                        </ShowIf>
                    </Restricted>,
            },
            {
                Header: t("Status"),
                accessor: (row) => <Status status={row.report?.status ?? STATUS_LIST.NEW}/>,
            },
            ...(user.role === ROLE_LIST.REGION_OPERATOR || user.role === ROLE_LIST.APPLICANT) ? [
                {
                    Header: t("Actions"),
                    accessor: (row: IElectricityPlanList) => <>
                        <Restricted permittedRole={ROLE_LIST.REGION_OPERATOR}>
                            <ShowIf
                                show={!formatToThousand(row.report?.electricity_capacity) && row.report?.status === STATUS_LIST.NEW}
                            >
                                <div
                                    className={styles.add}
                                    onClick={() => navigate(`/electricity/${row?.id}/edit?year=${row.year}&objectId=${id}`)}
                                >
                                    <Button
                                        type={FIELD.BUTTON}
                                        icon={<Edit/>}
                                        mini={true}
                                    >
                                        Edit
                                    </Button>
                                </div>
                            </ShowIf>
                            <ShowIf
                                show={!!formatToThousand(row.report?.electricity_capacity) && row.report?.status === STATUS_LIST.NEW}
                            >
                                <div
                                    className={styles.add}
                                    onClick={() => navigate(`/electricity/${row.report.id}/report?year=${row.year}`)}
                                >
                                    <Button icon={<Edit/>} mini={true} theme={BUTTON_THEME.PRIMARY}/>
                                </div>
                            </ShowIf>
                        </Restricted>
                        <Restricted permittedRole={ROLE_LIST.APPLICANT}>
                            <ShowIf show={row.report?.status === STATUS_LIST.REJECTED}>
                                <div
                                    className={styles.add}
                                    onClick={() => navigate(`/electricity/${row.report?.id}/report/edit?year=${row.year}`)}
                                >
                                    <Button icon={<Edit/>} mini={true} theme={BUTTON_THEME.PRIMARY}/>
                                </div>
                            </ShowIf>
                        </Restricted>
                    </>,
                    style: {
                        width: '12rem'
                    }
                }
            ] : []
        ],
        [id, navigate, t, user.role]
    );


    return (
        <PageLayout>
            <div className="flex gap--lg justify-between items-center">
                <Button
                    type={FIELD.BUTTON}
                    theme={BUTTON_THEME.OUTLINE}
                    onClick={() => navigate(-1)}
                >
                    Back
                </Button>
                <Restricted permittedRole={ROLE_LIST.REGION_OPERATOR}>
                    <div className="flex items-center gap--lg">
                        <Button
                            type={FIELD.BUTTON}
                            onClick={() => navigate(`/electricity/${id}/add`)}
                        >
                            Fill in the plan
                        </Button>
                    </div>
                </Restricted>
            </div>
            <PageTitle title={`ID: ${id}`}/>
            {/*<Wrapper>*/}
            {/*    <div className="flex gap--5xl items-center">*/}
            {/*        <Tag title="Application status">*/}
            {/*            {*/}
            {/*                application?.status &&*/}
            {/*                <Status status={application.status}/>*/}
            {/*            }*/}
            {/*        </Tag>*/}
            {/*        <Tag title="Date" string>*/}
            {/*            {convertDateFormat(application?.created_at)}*/}
            {/*        </Tag>*/}
            {/*    </div>*/}
            {/*    <HR/>*/}
            {/*    <div className="grid grid--cols-2 gap--lg">*/}
            {/*        <GridWrapper>*/}
            {/*            <Row label="Objects" value={formatString(application?.appeal?.sxo_objects ?? [])}/>*/}
            {/*            <Row label="Amount (in sum)" value={application?.cost} background/>*/}
            {/*        </GridWrapper>*/}
            {/*        <GridWrapper>*/}
            {/*            <Row label="Duration (from)"*/}
            {/*                 value={application?.from_date ? `${application?.from_date} ${t('year')}` : ''}/>*/}
            {/*            <Row*/}
            {/*                label="Duration (to)"*/}
            {/*                value={application?.to_date ? `${application?.to_date} ${t('year')}` : ''}*/}
            {/*                background*/}
            {/*            />*/}
            {/*        </GridWrapper>*/}
            {/*    </div>*/}
            {/*</Wrapper>*/}
            <Table
                border={true}
                spacing={false}
                total={total}
                currentPage={currentPage}
                totalPages={totalPages}
                isLoading={isPending}
                columns={columns}
                data={plans}
                screen={true}
            />
        </PageLayout>
    );
};

export default Index;