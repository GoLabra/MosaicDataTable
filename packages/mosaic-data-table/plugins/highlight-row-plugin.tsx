import { ReactNode } from "react";
import { GridApi, HeadCell, MosaicDataTableBodyCellContentRenderPlugin } from "../types/table-types";
import { DockedDiv } from "../style";
import { alpha, Theme } from '@mui/material/styles';

export const HighlightRowPlugin = (props: {
    isRowHighlighted?: (row: any) => boolean;
}): MosaicDataTableBodyCellContentRenderPlugin => {

    return {
        type: 'body-cell-content-render',
        renderBodyCellContent: (headCell: HeadCell<any>, row: any, gridApi: GridApi, children?: ReactNode) => {
            const isRowHighlighted = props.isRowHighlighted?.(row);

            if (!isRowHighlighted) {
                return children;
            }

            return <DockedDiv sx={{
                backgroundColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.1),
            }}> {children} </DockedDiv>
        }
    }
}   
