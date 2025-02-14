import { ReactNode } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableHeadCellContentRenderPlugin } from "../types/table-types";
import { DockedDiv } from "../style";
import { alpha, Theme } from '@mui/material/styles';

export const HighlightColumnPlugin = (props: {
    isColumnHighlighted?: (headCellId: string) => boolean;
}): MosaicDataTableHeadCellContentRenderPlugin & MosaicDataTableBodyCellContentRenderPlugin => {

    return {
        scope: ['head-cell-content-render', 'body-cell-content-render'] as const,

        renderHeadCellContent: (headCell: ColumnDef<any>, gridApi: GridApi, caller: string, children?: ReactNode) => {

            if (!headCell.highlight && !props.isColumnHighlighted?.(headCell.id)) {
                return children;
            }

            return gridApi.memoStore.memoFunction(`padding-body${headCell.id}`, (children: ReactNode) => (
                <DockedDiv className="MuiTableCellDockedDiv-root" sx={{
                    backgroundColor: 'var(--mui-palette-MosaicDataTable-highlight)'
                }}> {children} </DockedDiv>
            ))(children);
        },
        renderBodyCellContent: (headCell: ColumnDef<any>, row: any, gridApi: GridApi, children?: ReactNode) => {
            
            if (!headCell.highlight && !props.isColumnHighlighted?.(headCell.id)) {
                return children;
            }

            return gridApi.memoStore.memoFunction(`padding-body${headCell.id}-${JSON.stringify(row)}`, (children: ReactNode) => (
                <DockedDiv className="MuiTableCellDockedDiv-root" sx={{
                    backgroundColor: 'var(--mui-palette-MosaicDataTable-highlight)'
                }}> {children} </DockedDiv>
            ))(children);
        }
    }
}   
