import {useMutation} from '@tanstack/react-query'
import {SignatureService} from '@app/services'


export default function Index(type: 'challenge' | 'timestamp' = 'challenge') {
	const {
		isPending,
		mutateAsync: handleChallenge
	} = useMutation({
		mutationFn: (data?: {
			pkcs7: string
		}) => type === 'challenge' ? SignatureService.getChallenge() : SignatureService.getTimestamp(data as {
			pkcs7: string
		})
	})

	return {isPending, handleChallenge}
}
