import { ReactNode } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableHeadCellContentRenderPlugin } from "../types/table-types";
import { DockedDiv } from "../style";
import { alpha, Theme } from '@mui/material/styles';

export const HighlightColumnPlugin = (props: {
    isColumnHighlighted?: (headCellId: string) => boolean;
}): MosaicDataTableHeadCellContentRenderPlugin & MosaicDataTableBodyCellContentRenderPlugin => {

    return {
        scope: ['head-cell-content-render', 'body-cell-content-render'] as const,

        renderHeadCellContent: ({headcell, gridApi, caller, children}) => {

            if (!headcell.highlight && !props.isColumnHighlighted?.(headcell.id)) {
                return children;
            }

            return gridApi.memoStore.memoFunction(`padding-body${headcell.id}`, (children: ReactNode) => (
                <DockedDiv className="MuiTableCellDockedDiv-root" sx={{
                    backgroundColor: 'var(--mui-palette-MosaicDataTable-highlight)'
                }}> {children} </DockedDiv>
            ))(children);
        },
        renderBodyCellContent: ({headcell, rowId, gridApi, children}) => {
            
            if (!headcell.highlight && !props.isColumnHighlighted?.(headcell.id)) {
                return children;
            }

            return gridApi.memoStore.memoFunction(`padding-body-${headcell.id}-${rowId}`, (children: ReactNode) => (
                <DockedDiv className="MuiTableCellDockedDiv-root" sx={{
                    backgroundColor: 'var(--mui-palette-MosaicDataTable-highlight)'
                }}> {children} </DockedDiv>
            ))(children);
        }
    }
}   
