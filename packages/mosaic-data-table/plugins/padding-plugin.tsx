import { ReactNode } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableHeadCellContentRenderPlugin } from "../types/table-types";
import { Box } from "@mui/material";

export const PaddingPluggin = ({ 
    skipCellHeads = ['sys_expansion', 'sys_selection', 'sys_actions'] as const 
}: {
    skipCellHeads?: string[];
}): MosaicDataTableHeadCellContentRenderPlugin & MosaicDataTableBodyCellContentRenderPlugin => {

    return {
        type: ['head-cell-content-render', 'body-cell-content-render'],

        renderHeadCellContent: (headCell: ColumnDef<any>, gridApi: GridApi, children?: ReactNode) => {
            if(skipCellHeads?.includes(headCell.id)){
                return children;
            }

            return <Box padding={1}> {children} </Box>
        },
        renderBodyCellContent: (headCell: ColumnDef<any>, row: any, gridApi: GridApi, children?: ReactNode) => {
            
            if(skipCellHeads?.includes(headCell.id)){
                return children;
            }

            return <Box padding={1}> {children} </Box>
        }
    }
}   
