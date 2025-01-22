import { SxProps, Theme } from "@mui/material";
import { GridApi, MosaicDataTableBodyCellStylePlugin, MosaicDataTableBodyRowStylePlugin } from "mosaic-data-table";

export const RedCellPlugin: MosaicDataTableBodyCellStylePlugin  =  {
    type: 'body-cell-style',
    getBodyCellStyle: (row: any, gridApi: GridApi): SxProps<Theme> => {
        return { backgroundColor: '#ff000070 !important' };
    }
}