import { Box } from "@mui/material";
import { ColumnDef, GridApi, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableHeadCellContentRenderPlugin } from "mosaic-data-table";
import { ReactNode } from "react";

export const GreenBorderPlugin: MosaicDataTableBodyCellContentRenderPlugin & MosaicDataTableHeadCellContentRenderPlugin =  {
    scope: ['body-cell-content-render', 'head-cell-content-render'] as const,
    renderBodyCellContent: ({children}) => {
        return <Box sx={{ border: '5px solid #028d00 !important;' }}>{children}</Box>;
    },
    renderHeadCellContent: ({children}) => {
        if(!children){
            return null;
        }
        return <Box sx={{ border: '5px solid #028d00 !important;' }}>{children}</Box>;
    }

   
}