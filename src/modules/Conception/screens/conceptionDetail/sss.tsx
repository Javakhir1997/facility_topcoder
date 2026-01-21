import React, { useEffect, useState } from "react";
import { Button, GridWrapper, PageLayout, Restricted, Row, ShowIf, Status, Tag, Table } from "@app/components";
import Wrapper from "@components/Wrapper";
import {
    useConceptionDetail,
    useEvolutionConception,
    useConfirmConception,
    useSendToMinistryConception
} from "@modules/conception/hooks";
import {
    BUTTON_THEME,
    convertDateFormat,
    feeForUseOptions,
    getSelectLabel,
    initiativeOptions,
    riskOptions,
    ROLE_LIST,
    sourceOfIncomeOptions,
    STATUS_LIST
} from "@app/shared";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { IPerformer } from "@interfaces/appeal.interface";

// ----------------------------------------------------------------------
// 1. COLUMN'LARNI TO'G'RI E'LON QILISH
// ----------------------------------------------------------------------
const columns = [
    {
        title: "F.I.SH",
        id: "full_name",
        accessor: (row: any) => row.performer?.full_name,
        // render o'rniga Cell
        Cell: ({ row }: any) => {
             return row.original?.performer?.full_name || "—";
        }
    },
    {
        title: "Status",
        id: "status",
        accessor: "status",
        // render o'rniga Cell
        Cell: ({ value }: any) => { // value - bu 'accessor' dan qaytgan qiymat
            if (value === 'completed') {
                return (
                    <div className="flex items-center text-green-600">
                        {/* Yashil Ptichka */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                );
            } 
            if (value === 'rejected') {
                 return (
                    <div className="flex items-center text-red-600">
                        {/* Qizil X */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                );
            }
            return <span>{value}</span>;
        }
    }
];

const Index = () => {
    // State
    const [confirmPerformer, setConfirmPerformer] = useState<IPerformer>();
    const [confirmedByPerformers, setConfirmedByPerformers] = useState<boolean>();

    // Hooks
    // isLoading ni ham olib kelamiz
    const { data, isLoading } = useConceptionDetail();
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Action Hooks
    const { confirmConception, isPending: isRegionDxshLoading } = useConfirmConception();
    const { evolutionConception, isPending: isEvolutionLoading } = useEvolutionConception();
    const { sendToMinistry, isPending: isMinistryLoading } = useSendToMinistryConception();

    // ---------------------------------------------------------
    // 2. USER MAVZUSI (DIQQAT!)
    // ---------------------------------------------------------
    // Sizda 'user' o'zgaruvchisi yo'q edi. Buni loyihangizdagi Auth hookdan olishingiz kerak.
    // Misol uchun: const { user } = useAuth();
    // Hozircha kod xato bermasligi uchun men "mock" (soxta) user yozib turaman:
    const user = { id: 76 }; // <-- O'ZINGIZDAGI REAL ID BILAN ALMASHTIRING
    // ---------------------------------------------------------

    useEffect(() => {
        // Data to'liq kelmaguncha kutamiz
        if (!data || !data.performers) return;

        // 1. Userni topish logikasi
        if (user && user.id) {
            const performer = data.performers.find((item: any) => item.performer?.id === user.id);
            if (performer) {
                setConfirmPerformer(performer);
            }
        }

        // 2. Hamma tasdiqlaganini tekshirish
        const allFieldsTrue = data.performers.every((item: any) =>
            item.status === 'completed'
        );
        setConfirmedByPerformers(allFieldsTrue);

    }, [data, user?.id]); // data yoki user o'zgarganda ishlaydi

    console.log("Current Data:", data);

    return (
        <div>
            <PageLayout>
                <Wrapper>
                    <div className="flex gap--5xl items-center">
                        <Tag title="Request status">
                            {data?.status && <Status status={data.status} />}
                        </Tag>
                        <Tag title="Date" string>
                            {convertDateFormat(data?.created_at)}
                        </Tag>
                    </div>

                    <div className="grid grid-cols-12 gap-5">
                        {/* 1-BLOCK */}
                        <div className="col-span-6">
                            <GridWrapper>
                                <Row label="project_name" value={data?.project_name} />
                                <Row label="project_type" value={data?.project_type} background />
                                <Row label="volume_work" value={data?.volume_work} />
                                <Row label="description_documents_list" value={data?.description_documents_list} background />
                                <Row label="point3_1" value={data?.point3_1 ? 'Yes' : 'No'} background />
                                <Row label="point3_2" value={data?.point3_2 ? 'Yes' : 'No'} />
                                <Row label="point3_3" value={data?.point3_3 ? 'Yes' : 'No'} background />
                            </GridWrapper>
                        </div>
                        {/* 2-BLOCK */}
                        <div className="col-span-6">
                            <GridWrapper>
                                <Row label="point3_4" value={data?.point3_4} />
                                <Row label="point3_5_a" value={data?.point3_5_a} background />
                                <Row label="point3_5_b" value={data?.point3_5_b} />
                                <Row label="point3_5_v" value={data?.point3_5_v} background />
                                <Row label="point3_5_g" value={data?.point3_5_g} />
                                <Row label="point3_5_d" value={data?.point3_5_d} background />
                                <Row label="point3_6_a" value={t(getSelectLabel(sourceOfIncomeOptions, data?.point3_6_a) || "-")} />
                                <Row label="point3_6_b_0" value={data?.point3_6_b_0} />
                            </GridWrapper>
                        </div>
                        {/* 3-BLOCK */}
                        <div className="col-span-6">
                            <GridWrapper>
                                <Row label="point3_6_b" value={t(getSelectLabel(feeForUseOptions, data?.point3_6_b) || "-")} />
                                <Row label="point3_7" value={t(getSelectLabel(initiativeOptions, data?.point3_7) || "-")} background />
                                <Row label="point3_8_1" value={t(getSelectLabel(riskOptions, data?.point3_8_1) || "-")} />
                                <Row label="point3_8_2" value={t(getSelectLabel(riskOptions, data?.point3_8_2) || "-")} background />
                                <Row label="point3_8_3" value={t(getSelectLabel(riskOptions, data?.point3_8_3) || "-")} />
                                <Row label="point3_8_4" value={t(getSelectLabel(riskOptions, data?.point3_8_4) || "-")} background />
                                <Row label="point3_8_5" value={t(getSelectLabel(riskOptions, data?.point3_8_5) || "-")} />
                            </GridWrapper>
                        </div>
                        {/* 4-BLOCK */}
                        <div className="col-span-6">
                            <GridWrapper>
                                <Row label="point3_8_6" value={t(getSelectLabel(riskOptions, data?.point3_8_6) || "-")} />
                                <Row label="point3_8_7" value={t(getSelectLabel(riskOptions, data?.point3_8_7) || "-")} background />
                                <Row label="point3_8_8" value={t(getSelectLabel(riskOptions, data?.point3_8_8) || "-")} />
                                <Row label="point3_8_9" value={t(getSelectLabel(riskOptions, data?.point3_8_9) || "-")} background />
                                <Row label="point3_8_10" value={t(getSelectLabel(riskOptions, data?.point3_8_10) || "-")} />
                                <Row label="point3_8_11" value={t(getSelectLabel(riskOptions, data?.point3_8_11) || "-")} background />
                                <Row label="point3_8_12" value={t(getSelectLabel(riskOptions, data?.point3_8_12) || "-")} />
                            </GridWrapper>
                        </div>
                        {/* 5-BLOCK */}
                        <div className="col-span-6">
                            <GridWrapper>
                                <Row label="point3_8_13" value={t(getSelectLabel(riskOptions, data?.point3_8_13) || "-")} />
                                <Row label="point3_8_14" value={t(getSelectLabel(riskOptions, data?.point3_8_14) || "-")} background />
                                <Row label="point3_8_15" value={t(getSelectLabel(riskOptions, data?.point3_8_15) || "-")} />
                                <Row label="point3_8_16" value={t(getSelectLabel(riskOptions, data?.point3_8_16) || "-")} background />
                                <Row label="point3_8_17" value={t(getSelectLabel(riskOptions, data?.point3_8_17) || "-")} />
                                <Row label="point3_8_18" value={t(getSelectLabel(riskOptions, data?.point3_8_18) || "-")} background />
                                <Row label="point3_8_19" value={t(getSelectLabel(riskOptions, data?.point3_8_19) || "-")} />
                            </GridWrapper>
                        </div>
                        {/* 6-BLOCK */}
                        <div className="col-span-6">
                            <GridWrapper>
                                <Row label="point3_8_20" value={t(getSelectLabel(riskOptions, data?.point3_8_20) || "-")} />
                                <Row label="point3_8_21" value={t(getSelectLabel(riskOptions, data?.point3_8_21) || "-")} background />
                                <Row label="point3_8_22" value={t(getSelectLabel(riskOptions, data?.point3_8_22) || "-")} background />
                                <Row label="point3_8_23" value={t(getSelectLabel(riskOptions, data?.point3_8_23) || "-")} background />
                            </GridWrapper>
                        </div>
                    </div>
                </Wrapper>

                {/* 3. TABLE QISMI */}
                <Restricted permittedRole={[ROLE_LIST.BASIN_B_B]}>
                    <h2 className={'text-gray-400 font-semibold mt-5 mb-2'}>Performers list</h2>
                    {
                        data?.performers && data.performers.length > 0 ? (
                            <div className="grid grid--cols-12 gap-4">
                                <Table
                                    isLoading={isLoading}
                                    columns={columns}
                                    data={data.performers}
                                    screen={true}
                                    pagination={false}
                                />
                            </div>
                        ) : (
                            <div className="p-4 border border-dashed text-gray-500 text-center">
                                Performs list is empty
                            </div>
                        )
                    }
                </Restricted>

                {/* BUTTONS */}
                <div className="grid grid-cols-12 gap-4 mt-5">
                    <div className="col-span-6">
                        <Button onClick={() => navigate(-1)} theme={BUTTON_THEME.OUTLINE}>
                            Back
                        </Button>
                    </div>

                    <div className="col-span-6 justify-end flex">
                        <Restricted permittedRole={[ROLE_LIST.BASIN_B_B]}>
                            <ShowIf show={data?.status === STATUS_LIST.IN_PROCES}>
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
                                    viloyat dxsh
                                </Button>

                                <Button
                                    theme={BUTTON_THEME.PRIMARY}
                                    onClick={() => sendToMinistry()}
                                    disabled={isMinistryLoading}
                                >
                                    Send to ministry (yani tasdiqlash)
                                </Button>
                            </ShowIf>
                        </Restricted>

                        <Restricted permittedRole={[ROLE_LIST.BALANCE]}>
                            <ShowIf show={data?.status === STATUS_LIST.IN_PROCES}>
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

                        <Restricted permittedRole={[ROLE_LIST.REGION_OPERATOR]}>
                            <ShowIf show={data?.status === STATUS_LIST.IN_PROCES}>
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
                            <ShowIf show={data?.status === STATUS_LIST.IN_PROCES && data.pr}>
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
                            <ShowIf show={data?.status === STATUS_LIST.IN_PROCES}>
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
                    </div>
                </div>
            </PageLayout>
        </div>
    );
};

export default Index;