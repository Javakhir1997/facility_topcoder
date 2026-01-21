import {interceptor} from '@app/shared'
import {IChallenge} from '@app/interfaces'


export const SignatureService = {

	async getChallenge() {
		const res = await interceptor<IChallenge>(`/accounts/eimzo/challenge`);
		return res.data
	},

	async getTimestamp(data: { pkcs7: string }) {
		const res = await interceptor.post<IChallenge>(`frontend/timestamp/pkcs7`, data)
		return res.data
	},

	async login(credentials: string) {
		const response = await interceptor.post('accounts/e-imzo-login', {token: credentials})
		return response.data
	}


}