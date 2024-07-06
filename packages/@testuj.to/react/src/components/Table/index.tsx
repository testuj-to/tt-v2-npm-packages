import { ReactNode } from "react";
import get from "lodash.get";
import cx from "classnames";

import "./styles.css";

export interface Column<Item> {
    key: string;
    title?: ReactNode;
    dataPath?: string;
    render?(item: Item);
}

export interface TableProps<Item> {
    columns?: Column<Item>[];
    data?: Item[];
}

export const Table = <Item extends any>({ columns, data }: TableProps<Item>) => {
    return (
        <table className={cx("tt-table-container")}>
            <thead className={cx("tt-table-head")}>
                <tr className={cx("tt-table-row")}>
                    {(columns || []).map((column, index) => (
                        <th
                            key={`${index}${column?.key}`}
                            className={cx("tt-table-cell")}
                        >
                            {column?.title}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className={cx("tt-table-body")}>
                {(data || []).map((item, index) => (
                    <tr
                        key={`${index}`}
                        className={cx("tt-table-row")}
                    >
                        {(columns || []).map((column, index) => (
                            <td
                                key={`${index}${column?.key}`}
                                className={cx("tt-table-cell")}
                            >
                                {typeof column?.render === "function" ?
                                    column.render(item) :
                                    (column?.dataPath ? get(item, column.dataPath) : null)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
