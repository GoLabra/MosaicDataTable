import { ReactNode } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyExtraRowEndPlugin, MosaicDataTableBodyCellContentRenderPlugin } from "../types/table-types";
import { MosaicDataTableBodyRow } from "../MosaicDataTableBodyRow";

export const SummaryRowPlugin = ({
    visible = true,
    summaryColumns, 
    key
}: {
    visible?: boolean,
    summaryColumns: Record<string, string | ReactNode | ((row: any) => string | ReactNode)>,
    key: string
}): MosaicDataTableBodyExtraRowEndPlugin & MosaicDataTableBodyCellContentRenderPlugin => {

    return {
        scope: ['body-extra-row-end', 'body-cell-content-render'] as const,
        getBodyExtraRowEnd: (columns: Array<ColumnDef<any>>, items: any, gridApi: GridApi) => {

            if (!visible) {
                return null;
            }

            return (
                <MosaicDataTableBodyRow
                    key={`sys_extra_row_${key}`}
                    row={{ sys_extra_row: true, sys_summary_row: true, key:key }}
                    headCells={columns}
                    plugins={gridApi.getPlugins()}
                    gridApi={gridApi}
                />
            )
        },
        renderBodyCellContent: (column: ColumnDef<any>, row: any, gridApi: GridApi, children?: ReactNode) => {

            if (row && row['sys_summary_row'] && row['key'] == key) {

                const contentHandler = summaryColumns[column.id];
                const content = typeof contentHandler === 'function' ? contentHandler(column) : contentHandler;

                return content;
            }
            return children;
        }
    }
}   
