import { ReactNode, useState } from "react";
import { GridApi, HeadCell, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableGridColumnsPlugin, MosaicDataTablePlugin } from "../types/table-types";
import { Box } from "@mui/material";

export const ColumnsFillRowSpacePlugin: MosaicDataTableGridColumnsPlugin & MosaicDataTableBodyCellContentRenderPlugin = {
    type: ['grid-columns', 'body-cell-content-render'] as const,
    getColumns: (columns: Array<HeadCell<any>>) => {
        return [
            ...columns,
            {
                id: 'columns-fill-row-space',
                label: '',
            }
        ];
    },
    renderBodyCellContent: (headCell: HeadCell<any>, row: any, gridApi: GridApi, children?: ReactNode) => {
        if (headCell.id == 'columns-fill-row-space') {
            return (<>{children}</>)
        }

        return children;
    }
}

