import { ReactNode } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableHeadCellContentRenderPlugin } from "../types/table-types";
import { DockedDiv } from "../style";
import { alpha, Theme } from '@mui/material/styles';

export const HighlightColumnPlugin = (props: {
    isColumnHighlighted?: (headCellId: string) => boolean;
}): MosaicDataTableHeadCellContentRenderPlugin & MosaicDataTableBodyCellContentRenderPlugin => {

    return {
        type: ['head-cell-content-render', 'body-cell-content-render'] as const,

        renderHeadCellContent: (headCell: ColumnDef<any>, gridApi: GridApi, children?: ReactNode) => {

            if (!headCell.highlight && !props.isColumnHighlighted?.(headCell.id)) {
                return children;
            }

            return <DockedDiv className="MuiTableCellDockedDiv-root" sx={{
                backgroundColor: 'var(--mui-palette-MosaicDataTable-highlight)'
            }}> {children} </DockedDiv>
        },
        renderBodyCellContent: (headCell: ColumnDef<any>, row: any, gridApi: GridApi, children?: ReactNode) => {
            
            if (!headCell.highlight && !props.isColumnHighlighted?.(headCell.id)) {
                return children;
            }

            return <DockedDiv className="MuiTableCellDockedDiv-root" sx={{
                backgroundColor: 'var(--mui-palette-MosaicDataTable-highlight)'
            }}> {children} </DockedDiv>
        }
    }
}   
