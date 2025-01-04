import { ReactNode } from "react";
import { GridApi, HeadCell, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableHeadCellContentRenderPlugin } from "../types/table-types";
import { DockedDiv } from "../style";
import { alpha, Theme } from '@mui/material/styles';

export const HighlightColumnPlugin = (props: {
    isColumnHighlighted?: (headCellId: string) => boolean;
}): MosaicDataTableHeadCellContentRenderPlugin & MosaicDataTableBodyCellContentRenderPlugin => {

    return {
        type: ['head-cell-content-render', 'body-cell-content-render'] as const,

        renderHeadCellContent: (headCell: HeadCell<any>, gridApi: GridApi, children?: ReactNode) => {

            const isColumnHighlighted = props.isColumnHighlighted?.(headCell.id);

            if(!isColumnHighlighted){
                return children;
            }

            return <DockedDiv className="MuiTableCellDockedDiv-root" sx={{
                backgroundColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.3),
            }}> {children} </DockedDiv>
        },
        renderBodyCellContent: (headCell: HeadCell<any>, row: any, gridApi: GridApi, children?: ReactNode) => {
            const isColumnHighlighted = props.isColumnHighlighted?.(headCell.id);

            if(!isColumnHighlighted){
                return children;
            }

            return <DockedDiv className="MuiTableCellDockedDiv-root" sx={{
                backgroundColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.3),
            }}> {children} </DockedDiv>
        }
    }
}   
