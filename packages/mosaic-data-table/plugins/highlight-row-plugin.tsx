import { ReactNode } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyCellContentRenderPlugin } from "../types/table-types";
import { DockedDiv } from "../style";
import { alpha, Theme } from '@mui/material/styles';

export const HighlightRowPlugin = (props: {
    isRowHighlighted?: (row: any) => boolean;
}): MosaicDataTableBodyCellContentRenderPlugin => {

    return {
        scope: 'body-cell-content-render',
        renderBodyCellContent: (headCell: ColumnDef<any>, row: any, gridApi: GridApi, children?: ReactNode) => {
            const isRowHighlighted = props.isRowHighlighted?.(row);

            if (!isRowHighlighted) {
                return children;
            }
            
            return gridApi.memoStore.memoFunction(`padding-body${headCell.id}-${JSON.stringify(row)}`, (children: ReactNode) => (
                <DockedDiv sx={{
                    backgroundColor: 'var(--mui-palette-MosaicDataTable-highlight)'
                }}> {children} </DockedDiv>
            ))(children);
         
        }
    }
}   
