import { extractIds, interceptor } from '@app/shared'
import {
    IAnnouncementDetail,
    IAnnouncementFileGenerate,
    IAnnouncementForm,
    IAnnouncementList,
    IAttachmentResponse,
    IListResponse,
    IOperatorReturnAnnouncementForm,
    IReplyAnnouncementForm,
    IReturnAnnouncementForm,
    ISearchParams
} from '@app/interfaces'

export const AnnouncementService = {
    // getAppeals -> getAnnouncements (lekin appeal endpointga uradi)
    async getAnnouncements(
        queryParams: ISearchParams, 
        isOperator: boolean = false, 
        isDirector: boolean = false,
        
    ) {
        // Endpointlar APPEAL ga qaytarildi
        let endpoint = 'application'; // Default (Applicant)

        if (isDirector) {
            endpoint = 'appeal/director/appeal/list';
        } else if (isOperator) {
            endpoint = 'appeal/operator/appeal/list';
        } 

        const res = await interceptor<IListResponse<IAnnouncementList>>(endpoint, { params: queryParams });
        return res.data;
    },

    // getAppeal -> getAnnouncement
    async getAnnouncement(id: number | string) {
        // application/{id} ga murojaat qiladi
        const res = await interceptor<IAnnouncementDetail>(`application/${id}`)
        return res.data
    },

    // addAppeal -> addAnnouncement
    async addAnnouncement(data: IAnnouncementForm) {
        const res = await interceptor.post('application', data)
        return res.data
    },

    // appealFileGenerate -> announcementFileGenerate
    async announcementFileGenerate(data: IAnnouncementFileGenerate) {
        const newData = {
            fullname: data.fullName,
            company_name: data.company_name,
            object_type: data.object_type,
            object_name: data.object_name,
            owner_organization: data.owner_organization,
            object_region: data.object_region
        }
        // Endpoint appeal-file-generate bo'lib qoladi
        const res = await interceptor.post<IAttachmentResponse>('appeal-file-generate', newData)
        return res.data
    },

    // editAppeal -> editAnnouncement
    async editAnnouncement(data: IAnnouncementForm, id: string) {
        const newData = {
            firstname: data.firstName,
            patronymic: data.middleName,
            inn_number: data.tin,
            address: data.address,
            id_number: data.idNumber,
            organization: data.organization,
            bank_account: data.bankAccount,
            phone: data.phone,
            region: data.region,
            sxo_region: data.wmfRegion,
            email: data.email,
            description: data.content,
            sxo_objects: data.objects,
            object_types: data.wmfType,
            owner_organization: data.balanceHolder,
            lastname: data.lastName,
            files: [data?.attachment, ...extractIds(data.files) as (string | number)[]]
        }
        // URL: appeal/business-owner
        const res = await interceptor.patch(`appeal/business-owner/${id}`, newData)
        return res.data
    },

    // replyAppeal -> replyAnnouncement
    async replyAnnouncement(data: IReplyAnnouncementForm, id: string) {
        const newData = {
            appeal: id, // DIQQAT: Backend appeal ID kutadi, shuning uchun kalit 'appeal'
            text: data.responseText,
            files: extractIds(data.files)
        }
        // URL: appeal/operator
        const res = await interceptor.post(`appeal/operator/${data.responseType}`, newData)
        return res.data
    },

    // approveAppeal -> approveAnnouncement
    async approveAnnouncement(id: string) {
        // URL: appeal/director
        const res = await interceptor(`appeal/director/${id}/approve`)
        return res.data
    },

    // operatorApproveAppeal -> operatorApproveAnnouncement
    async operatorApproveAnnouncement(id: string) {
        // URL: appeal/operator
        const res = await interceptor(`appeal/operator/${id}/send-user`)
        return res.data
    },

    // returnAppeal -> returnAnnouncement
    async returnAnnouncement(data: IReturnAnnouncementForm, id: string) {
        const newData = {
            note: data.comment
        }
        // URL: appeal/director
        const res = await interceptor.patch(`appeal/director/${id}/return`, newData)
        return res.data
    },

    // operatorReturnAppeal -> operatorReturnAnnouncement
    async operatorReturnAnnouncement(data: IOperatorReturnAnnouncementForm, id: string) {
        const newData = {
            appeal: id, // DIQQAT: Backend appeal ID kutadi
            text: data.responseText,
            files: extractIds(data.files)
        }
        // URL: appeal/operator
        const res = await interceptor.post(`appeal/operator/returned`, newData)
        return res.data
    }
}