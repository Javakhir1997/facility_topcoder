import classNames from "classnames";
import { Loader } from "@app/components";
import { useTranslation } from "react-i18next";
import { TableOptions, useTable } from "react-table";

import classes from "./styles.module.scss";

const Index = <T extends object & { id: string }>({
  columns,
  data,
  isLoading,
  className,
  screen = true,
  numeric = true,
  spacing = true,
  border = false,
  padding = false,
  handleRow,
}: TableOptions<T>) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const { t } = useTranslation();

  return (
    <div
      className={classNames(classes.root, className, {
        [classes.screen]: screen,
        [classes.loader]: isLoading,
        [classes.numeric]: numeric,
        [classes.padding]: padding,
        [classes.border]: border,
        [classes.space]: !spacing,
        [classes.empty]: !(data && data.length),
      })}
    >
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key: groupKey, ...groupProps } =
              headerGroup.getHeaderGroupProps();

            return (
              <tr key={groupKey} {...groupProps} className={classes.row}>
                {headerGroup.headers.map((column) => {
                  const { key: headerKey, ...headerProps } =
                    column.getHeaderProps();

                  return (
                    <th
                      key={headerKey}
                      {...headerProps}
                      style={{ ...column.style }}
                      rowSpan={column.headerRowSpan}
                    >
                      <>{column.render("Header")}</>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>

        <tbody {...getTableBodyProps()}>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length}>
                <Loader />
              </td>
            </tr>
          ) : (
            <>
              {data && data.length ? (
                <>
                  {spacing && (
                    <tr className={classes.spacing}>
                      <td colSpan={columns.length}></td>
                    </tr>
                  )}

                  {rows.map((row) => {
                    prepareRow(row);

                    const { key: rowKey, ...rowProps } = row.getRowProps();

                    return (
                      <tr
                        key={rowKey}
                        {...rowProps}
                        className={classes.row}
                        onClick={() => handleRow?.(row.original.id)}
                      >
                        {row.cells.map((cell) => {
                          const { key: cellKey, ...cellProps } =
                            cell.getCellProps();

                          return (
                            <td
                              key={cellKey}
                              {...cellProps}
                              style={{ ...cell.column.style }}
                            >
                              <>{cell.render("Cell")}</>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </>
              ) : (
                <tr>
                  <td colSpan={columns.length}>{t("Nothing found")}</td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
