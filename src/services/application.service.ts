import {
	IApplicationDetail, IApplicationFileGenerate,
	IApplicationForm,
	IApplicationList, IAttachmentResponse, IConceptionDetail, IConceptionList, IConfirmApplicationForm, IFIle,
	IListResponse,
	IOperatorReturnAppealForm,
	IReplyAppealForm,
	ISearchParams,
	ISentForm,
	IWinnerDetailToDeal
} from '@app/interfaces'
import {extractIds, interceptor} from '@app/shared'
import {AttachPerformerDTO, ConfirmConceptionDTO} from "@entities/conception";


export const ApplicationService = {
	async getApplications(queryParams: ISearchParams, isOperator: boolean = false, isDirector: boolean = false, isMOF: boolean = false) {
		const res = await interceptor<IListResponse<IApplicationList>>(`application${isMOF ? 'mof/appeal/list' : isDirector ? 'director/appeal/list' : isOperator ? 'operator/appeal/list' : ''}`, {params: queryParams})
		return res.data
	},

	async getApplication(id: number | string) {
		const res = await interceptor<IApplicationDetail>(`application/business-owner/${id}`)
		return res.data
	},

	async addApplication(data: IApplicationForm, id: string) {
		const newData = {
			appeal: +id,
			project_name: data.name,
			cost: data.cost,
			from_date: +data.startDate,
			to_date: +data.endDate,
			description: data.content,
			files: [data?.attachment, ...extractIds(data.files) as (string | number)[]]
		}
		const res = await interceptor.post('application/business-owner', newData)
		return res.data
	},

	async applicationFileGenerate(data: IApplicationFileGenerate) {
		const newData = {
			company_name: data.company_name,
			object_region: data.object_region,
			object_name: data.object_name,
			object_type: data.object_type,
			fullname: data.fullName,
			day: data.day,
			month: data.month,
			project_cost: data.project_cost,
			from_date: data.from_date,
			to_date: data.to_date,
			bank_account: data.bank_account,
			mfo: 1011
		}
		const res = await interceptor.post<IAttachmentResponse>('contract-file-generate', newData)
		return res.data
	},

	async conceptFileGenerate(data: IApplicationForm, id: number | string) {
		const newData = {
			project_name: data.name,
			project_type: data.project_type,
			volume_work: data.volume_work,
			description_documents_list: data.description_documents_list,
			point3_1: data.point3_1 === 'true',
			point3_2: data.point3_2 === 'true',
			point3_3: data.point3_3 === 'true',
			point3_4: data.point3_4,
			point3_5_a: Number(data.point3_5_a),
			point3_5_b: Number(data.point3_5_b),
			point3_5_v: Number(data.point3_5_v),
			point3_5_g: data.point3_5_g,
			point3_5_d: data.point3_5_d,
			point3_6_a: data.point3_6_a,
			point3_6_b_0: data.point3_6_b,
			point3_6_b: data.point3_6_b,
			point3_7: data.point3_7,
			point3_8_1: data.point3_8_1,
			point3_8_2: data.point3_8_2,
			point3_8_3: data.point3_8_3,
			point3_8_4: data.point3_8_4,
			point3_8_5: data.point3_8_5,
			point3_8_6: data.point3_8_6,
			point3_8_7: data.point3_8_7,
			point3_8_8: data.point3_8_8,
			point3_8_9: data.point3_8_9,
			point3_8_10: data.point3_8_10,
			point3_8_11: data.point3_8_11,
			point3_8_12: data.point3_8_12,
			point3_8_13: data.point3_8_13,
			point3_8_14: data.point3_8_14,
			point3_8_15: data.point3_8_15,
			point3_8_16: data.point3_8_16,
			point3_8_17: data.point3_8_17,
			point3_8_18: data.point3_8_18,
			point3_8_19: data.point3_8_19,
			point3_8_20: data.point3_8_20,
			point3_8_21: data.point3_8_21,
			point3_8_22: data.point3_8_22,
			point3_8_23: data.point3_8_23,
			point3_9_a: data.point3_9_a,
			point3_9_b: data.point3_9_b,
			point3_9_v: data.point3_9_v,
			point3_9_d: data.point3_9_d,
			point3_9_e: data.point3_9_e,
			point3_9_g: data.point3_9_g,
			point3_10_comment: data.point3_10_comment,
			point3_11_comment: data.point3_11_comment,
			point3_12_comment: data.point3_12_comment,
			point3_13: data.point3_13 === 'true',
			point3_14: data.point3_14 === 'true',
			point3_15: data.point3_15 === 'true',
			point3_16: data.point3_16 === 'true',
			point3_17: data.point3_17 === 'true',
			point3_18_a: data.point3_18_a === 'true',
			point3_18_b: data.point3_18_b === 'true',
			application: id,
			point3_19_1: null,
			point3_19_2: null,
			point3_19_3: null,
			point3_19_4: null,
			point3_19_5: null,
			region: null,
			district: null
		}
		const res = await interceptor.post<IFIle>('application/concept-create', newData)
		return res.data
	},

	async editApplication(data: IApplicationForm, id: string) {
		const newData = {
			project_name: data.name,
			cost: data.cost,
			from_date: +data.startDate,
			to_date: +data.endDate,
			files: extractIds(data.files),
			description: data.content
		}
		const res = await interceptor.patch(`application/business-owner/${id}`, newData)
		return res.data
	},

	async editApplicationFiles(data: string | number, id: string | number) {
		const newData = {
			file: data
		}
		const res = await interceptor.patch(`application/director/${id}/add_file`, newData)
		return res.data
	},

	async returnAppeal(data: IOperatorReturnAppealForm, id: string, path: 'director' | 'operator' | 'mof') {
		const newData = {
			application: id,
			text: data.responseText,
			files: extractIds(data.files)
		}
		const res = await interceptor.post(`application/${path}/${path === 'director' ? 'reject' : 'return'}`, newData)
		return res.data
	},

	async sentAppeal(data: ISentForm, id: string) {
		const newData = {
			sxo_files: extractIds(data.files)
		}
		const res = await interceptor.patch(`application/operator/${id}/send-mof`, newData)
		return res.data
	},

	async replyAppeal(data: IReplyAppealForm, id: string) {
		const newData = {
			application: id,
			text: data.responseText,
			files: extractIds(data.files)
		}
		const res = await interceptor.post(`application/mof/${data.responseType}`, newData)
		return res.data
	},

	async operatorApproveAppeal(id: string) {
		const res = await interceptor(`application/operator/${id}/send-user`)
		return res.data
	},

	async approveAppeal(id: string) {
		const res = await interceptor(`application/director/${id}/approve`)
		return res.data
	},

	// new endpoints
	async confirmApplication(data: IConfirmApplicationForm, id: string) {
		const res = await interceptor.post(`application/confirm-application/${id}`, data)
		return res.data
	},
	async returnApplication(data: IConfirmApplicationForm, id: string) {
		const res = await interceptor.post(`application/rejection-application/${id}`, data)
		return res.data
	},

	// conception
	async getConceptions(queryParams: ISearchParams) {
		const res = await interceptor<IListResponse<IConceptionList>>(`application/concept`, {params: queryParams})
		return res.data
	},

	async getConceptionDetail(id: number | string) {
		const res = await interceptor<IConceptionDetail>(`application/concept/${id}`)
		return res.data
	},

	async getWinnerDetailToDeal(id: number | string) {
		const res = await interceptor<IWinnerDetailToDeal>(`application/tenders/${id}/get-participant`)
		console.log(res.data,'winner detil keldi')
		return res.data
	},
	async confirmConception(id: number, data: ConfirmConceptionDTO) {
		const res = await interceptor.put<IConceptionDetail>(`application/send-region-dxsh/${id}`, data)
		return res.data
	},
	async sendToMinistryConception(id: number) {
		const res = await interceptor.put<IConceptionDetail>(`application/send-concept-to-ministry-dxsh/${id}`)
		return res.data
	},
	async evolutionConception(id: number, data: ConfirmConceptionDTO) {
		const res = await interceptor.put<IConceptionDetail>(`application/evaluation-by-region-dxsh-or-balans/${id}`, data)
		return res.data
	},
	async attachPerformerToConception(id: number, data: AttachPerformerDTO) {
		const res = await interceptor.put<IConceptionDetail>(`application/attach-performer-to-concept/${id}`, data.responsibility)
		return res.data
	},
}
