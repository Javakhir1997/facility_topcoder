import {useQuery} from '@tanstack/react-query'
import {ApplicationService} from '@app/services'
import {useParams} from 'react-router-dom'


export default function Index() {
	const {id = ''} = useParams()

	const {isPending, data} = useQuery({
			queryKey: ['winner-to-detail', id],
			queryFn: () => ApplicationService.getWinnerDetailToDeal(id),

		}
	)


	return {isPending, data}
}
