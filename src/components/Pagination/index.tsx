import {FC} from 'react';
import styles from "./styles.module.scss"
import {usePagination} from "@app/hooks";
import {getSelectValue, paginationOptions} from "@app/shared";
import {Select} from "@components/UI";
import {useTranslation} from "react-i18next";
import ReactPaginate from "react-paginate";
import {Left, Right} from "@app/assets";

interface IProps {
    totalPages?: number
    total?: number
    currentPage?: number
}

const Index: FC<IProps> = ({totalPages = 1, total = 0, currentPage}) => {
    const {onPageChange, onPageSizeChange, pageSize, page} = usePagination()
    const {i18n: {language}, t} = useTranslation()
    const forcePage = currentPage ?? page

    const handlePageClick = (event: { selected: number }): void => {
        onPageChange(event.selected + 1)
    }

    return (
        <div className={styles.root}>
            <p>
                {
                    language === "uz" || language === "uzb" ?
                        `${total} ${t('pagination results')} ${((forcePage - 1) * pageSize) + 1}  - ${forcePage * pageSize} ${t('pagination of')}` :
                        `${((forcePage - 1) * pageSize) + 1} - ${(forcePage * pageSize)} ${t('pagination of')} ${total} ${t('pagination results')}`
                }
            </p>
            <ReactPaginate
                breakLabel="..."
                nextLabel={<Right/>}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                forcePage={forcePage - 1}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel={<Left/>}
                renderOnZeroPageCount={null}
                containerClassName={styles.pagination}
                previousClassName={styles.previous}
                nextClassName={styles.next}
                pageClassName={styles.page}
                breakClassName={styles.page}
                pageLinkClassName={styles.link}
                nextLinkClassName={styles.link}
                previousLinkClassName={styles.link}
                breakLinkClassName={styles.link}
                activeClassName={styles.active}
            />
            <div className={styles.size}>
                <p>
                    {t("On every page")}
                </p>
                <Select
                    top={true}
                    id="pagination"
                    type="filter"
                    options={paginationOptions}
                    value={getSelectValue(paginationOptions, pageSize)}
                    defaultValue={getSelectValue(paginationOptions, pageSize)}
                    handleOnChange={(e) => onPageSizeChange(e as number)}
                />
            </div>
        </div>
    );
};

export default Index;