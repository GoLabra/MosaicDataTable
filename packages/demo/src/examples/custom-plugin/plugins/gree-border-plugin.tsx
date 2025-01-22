import { Box, SxProps, Theme } from "@mui/material";
import { GridApi, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableBodyCellRenderPlugin, MosaicDataTableBodyCellStylePlugin, MosaicDataTableBodyRowStylePlugin, MosaicDataTableHeadCellContentRenderPlugin, MosaicDataTableHeadCellStylePlugin } from "mosaic-data-table";
import { ReactNode } from "react";

export const GreenBorderPlugin: MosaicDataTableBodyCellContentRenderPlugin & MosaicDataTableHeadCellContentRenderPlugin =  {
    type: ['body-cell-content-render', 'head-cell-content-render'] as const,
    renderBodyCellContent: (headCell: any, row: any, gridApi: GridApi, children?: ReactNode) => {
        return <Box sx={{ border: '5px solid #028d00 !important;' }}>{children}</Box>;
    },
    renderHeadCellContent: (headCell: any, gridApi: GridApi, caller: string, children?: ReactNode) => {
        if(!children){
            return null;
        }
        return <Box sx={{ border: '5px solid #028d00 !important;' }}>{children}</Box>;
    }

   
}