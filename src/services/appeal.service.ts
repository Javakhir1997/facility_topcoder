import {extractIds, interceptor} from '@app/shared'
import {
	IAppealDetail, IAppealFileGenerate,
	IAppealForm,
	IAppealList, IAttachmentResponse,
	IListResponse, IOperatorReturnAppealForm,
	IReplyAppealForm,
	IReturnAppealForm,
	ISearchParams
} from '@app/interfaces'


export const AppealService = {
	async getAppeals(queryParams: ISearchParams, isOperator: boolean = false, isDirector: boolean = false) {
		const res = await interceptor<IListResponse<IAppealList>>(`appeal/${isDirector ? 'director/appeal/list' : isOperator ? 'operator/appeal/list' : 'application'}`, {params: queryParams})
		return res.data
	},

	async getAppeal(id: number | string) {
		const res = await interceptor<IAppealDetail>(`application/${id}`)
		return res.data
	},

	async addAppeal(data: IAppealForm) {
		// const newData = {
		//     firstname: data.firstName,
		//     lastname: data.lastName,
		//     patronymic: data.middleName,
		//     id_number: data.idNumber,
		//     inn_number: data.tin,
		//     address: data.address,
		//     organization: data.organization,
		//     bank_account: data.bankAccount,
		//     phone: data.phone,
		//     region: data.region,
		//     sxo_region: data.wmfRegion,
		//     email: data.email,
		//     description: data.content,
		//     sxo_objects: data.objects,
		//     object_types: data.wmfType,
		//     owner_organization: data.balanceHolder,
		//     files: [data?.attachment, ...extractIds(data.files) as (string | number)[]],
		// }
		const res = await interceptor.post('application', data)
		return res.data
	},

	async appealFileGenerate(data: IAppealFileGenerate) {
		const newData = {
			fullname: data.fullName,
			company_name: data.company_name,
			object_type: data.object_type,
			object_name: data.object_name,
			owner_organization: data.owner_organization,
			object_region: data.object_region
		}
		const res = await interceptor.post<IAttachmentResponse>('appeal-file-generate', newData)
		return res.data
	},

	async editAppeal(data: IAppealForm, id: string) {
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
		const res = await interceptor.patch(`appeal/business-owner/${id}`, newData)
		return res.data
	},

	async replyAppeal(data: IReplyAppealForm, id: string) {
		const newData = {
			appeal: id,
			text: data.responseText,
			files: extractIds(data.files)
		}
		const res = await interceptor.post(`appeal/operator/${data.responseType}`, newData)
		return res.data
	},

	async approveAppeal(id: string) {
		const res = await interceptor(`appeal/director/${id}/approve`)
		return res.data
	},

	async operatorApproveAppeal(id: string) {
		const res = await interceptor(`appeal/operator/${id}/send-user`)
		return res.data
	},

	async returnAppeal(data: IReturnAppealForm, id: string) {
		const newData = {
			note: data.comment
		}
		const res = await interceptor.patch(`appeal/director/${id}/return`, newData)
		return res.data
	},

	async operatorReturnAppeal(data: IOperatorReturnAppealForm, id: string) {
		const newData = {
			appeal: id,
			text: data.responseText,
			files: extractIds(data.files)
		}
		const res = await interceptor.post(`appeal/operator/returned`, newData)
		return res.data
	}
}