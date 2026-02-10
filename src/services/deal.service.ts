import { extractIds, interceptor } from "@app/shared";
import {
  IAnnouncementFileGenerate,
  IAnnouncementForm,
  IAnnouncementList,
  IAttachmentResponse,
  IConceptionDetail,
  IDealDetail,
  IListResponse,
  IOperatorReturnAnnouncementForm,
  IReplyAnnouncementForm,
  IReturnAnnouncementForm,
  ISearchParams,
  IWinnerAddForm,
} from "@app/interfaces";
import { AttachPerformerDealDTO, AttachPerformerDTO, ConfirmDealDTO } from "@entities/deal";

export const DealService = {
  async getDeals(queryParams: ISearchParams) {
    let endpoint = "/deal/list/";

    const res = await interceptor<IListResponse<IAnnouncementList>>(endpoint, {
      params: queryParams,
    });
    console.log(res.data, "ye deals ");
    return res.data;
  },

  async getDeal(id: number | string) {
    const res = await interceptor<any>(`/deal/${id}/detail/`);
    console.log(res.data, "vacacaget deal keldi");
    return res.data;
  },

  // addAppeal -> addAnnouncement
  async addAnnouncement(data: IAnnouncementForm) {
    const res = await interceptor.post("tender", data);
    return res.data;
  },
  // tender.service.ts

  async addWinnerTender(data: IWinnerAddForm, id: string) {
    // Agar data FormData bo'lsa, uni obyektga olamiz
    const rawData =
      data instanceof FormData ? Object.fromEntries(data.entries()) : data;

    const newData = {
      // Number() orqali stringni songa aylantiramiz
      winner: rawData.winner ? Number(rawData.winner) : null,
      vice_winner: rawData.vice_winner ? Number(rawData.vice_winner) : null,
      protocol: rawData.protocol ? Number(rawData.protocol) : null,
    };

    console.log("Backendga ketayotgan toza ma'lumot:", newData);

    const res = await interceptor.patch(
      `application/tenders/${id}/complete/`,
      newData,
    );

    return res.data;
  },
  // appealFileGenerate -> announcementFileGenerate
  async announcementFileGenerate(data: IAnnouncementFileGenerate) {
    const newData = {
      fullname: data.fullName,
      company_name: data.company_name,
      object_type: data.object_type,
      object_name: data.object_name,
      owner_organization: data.owner_organization,
      object_region: data.object_region,
    };
    // Endpoint appeal-file-generate bo'lib qoladi
    const res = await interceptor.post<IAttachmentResponse>(
      "tender-file-generate",
      newData,
    );
    return res.data;
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
      files: [
        data?.attachment,
        ...(extractIds(data.files) as (string | number)[]),
      ],
    };
    // URL: appeal/business-owner
    const res = await interceptor.patch(`tender/business-owner/${id}`, newData);
    return res.data;
  },

  // replyAppeal -> replyAnnouncement
  async replyAnnouncement(data: IReplyAnnouncementForm, id: string) {
    const newData = {
      appeal: id, // DIQQAT: Backend appeal ID kutadi, shuning uchun kalit 'appeal'
      text: data.responseText,
      files: extractIds(data.files),
    };
    // URL: appeal/operator
    const res = await interceptor.post(
      `tender/operator/${data.responseType}`,
      newData,
    );
    return res.data;
  },

  // approveAppeal -> approveAnnouncement
  async approveAnnouncement(id: string) {
    // URL: appeal/director
    const res = await interceptor(`tender/director/${id}/approve`);
    return res.data;
  },

  // operatorApproveAppeal -> operatorApproveAnnouncement
  async operatorApproveAnnouncement(id: string) {
    // URL: appeal/operator
    const res = await interceptor(`tender/operator/${id}/send-user`);
    return res.data;
  },

  // returnAppeal -> returnAnnouncement
  async returnAnnouncement(data: IReturnAnnouncementForm, id: string) {
    const newData = {
      note: data.comment,
    };
    // URL: appeal/director
    const res = await interceptor.patch(
      `tender/director/${id}/return`,
      newData,
    );
    return res.data;
  },

  // operatorReturnAppeal -> operatorReturnAnnouncement
  async operatorReturnAnnouncement(
    data: IOperatorReturnAnnouncementForm,
    id: string,
  ) {
    const newData = {
      appeal: id, // DIQQAT: Backend appeal ID kutadi
      text: data.responseText,
      files: extractIds(data.files),
    };
    // URL: appeal/operator
    const res = await interceptor.post(`tender/operator/returned`, newData);
    return res.data;
  },















  async sendToMinistryDeal(id: number) {
    // const res = await interceptor.put<IConceptionDetail>(`application/send-concept-to-ministry-dxsh/${id}`)
    const res = await interceptor.patch<IConceptionDetail>(`application/concept/evaluation-confirm-concept-by-performer/${id}`)
    return res.data
  },

  async evolutionDeal(id: number, data: ConfirmConceptionDTO) {
    const res = await interceptor.put<IConceptionDetail>(`application/concept/evaluation-by-region-dxsh-or-balans/${id}`, data)
    return res.data
  },

  async evolutionDealConfirmBolimXodim(id: number, data: ConfirmDealDTO) {
    const res = await interceptor.patch<IConceptionDetail>(`deal/evaluation-deal/${id}`, data)
    return res.data
  },
  async confirmVazDxshDeal(id: number, data: ConfirmDealDTO) {
    // const res = await interceptor.put<IConceptionDetail>(`application/send-region-dxsh/${id}`, data)
    const res = await interceptor.patch<IDealDetail>(`deal/evaluation-deal-by-vaz-dxsh/${id}`, data)
    console.log(res, data, 'vazdxshconfirm')
    return res.data
  },



  async confirmFinanceMinistryDeal(id: number, data: ConfirmDealDTO) {
    // const res = await interceptor.put<IConceptionDetail>(`application/send-region-dxsh/${id}`, data)
    const res = await interceptor.patch<IConceptionDetail>(`deal/evaluation-deal-by-finance-ministry/${id}`, data)
    console.log(res, data, 'vazdxshconfirm')
    return res.data
  },

  async confirmApplicantDeal(id: number, data: ConfirmDealDTO) {
    // const res = await interceptor.put<IConceptionDetail>(`application/send-region-dxsh/${id}`, data)
    const res = await interceptor.patch<IConceptionDetail>(`deal/evaluation-deal-by-entrepreneur/${id}`, data)
    console.log(res, data, 'vazdxshconfirm')
    return res.data
  },




  async confirmMinistryHeadDeal(id: number, data: ConfirmDealDTO) {
    // const res = await interceptor.put<IConceptionDetail>(`application/send-region-dxsh/${id}`, data)
    const res = await interceptor.patch<IConceptionDetail>(`deal/evaluation-deal-by-ministry/${id}`, data)
    console.log(res, data, 'vazdxshconfirm')
    return res.data
  },

  async attachRegisterCodeHeadDeal(id: number, data: any) {
    const res = await interceptor.put<IConceptionDetail>(`deal/attach-register-code/${id}`, data)
    console.log(res.data), 'fdfdfdfdfdfd';
    return res.data
  },


  async attachPerformerToDeal(id: number, data: AttachPerformerDealDTO) {
    const res = await interceptor.put<IConceptionDetail>(`deal/attach-performers/${id}`, data)
    console.log(res.data), 'fdfdfdfdfdfd';
    return res.data
  },


  async upload_file_for_deal(id: any, data: any) {
    const res = await interceptor.put<IConceptionDetail>(`deal/${id}/files/upload/`, data)
    console.log(res.data), 'fdfdfdfdfdfd';
    return res.data
  }
};
