import { ReactNode, useState } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableGridColumnsPlugin, MosaicDataTablePlugin } from "../types/table-types";
import { Box } from "@mui/material";

const columns_fill_row_space = {
    id: 'columns-fill-row-space',
    label: '',
};

export const ColumnsFillRowSpacePlugin: MosaicDataTableGridColumnsPlugin & MosaicDataTableBodyCellContentRenderPlugin = {
    displayName: 'ColumnsFillRowSpacePlugin',
    scope: ['grid-columns', 'body-cell-content-render'] as const,
    getColumns: (columns: Array<ColumnDef<any>>) => {
        return [
            ...columns,
            columns_fill_row_space
        ];
    },
    renderBodyCellContent: (headCell: ColumnDef<any>, row: any, gridApi: GridApi, children?: ReactNode) => {
        if (headCell.id == 'columns-fill-row-space') {
            return gridApi.memoStore.memoFunction(`columns-fill-row-space`, () => (<></>))();
        }

        return children;
    }
}

