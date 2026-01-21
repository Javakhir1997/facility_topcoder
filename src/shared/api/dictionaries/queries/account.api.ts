import {interceptor} from "@app/shared";
import {API_ENDPOINTS} from "@shared/api/endpoints.ts";

export const accountsApi ={
    list: async () => {
        const {data} = await interceptor.get<{label: string, value: string}[]>(`${API_ENDPOINTS.ACCOUNT}`)
        return data;
    }
}
