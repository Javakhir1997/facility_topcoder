import {useQuery} from '@tanstack/react-query'
import {TenderService} from '@app/services'
import {useAppContext, usePagination} from '@app/hooks'
import {getSearchParamsAsObject, ROLE_LIST} from '@app/shared'
import {useSearchParams} from 'react-router-dom'


export default function Index() {
	const {page, pageSize} = usePagination()
	const [searchParams] = useSearchParams()
	const {status = 'all'} = getSearchParamsAsObject(searchParams)
	const {user} = useAppContext()

	const {isPending, data} = useQuery({
			queryKey: ['tenders', page, pageSize, status],
			queryFn: () => TenderService.getAnnouncements(
				{
					page: String(page),
					pageSize: String(pageSize),
					st: status !== 'all' ? status : ''
				},
				[ROLE_LIST.OPERATOR].includes(user.role),
				[ROLE_LIST.HEAD].includes(user.role)
			),
			enabled: Boolean(page && pageSize)
		}
	)

	const appeals = data?.results ?? []
	const total = data?.count ?? 0
	const totalPages = data?.totalPages ?? 1
	const currentPage = data?.currentPage ?? 1

	return {isPending, appeals, totalPages, total, currentPage}
}
