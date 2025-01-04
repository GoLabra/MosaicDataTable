import { ReactNode } from "react";
import { GridApi, HeadCell, MosaicDataTableBodyCellRenderPlugin, MosaicDataTableHeadCellRenderPlugin, MosaicDataTablePlugin } from "../types/table-types";
import { TableCell } from "@mui/material";
import { alpha, SxProps, Theme } from "@mui/material/styles";
import { MosaicDataTableCellRoot } from "../style";

export const PinnedColumnsPlugin: MosaicDataTableBodyCellRenderPlugin & MosaicDataTableHeadCellRenderPlugin = {
    type: ['body-cell-render', 'head-cell-render'] as const,
    renderBodyCell: (headCell: HeadCell<any>, row: any, gridApi: GridApi, sx: SxProps<Theme>, children?: ReactNode) => {
        return getCell(headCell, gridApi, sx, children);
    }, renderHeadCell: (headCell: HeadCell<any>, gridApi: GridApi, sx: SxProps<Theme>, children?: ReactNode) => { 
        return getCell(headCell, gridApi, sx, children);
    }
}

const getCell = (headCell: HeadCell<any>, gridApi: GridApi, sx: SxProps<Theme>, children?: ReactNode) => {

    if(!headCell.pin){
        return null;
    }

    if(headCell.pin == 'left'){

        const leftPins = gridApi.getColumns()
            .filter(i => i.pin === 'left'); 

        const beforePins = leftPins.slice(0, leftPins.findIndex(col => col.id === headCell.id));
        
        const leftOffset = beforePins.reduce((acc, col) => acc + col.width!, 0);

        return <MosaicDataTableCellRoot key={headCell.id} sx={{
            ...sx,
            position: 'sticky',
            left: leftOffset,
            backgroundColor: (theme: any) => theme.palette.background.paper,
            width: headCell.width ?? '40px',
            minWidth: headCell.width ?? '40px',
            zIndex: 1,
        }}>{children}</MosaicDataTableCellRoot>
    }

    if(headCell.pin == 'right'){
        const rightPins = gridApi.getColumns()
            .filter(i => i.pin === 'right');
        
        const beforePins = rightPins.slice(rightPins.findIndex(col => col.id === headCell.id) + 1)
            .reverse();
        
        const rightOffset = beforePins.reduce((acc, col) => acc + col.width!, 0);

        return <MosaicDataTableCellRoot key={headCell.id} sx={{
            ...sx,
            position: 'sticky',
            right: rightOffset,
            backgroundColor: (theme: Theme) => theme.palette.background.paper,
            width: headCell.width ?? '40px',
            minWidth: headCell.width ?? '40px',
            zIndex: 1,
        }}>{children}</MosaicDataTableCellRoot>
    }
}
