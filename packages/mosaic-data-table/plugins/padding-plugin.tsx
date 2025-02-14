import { memo, ReactNode } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableHeadCellContentRenderPlugin } from "../types/table-types";
import { Box, styled } from "@mui/material";


// Create a memoized wrapper component
const PaddedBox = styled(Box)({
    padding: 8 // equivalent to padding={1}
});


export const PaddingPluggin = ({ 
    skipCellHeads = ['sys_expansion', 'sys_selection', 'sys_actions'] as const 
}: {
    skipCellHeads?: string[];
}): MosaicDataTableHeadCellContentRenderPlugin & MosaicDataTableBodyCellContentRenderPlugin => {

    return {
        scope: ['head-cell-content-render', 'body-cell-content-render'],

        renderHeadCellContent: (headCell: ColumnDef<any>, gridApi: GridApi, caller: string,children?: ReactNode) => {

            if(caller != 'mosaic-data-table'){
                return children;
            }
            
            if(skipCellHeads?.includes(headCell.id)){
                return children;
            }

            return gridApi.memoStore.memoFunction(`padding-head${headCell.id}`,(children: ReactNode) => (<PaddedBox> {children} </PaddedBox>))(children);
        },
        renderBodyCellContent: (headCell: ColumnDef<any>, row: any, gridApi: GridApi, children?: ReactNode) => {
            
            if(skipCellHeads?.includes(headCell.id)){
                return children;
            }

            return gridApi.memoStore.memoFunction(`padding-body${headCell.id}-${JSON.stringify(row)}`, (children: ReactNode) => (<PaddedBox> {children} </PaddedBox>))(children);
        }
    }
}   
