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
        type: ['head-cell-content-render', 'body-cell-content-render'],

        renderHeadCellContent: (headCell: ColumnDef<any>, gridApi: GridApi, caller: string,children?: ReactNode) => {

            if(caller != 'mosaic-data-table'){
                return children;
            }
            
            if(skipCellHeads?.includes(headCell.id)){
                return children;
            }

            return <PaddedBox> {children} </PaddedBox>
        },
        renderBodyCellContent: (headCell: ColumnDef<any>, row: any, gridApi: GridApi, children?: ReactNode) => {
            
            if(skipCellHeads?.includes(headCell.id)){
                return children;
            }

            return <PaddedBox> {children} </PaddedBox>
        }
    }
}   
