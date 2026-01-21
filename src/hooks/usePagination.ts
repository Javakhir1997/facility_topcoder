import {useSearchParams} from 'react-router-dom'
import {deleteKeysFromObject, getSearchParamsAsObject} from "@app/shared";

function usePagination() {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = getSearchParamsAsObject(searchParams)['page'] ?? 1
    const pageSize = getSearchParamsAsObject(searchParams)['pageSize'] ?? 5

    const onPageChange = (selectedValue: number): void => {
        const urlSearchParams = getSearchParamsAsObject(searchParams)

        if (selectedValue <= 1) {
            const filteredUrlSearchParams = deleteKeysFromObject(urlSearchParams, 'page')
            setSearchParams({...filteredUrlSearchParams, pageSize: String(pageSize)})
        } else {
            setSearchParams({...urlSearchParams, pageSize: String(pageSize), page: String(selectedValue),})
        }
    }

    const onPageSizeChange = (selectedValue: number | undefined | null | string) => {
        const urlSearchParams = getSearchParamsAsObject(searchParams)

        if (selectedValue === 5 || !selectedValue) {
            const filteredUrlSearchParams = deleteKeysFromObject(urlSearchParams, 'pageSize')
            setSearchParams({...filteredUrlSearchParams, page: String(1),})
        } else {
            setSearchParams({...urlSearchParams, pageSize: String(selectedValue), page: String(1)})
        }
    }

    return {
        pageSize: Number(pageSize),
        page: Number(page),
        onPageChange,
        onPageSizeChange,
    }
}

export default usePagination
