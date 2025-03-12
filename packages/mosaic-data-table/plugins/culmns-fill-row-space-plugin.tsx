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
    getColumns: ({ headCells, memoStore }) => {
        return memoStore.memoFunction('columns-fill-row-space-columns', (headCells: Array<ColumnDef<any>>) => [
            ...headCells,
            columns_fill_row_space
        ])(headCells);
    },
    renderBodyCellContent: ({ headcell, gridApi, children }) => {
        if (headcell.id == 'columns-fill-row-space') {
            return gridApi.memoStore.memoFunction(`columns-fill-row-space`, () => (<></>))();
        }

        return children;
    }
}

