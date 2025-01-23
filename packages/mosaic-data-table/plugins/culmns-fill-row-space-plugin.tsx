import { ReactNode, useState } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableGridColumnsPlugin, MosaicDataTablePlugin } from "../types/table-types";
import { Box } from "@mui/material";

export const ColumnsFillRowSpacePlugin: MosaicDataTableGridColumnsPlugin & MosaicDataTableBodyCellContentRenderPlugin = {
    scope: ['grid-columns', 'body-cell-content-render'] as const,
    getColumns: (columns: Array<ColumnDef<any>>) => {
        return [
            ...columns,
            {
                id: 'columns-fill-row-space',
                label: '',
            }
        ];
    },
    renderBodyCellContent: (headCell: ColumnDef<any>, row: any, gridApi: GridApi, children?: ReactNode) => {
        if (headCell.id == 'columns-fill-row-space') {
            return (<>{children}</>)
        }

        return children;
    }
}

