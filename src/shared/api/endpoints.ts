export const API_ENDPOINTS: Record<string, string> = {
    ACCOUNT: '/accounts/select',
    APPLICATION: 'application',
    APPLICATION_REJECT: 'application/rejection-application',
    APPLICATION_CONFIRM: 'application/confirm-application',
    APPLICATION_CONFIRM_BY_PERFORMER: 'application/confirm-application-by-performer',
    APPLICATION_CONFIRM_BY_HAVZA: 'application/confirmation-documents-application-evaluation',
    APPLICATION_REJECT_BY_PERFORMER: 'application/rejection-application-by-performer',
    APPLICATION_SET_RESPONSIBILITY: 'application/performer-application-create',
    APPLICATION_SET_BALANCE: 'application/object-evolution-by-balance-organization',
    APPLICATION_SET_BALANCE_OBJECT_INFO: 'application/confirmation-documents-application-create',
    APPLICATION_SET_OBJECT_CONCEPT: 'application/concept',

    DEAL_REJECT_BY_PERFORMER: '',
    DEAL_CONFIRM_BY_PERFORMER: '',
    DEAL_CONFIRM_BY_VAZ_DXSH: '',
    DEAL_CONFIRM_BY_HAVZA: '',
    DEAL_CONFIRM_BY_MINISTRYHEAD:'deal/evaluation-deal-by-ministry',
    DEAL_REJECT_FINANCE_DXSH: 'deal/evaluation-deal-by-finance-ministry',
    DEAL_REJECT_APPLICANT_DXSH: 'deal/evaluation-deal-by-entrepreneur',
    DEAL_REJECT_MINISTRY:'deal/evaluation-deal-by-ministry',
    DEAL_REJECT_VAZ_DXSH:'deal/evaluation-deal-by-vaz-dxsh',
    DEAL_REJECT_MASULBOLIMDXSH_DXSH:'deal/evaluation-deal',


    FILE_UPLOAD_FOR_DEAL: ''
}
