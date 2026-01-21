import {useQuery} from '@tanstack/react-query'
import {AnnouncementService} from '@app/services' // Servis nomi ham o'zgardi deb hisoblaymiz
import {useAppContext, usePagination} from '@app/hooks'
import {getSearchParamsAsObject, ROLE_LIST} from '@app/shared'
import {useSearchParams} from 'react-router-dom'

export default function useAnnouncements() {
    const {page, pageSize} = usePagination()
    const [searchParams] = useSearchParams()
    const {status = 'all'} = getSearchParamsAsObject(searchParams)
    const {user} = useAppContext()

    const {isPending, data} = useQuery({
            // queryKey keshni boshqarish uchun juda muhim, uni ham yangiladik
            queryKey: ['appeals', page, pageSize, status],
            queryFn: () => AnnouncementService.getAnnouncements(
                {
                    page: String(page),
                    pageSize: String(pageSize),
                    st: status !== 'all' ? status : ''
                },
                [ROLE_LIST.OPERATOR].includes(user.role),
                [ROLE_LIST.HEAD].includes(user.role),
                
            ),
            enabled: Boolean(page && pageSize)                           
        }
    )

    // O'zgaruvchi nomi "announcements" ga o'zgartirildi
    const announcements = data?.results ?? []
    const total = data?.count ?? 0
    const totalPages = data?.totalPages ?? 1
    const currentPage = data?.currentPage ?? 1

    return {isPending, announcements, totalPages, total, currentPage}
}