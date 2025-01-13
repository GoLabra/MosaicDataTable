import { ReactNode } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyExtraRowPlugin, MosaicDataTableBodyCellContentRenderPlugin } from "../types/table-types";
import { MosaicDataTableBodyRow } from "../MosaicDataTableBodyRow";

export const SummaryRowPlugin = ({
    visible = true,
    summaryColumns, 
    key // needed only if you want to use more than one summary row
}: {
    visible?: boolean,
    summaryColumns: Record<string, string | ReactNode | ((row: any) => string | ReactNode)>,
    key?: string
}): MosaicDataTableBodyExtraRowPlugin & MosaicDataTableBodyCellContentRenderPlugin => {

    return {
        type: ['body-extra-row', 'body-cell-content-render'] as const,
        getBodyExtraRow: (columns: Array<ColumnDef<any>>, items: any, gridApi: GridApi) => {

            if (!visible) {
                return null;
            }

            return (
                <MosaicDataTableBodyRow
                    key={`sys_extra_row_${key}`}
                    row={{ sys_extra_row: true }}
                    headCells={columns}
                    plugins={gridApi.getPlugins()}
                    gridApi={gridApi}
                />
            )
        },
        renderBodyCellContent: (column: ColumnDef<any>, row: any, gridApi: GridApi, children?: ReactNode) => {

            if (row && row['sys_extra_row']) {

                const contentHandler = summaryColumns[column.id];
                const content = typeof contentHandler === 'function' ? contentHandler(column) : contentHandler;

                return content;
            }
            return children;
        }
    }
}   
