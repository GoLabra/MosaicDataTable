import { Box } from "@mui/material";
import { ColumnDef, GridApi, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableHeadCellContentRenderPlugin } from "mosaic-data-table";
import { ReactNode } from "react";

export const GreenBorderPlugin: MosaicDataTableBodyCellContentRenderPlugin & MosaicDataTableHeadCellContentRenderPlugin =  {
    scope: ['body-cell-content-render', 'head-cell-content-render'] as const,
    renderBodyCellContent: (headCell: ColumnDef<any>, row: any, gridApi: GridApi, children?: ReactNode) => {
        return <Box sx={{ border: '5px solid #028d00 !important;' }}>{children}</Box>;
    },
    renderHeadCellContent: (headCell: ColumnDef<any>, gridApi: GridApi, caller: string, children?: ReactNode) => {
        if(!children){
            return null;
        }
        return <Box sx={{ border: '5px solid #028d00 !important;' }}>{children}</Box>;
    }

   
}