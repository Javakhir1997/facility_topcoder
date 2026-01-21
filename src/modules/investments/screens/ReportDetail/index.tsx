import {
    Button,
    FileUpLoader,
    PageLayout,
    PageTitle,
    Restricted,
    ShowIf,
    Tag,
    Wrapper
} from "@app/components";
import {BUTTON_THEME, convertDateFormat, getSearchParamsAsObject, ROLE_LIST, STATUS_LIST} from "@app/shared";
import HR from "@components/HR";
import {useReportDetail} from "@modules/investments/hooks";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useOperatorApprove} from "@modules/applications/hooks";
import {useTranslation} from "react-i18next";

const ReportDetail = () => {
    const {data} = useReportDetail();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const {t} = useTranslation()
    const {name = ''} = getSearchParamsAsObject(searchParams);
    const {isPending: isOperatorApprovePending, operatorApproveAppeal} = useOperatorApprove(false, true);

    return (
        <PageLayout>
            <PageTitle title={`${t("Send report")} - ${t(name)}`}/>
            <Wrapper>
                <div className="flex gap--5xl items-center">
                    <Tag title="Action" string>
                        {data?.cost}
                    </Tag>
                    <Tag title="Date" string>
                        {convertDateFormat(data?.created_at)}
                    </Tag>
                </div>
                <HR/>
                <Tag title="Comment" type="vertical" string>
                    <div className="grid grid--cols-3 gap--lg">
                        {data?.description}
                    </div>
                </Tag>
                <HR/>
                <Tag title="Documents" type="vertical">
                    <div className="grid grid--cols-3 gap--lg">
                        {data?.files?.map((file) => (
                            <FileUpLoader key={file.id} value={file} id={file.id as string}/>
                        ))}
                    </div>
                </Tag>
                <ShowIf show={data?.status === STATUS_LIST.REJECTED}>
                    <HR/>
                    <Tag title="Reason for return" type="vertical" string>
                        <div className="grid grid--cols-3 gap--lg">
                            {data?.operator_note}
                        </div>
                    </Tag>
                </ShowIf>
            </Wrapper>

            <div className="flex gap--lg items-center justify-between">
                <Button onClick={() => navigate(-1)} theme={BUTTON_THEME.OUTLINE}>
                    Back
                </Button>

                <Restricted permittedRole={[ROLE_LIST.REGION_OPERATOR]}>
                    <ShowIf show={data?.status === STATUS_LIST.NEW}>
                        <div className='flex gap--lg items-center'>
                            <Button onClick={() => navigate('return')} theme={BUTTON_THEME.DANGER_OUTLINE}>
                                Return
                            </Button>
                            <Button
                                onClick={() => operatorApproveAppeal()}
                                theme={BUTTON_THEME.PRIMARY}
                                disabled={isOperatorApprovePending}
                            >
                                Confirm
                            </Button>
                        </div>
                    </ShowIf>
                </Restricted>
            </div>
        </PageLayout>
    );
};

export default ReportDetail;
