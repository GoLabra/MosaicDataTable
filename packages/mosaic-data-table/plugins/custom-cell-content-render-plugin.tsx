import { ReactNode } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyCellContentRenderPlugin } from "../types/table-types";


export const CustomBodyCellContentRenderPlugin: MosaicDataTableBodyCellContentRenderPlugin = {
    scope: 'body-cell-content-render',
    renderBodyCellContent: ({headcell, gridApi, row, rowId}) => { 

        if(row && row['sys_extra_row']){
            return null;
        }

        const value = gridApi.memoStore.memoFunction(`colum-content-${headcell.id}-${rowId}`, headcell.cell)(row);
        return value;
    }
}