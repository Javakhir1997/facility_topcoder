import {ISearchParams, ISelectOption} from '@app/interfaces'
import {interceptor} from '@app/shared'


export const CommonService = {
	async getSelectList(type: string, queryParams?: ISearchParams, id?: string): Promise<ISelectOption[]> {
		const res = await interceptor<ISelectOption[]>(`common/${type}${id ? `/${id}` : ``}`, {params: queryParams})
		return res.data
	},
	async getRegions(queryParams?: ISearchParams): Promise<ISelectOption[]> {
		const res = await interceptor<ISelectOption[]>('common/region', {params: queryParams})
		return res.data
	},
	async getActivityTypes(queryParams?: ISearchParams): Promise<ISelectOption[]> {
		const res = await interceptor<ISelectOption[]>('common/activity-types-select', {params: queryParams})
		return res.data
	},
    async getDistricts(id:number | null){
        const res = await interceptor(
          `https://dxsh.technocorp.uz/api/common/districts?region=${id}`
        );
        return res.data
    }
}