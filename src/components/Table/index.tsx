import {FC} from 'react';
import {ReactTable} from "@app/components";
import Pagination from "@components/Pagination";
import styles from "./styles.module.scss"
import {usePagination} from "@app/hooks";

interface IProperties {
    total?: number;
    totalPages?: number;
    numeric?: boolean;
    currentPage?: number;
    pagination?: boolean;
    border?: boolean;
    className?: string;
    screen?: boolean;
    spacing?: boolean;
    isLoading: boolean;
    padding?: boolean;
    handleRow?: (id: string | number) => void;
    data: any
    columns: any
}

const Index: FC<IProperties> = ({
                                    screen,
                                    data,
                                    total,
                                    columns,
                                    totalPages,
                                    isLoading,
                                    pagination = true,
                                    border = false,
                                    numeric = true,
                                    spacing = true,
                                    padding = false,
                                    className,
                                    handleRow,
                                    currentPage
                                }) => {
    const {page, pageSize} = usePagination()
    return (
        <div className={styles.root}>
            <ReactTable
                columns={
                    numeric ?
                        [
                            {
                                Header: "№",
                                accessor: (_, index: number) => ((page - 1) * pageSize) + (index + 1),
                                style: {
                                    width: "3rem",
                                    textAlign: "center"
                                }
                            },
                            ...columns
                        ] :
                        columns
                }
                border={border}
                numeric={numeric}
                data={data}
                screen={screen}
                padding={padding}
                spacing={spacing}
                handleRow={handleRow}
                isLoading={isLoading}
                className={className}
            />
            {
                pagination &&
                <Pagination total={total} totalPages={totalPages} currentPage={currentPage}/>
            }
        </div>
    );
};

export default Index;