import { SxProps, Theme } from "@mui/material";
import { ColumnDef, GridApi, MosaicDataTableBodyCellStylePlugin } from "mosaic-data-table";

export const RedCellPlugin: MosaicDataTableBodyCellStylePlugin  =  {
    scope: 'body-cell-style',
    getBodyCellStyle(headCell: ColumnDef<any>, row: any, gridApi: GridApi): SxProps<Theme> {
        return { backgroundColor: '#ff000070 !important' };
    }
}