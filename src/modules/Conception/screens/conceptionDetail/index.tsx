import { Button, GridWrapper, PageLayout, Restricted, Row, ShowIf, Status, Tag, Table } from "@app/components";
import Wrapper from "@components/Wrapper";
import {
    useConceptionDetail,
    useEvolutionConception,
    useConfirmConception,
    useSendToMinistryConception,
    useConfirmBolimXodimConception

} from "@modules/conception/hooks";
import { Column } from "react-table";
import {
    BUTTON_THEME,
    convertDateFormat,
    feeForUseOptions,
    getSelectLabel,
    initiativeOptions, riskOptions, ROLE_LIST,
    sourceOfIncomeOptions, STATUS_LIST
} from "@app/shared";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Modal } from "@components/UI";
import { useEffect, useMemo, useState } from "react";

const Index = () => {

    const { data, isPending } = useConceptionDetail()

    const { t } = useTranslation()
const [performerRejectText, setPerformerRejectText] = useState('')
    const navigate = useNavigate();

    const { confirmConception, isPending: isRegionDxshLoading } = useConfirmConception();

    const { evolutionConception, isPending: isEvolutionLoading } = useEvolutionConception();
    const { confirmBolimXodimConception } = useConfirmBolimXodimConception();
    const { sendToMinistry, isPending: isMinistryLoading } = useSendToMinistryConception()
    const [confirmedByPerformers, setConfirmedByPerformers] = useState<boolean>();
    const [confirmPerformer, setConfirmPerformer] = useState<IPerformer>();
    useEffect(() => {
        if (!data) return
        if (!data.performers?.length) return;

        const allFieldsTrue = data.performers.every(item =>
            item.status === 'completed'
        );

        setConfirmedByPerformers(allFieldsTrue)
    }, [data]);

    const columns: Column<IPerformer>[] = useMemo(
        () => [
            {
                Header: t('performer'),
                accessor: row => row.performer.full_name
            },
            {
                Header: t('deadline'),
                accessor: row => row.deadline
            },
            {
                Header: t('status'),
                accessor: row => (<Status status={row.status} />)
            },
            {
                Header: t('evalution_status'),
                accessor: row => {
                    if (row.evaluation_status) {
                        return <Status status={'accepted'} />
                    } else if (row.evaluation_status !== null && typeof row.evaluation_status === 'boolean') {
                        return <Status status={'rejected'} />
                    }

                }
            },
            {
                Header: t('evaluation_file'),
                accessor: row => {
                    if (row.evaluation_file) {
                        return <Link href={row.evaluation_file} className={'text-blue-600 hover:underline'}>{t('Addition')}</Link>
                    } else {
                        return '-'
                    }

                }
            },
            {
                Header: t('evaluation_text'),
                accessor: row => {
                    if (row.evaluation_text) {
                        return <Button mini onClick={() => setPerformerRejectText(row.evaluation_text)}>{t('show')}</Button>
                    }
                }
            },

        ], [t, data, data?.performers]
    )


    return (
        <div>
            <PageLayout>
                <Wrapper>
                    <div className="flex gap--5xl items-center">
                        <Tag title="Request status">
                            {
                                data?.status &&
                                <Status status={data.status} />
                            }
                        </Tag>
                        <Tag title="Date" string>
                            {convertDateFormat(data?.created_at)}
                        </Tag>
                    </div>
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-6">
                            <GridWrapper>
                                <Row label="project_name" value={data?.project_name} />
                                <Row label="project_type" value={data?.project_type} background />
                                <Row label="volume_work" value={data?.volume_work} />
                                <Row label="description_documents_list" value={data?.description_documents_list}
                                    background />
                                <Row label="point3_1" value={data?.point3_1 ? 'Yes' : 'No'} background />
                                <Row label="point3_2" value={data?.point3_2 ? 'Yes' : 'No'} />
                                <Row label="point3_3" value={data?.point3_3 ? 'Yes' : 'No'} background />
                            </GridWrapper>
                        </div>
                        <div className="col-span-6">
                            <GridWrapper>
                                <Row label="point3_4" value={data?.point3_4} />
                                <Row label="point3_5_a" value={data?.point3_5_a} background />
                                <Row label="point3_5_b" value={data?.point3_5_b} />
                                <Row label="point3_5_v" value={data?.point3_5_v} background />
                                <Row label="point3_5_g" value={data?.point3_5_g} />
                                <Row label="point3_5_d" value={data?.point3_5_d} background />
                                <Row label="point3_6_a"
                                    value={t(getSelectLabel(sourceOfIncomeOptions, data?.point3_6_a) || "-")} />
                                <Row label="point3_6_b_0" value={data?.point3_6_b_0} />
                            </GridWrapper>
                        </div>
                        <div className="col-span-6">
                            <GridWrapper>
                                <Row label="point3_6_b"
                                    value={t(getSelectLabel(feeForUseOptions, data?.point3_6_b) || "-")} />
                                <Row label="point3_7"
                                    value={t(getSelectLabel(initiativeOptions, data?.point3_7) || "-")} background />
                                <Row label="point3_8_1"
                                    value={t(getSelectLabel(riskOptions, data?.point3_8_1) || "-")} />
                                <Row label="point3_8_2" value={t(getSelectLabel(riskOptions, data?.point3_8_2) || "-")}
                                    background />
                                <Row label="point3_8_3"
                                    value={t(getSelectLabel(riskOptions, data?.point3_8_3) || "-")} />
                                <Row label="point3_8_4" value={t(getSelectLabel(riskOptions, data?.point3_8_4) || "-")}
                                    background />
                                <Row label="point3_8_5"
                                    value={t(getSelectLabel(riskOptions, data?.point3_8_5) || "-")} />
                            </GridWrapper>
                        </div>
                        <div className="col-span-6">
                            <GridWrapper>
                                <Row label="point3_8_6"
                                    value={t(getSelectLabel(riskOptions, data?.point3_8_6) || "-")} />
                                <Row label="point3_8_7" value={t(getSelectLabel(riskOptions, data?.point3_8_7) || "-")}
                                    background />
                                <Row label="point3_8_8"
                                    value={t(getSelectLabel(riskOptions, data?.point3_8_8) || "-")} />
                                <Row label="point3_8_9" value={t(getSelectLabel(riskOptions, data?.point3_8_9) || "-")}
                                    background />
                                <Row label="point3_8_10"
                                    value={t(getSelectLabel(riskOptions, data?.point3_8_10) || "-")} />
                                <Row label="point3_8_11"
                                    value={t(getSelectLabel(riskOptions, data?.point3_8_11) || "-")} background />
                                <Row label="point3_8_12"
                                    value={t(getSelectLabel(riskOptions, data?.point3_8_12) || "-")} />
                            </GridWrapper>
                        </div>
                        <div className="col-span-6">
                            <GridWrapper>
                                <Row label="point3_8_13"
                                    value={t(getSelectLabel(riskOptions, data?.point3_8_13) || "-")} />
                                <Row label="point3_8_14"
                                    value={t(getSelectLabel(riskOptions, data?.point3_8_14) || "-")}
                                    background />
                                <Row label="point3_8_15"
                                    value={t(getSelectLabel(riskOptions, data?.point3_8_15) || "-")} />
                                <Row label="point3_8_16"
                                    value={t(getSelectLabel(riskOptions, data?.point3_8_16) || "-")}
                                    background />
                                <Row label="point3_8_17"
                                    value={t(getSelectLabel(riskOptions, data?.point3_8_17) || "-")} />
                                <Row label="point3_8_18"
                                    value={t(getSelectLabel(riskOptions, data?.point3_8_18) || "-")} background />
                                <Row label="point3_8_19"
                                    value={t(getSelectLabel(riskOptions, data?.point3_8_19) || "-")} />
                            </GridWrapper>
                        </div>
                        <div className="col-span-6">
                            <GridWrapper>
                                <Row label="point3_8_20"
                                    value={t(getSelectLabel(riskOptions, data?.point3_8_20) || "-")} />
                                <Row label="point3_8_21"
                                    value={t(getSelectLabel(riskOptions, data?.point3_8_21) || "-")}
                                    background />
                                <Row label="point3_8_22"
                                    value={t(getSelectLabel(riskOptions, data?.point3_8_22) || "-")}
                                    background />
                                <Row label="point3_8_23"
                                    value={t(getSelectLabel(riskOptions, data?.point3_8_23) || "-")}
                                    background />
                            </GridWrapper>
                        </div>
                    </div>
                </Wrapper>


                <Restricted permittedRole={[ROLE_LIST.MINISTRY_DXSH_B_B]}>
                    <h2 className={'text-gray-400 font-semibold'}>Performers list</h2>
                    {
                        data?.performers && data.performers.length ?
                            <div className="grid grid--cols-12 gap-4">
                                <Table
                                    isLoading={isPending}
                                    columns={columns}
                                    data={data.performers}
                                    screen={true}
                                    pagination={false}
                                />
                            </div>
                            :
                            <div>Performs list is empty</div>
                    }
                    {/* <Modal
						animation={'fade'}
						visible={!!performerRejectText}
						onClose={()=>setPerformerRejectText('')}
						title={'evolution_text'}
					>
						<div>
							{performerRejectText}
						</div>
					</Modal> */}
                </Restricted>




                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                        <Button onClick={() => navigate(-1)} theme={BUTTON_THEME.OUTLINE}>
                            Back
                        </Button>
                    </div>

                    <div className="col-span-6 justify-end flex">
                        <Restricted permittedRole={[ROLE_LIST.BASIN_B_B]}>
                            <ShowIf
                                show={
                                    data?.status === STATUS_LIST.IN_PROCES
                                }
                            >
                                <Button
                                    className={'mr-2'}
                                    theme={BUTTON_THEME.DANGER_OUTLINE}
                                    onClick={() => navigate('reject')}
                                >
                                    Return
                                </Button>

                                <Button
                                    className={'mr-2'}
                                    theme={BUTTON_THEME.PRIMARY}
                                    onClick={() => confirmConception({ reject: false })}
                                    disabled={isRegionDxshLoading}
                                >
                                    Confirm
                                </Button>

                                <Button
                                    theme={BUTTON_THEME.PRIMARY}
                                    onClick={() => sendToMinistry()}
                                    disabled={isMinistryLoading}
                                >
                                    Send to ministry
                                </Button>

                            </ShowIf>
                        </Restricted>

                        <Restricted permittedRole={[ROLE_LIST.BALANCE]}>
                            <ShowIf
                                show={
                                    data?.status === STATUS_LIST.IN_PROCES
                                }
                            >
                                <Button
                                    className={'mr-2'}
                                    theme={BUTTON_THEME.DANGER_OUTLINE}
                                    onClick={() => navigate('reject')}
                                >
                                    Return
                                </Button>

                                <Button
                                    theme={BUTTON_THEME.PRIMARY}
                                    onClick={() => evolutionConception({ reject: false })}
                                    disabled={isEvolutionLoading}
                                >
                                    Confirm
                                </Button>

                            </ShowIf>
                        </Restricted>

                        {/* <Restricted permittedRole={[ROLE_LIST.MINISTRY_DXSH_B_B]}>
                            <ShowIf
                                show={
                                    data?.status === STATUS_LIST.IN_PROCES & data.pr
                                }
                            >
                                <Button
                                    className={'mr-2'}
                                    theme={BUTTON_THEME.DANGER_OUTLINE}
                                    onClick={() => navigate('reject')}
                                >
                                    Return
                                </Button>

                                
                                <Button
                                    theme={BUTTON_THEME.PRIMARY}
                                    onClick={() => navigate('attach-performer')}
                                >
                                    Xodim belgilash
                                </Button>

                            </ShowIf>
                        </Restricted> */}
                        <Restricted permittedRole={[ROLE_LIST.MINISTRY_DXSH_B_B]}>
                            <ShowIf
                                show={
                                    data?.status === STATUS_LIST.IN_PROCES
                                }
                            >
                                <Button
                                    className={'mr-2'}
                                    theme={BUTTON_THEME.DANGER_OUTLINE}
                                    onClick={() => navigate('reject')}
                                >
                                    Return
                                </Button>

                                <Button
                                    theme={BUTTON_THEME.PRIMARY}
                                    onClick={() => navigate('attach-performer')}
                                >
                                    Confirm
                                </Button>


                            </ShowIf>
                        </Restricted>
                        <Restricted permittedRole={[ROLE_LIST.MINISTRY_M_B_B]}>
                            <ShowIf
                                show={
                                    data?.status === STATUS_LIST.IN_PROCES
                                }
                            >
                                <Button
                                    className={'mr-2'}
                                    theme={BUTTON_THEME.DANGER_OUTLINE}
                                    onClick={() => navigate('reject')}
                                >
                                    Return
                                </Button>

                                <Button
                                    theme={BUTTON_THEME.PRIMARY}
                                    onClick={() => confirmBolimXodimConception({ reject: false })}
                                    disabled={isEvolutionLoading}
                                >
                                    Confirm
                                </Button>


                            </ShowIf>
                        </Restricted>

                    </div>

                </div>

            </PageLayout>
        </div>
    );
};

export default Index;
