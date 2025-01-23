import { ReactNode } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyCellContentRenderPlugin } from "../types/table-types";


export const CustomBodyCellContentRenderPlugin: MosaicDataTableBodyCellContentRenderPlugin = {
    scope: 'body-cell-content-render',
    renderBodyCellContent: (headCell: ColumnDef<any>, row: any, gridApi: GridApi, children?: ReactNode) => {

        if(row && row['sys_extra_row']){
            return null;
        }

        const value = headCell.cell?.(row);
        return value;
    }
}