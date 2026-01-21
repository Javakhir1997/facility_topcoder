import {useQuery} from '@tanstack/react-query'
import {ApplicationService, DealService} from '@app/services'
import {useAppContext, usePagination} from '@app/hooks'
import {getSearchParamsAsObject, ROLE_LIST} from '@app/shared'
import {useSearchParams} from 'react-router-dom'


export default function Index() {
	const {page, pageSize} = usePagination()
	const [searchParams] = useSearchParams()
	const {status = 'all'} = getSearchParamsAsObject(searchParams)
	const {user} = useAppContext()

	const {isPending, data} = useQuery({
			queryKey: ['deals', page, pageSize, status],
			queryFn: () => DealService.getAnnouncements(
				{
					page: String(page),
					pageSize: String(pageSize),
					st: status !== 'all' ? status : ''
				},
				
			),
			enabled: Boolean(page && pageSize)
		}
	)

	const deals = data?.results ?? []
	const total = data?.count ?? 0
	const totalPages = data?.totalPages ?? 1
	const currentPage = data?.currentPage ?? 1

	return {isPending, deals, totalPages, total, currentPage}
}
