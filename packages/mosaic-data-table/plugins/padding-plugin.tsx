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

        renderHeadCellContent: ({headcell, gridApi, caller,children}) => {

            if(caller != 'mosaic-data-table'){
                return children;
            }
            
            if(skipCellHeads?.includes(headcell.id)){
                return children;
            }

            return gridApi.memoStore.memoFunction(`padding-head${headcell.id}`,(children: ReactNode) => (<PaddedBox> {children} </PaddedBox>))(children);
        },
        renderBodyCellContent: ({headcell, rowId, gridApi, children}) => {
            
            if(skipCellHeads?.includes(headcell.id)){
                return children;
            }

            return gridApi.memoStore.memoFunction(`padding-body${headcell.id}-${rowId}`, (children: ReactNode) => (<PaddedBox> {children} </PaddedBox>))(children);
        }
    }
}   
