import { ReactNode } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyCellRenderPlugin, MosaicDataTableHeadCellRenderPlugin, MosaicDataTablePlugin } from "../types/table-types";
import { TableCell, TableCellProps, useMediaQuery } from "@mui/material";
import { alpha, Breakpoint, SxProps, Theme } from "@mui/material/styles";
import { MosaicDataTableCellRoot } from "../style";

export const PinnedColumnsPlugin: MosaicDataTableBodyCellRenderPlugin & MosaicDataTableHeadCellRenderPlugin = {
    scope: ['body-cell-render', 'head-cell-render'] as const,
    renderBodyCell: (headCell: ColumnDef<any>, row: any, gridApi: GridApi, sx: SxProps<Theme>, children?: ReactNode, cellProps?: TableCellProps) => {
        return getCell(headCell, gridApi, '', sx, children, cellProps);
    },
    renderHeadCell: (headCell: ColumnDef<any>, gridApi: GridApi, caller: string, sx: SxProps<Theme>, children?: ReactNode, cellProps?: TableCellProps) => {
        return getCell(headCell, gridApi, caller, sx, children, cellProps);
    }
}

const getCell = (headCell: ColumnDef<any>, gridApi: GridApi, caller: string, sx: SxProps<Theme>, children?: ReactNode, cellProps?: TableCellProps) => {

    if (!headCell.pin) {
        return null;
    }

    let leftOffset: number | undefined = undefined;
    let rightOffset: number | undefined = undefined;

    if (headCell.pin === 'left' || headCell.pin === true) {

        const leftPins = gridApi.getColumns()
            .filter(i => i.pin === 'left' || i.pin === true);

        const beforePins = leftPins.slice(0, leftPins.findIndex(col => col.id === headCell.id));

        leftOffset = beforePins.reduce((acc, col) => acc + col.width!, 0);


    }

    if (headCell.pin == 'right' || headCell.pin === true) {
        const rightPins = gridApi.getColumns()
            .filter(i => i.pin === 'right' || i.pin === true);

        const beforePins = rightPins.slice(rightPins.findIndex(col => col.id === headCell.id) + 1)
            .reverse();

        rightOffset = beforePins.reduce((acc, col) => acc + col.width!, 0);

        // return <MosaicDataTableCellRoot key={headCell.id} sx={{
        //     ...sx,
        //     position: 'sticky',
        //     right: rightOffset,
        //     backgroundColor: (theme: Theme) => theme.palette.background.paper,
        //     width: headCell.width ?? '40px',
        //     minWidth: headCell.width ?? '40px',
        //     zIndex: 1,
        // }}>{children}</MosaicDataTableCellRoot>
    }

    return <MosaicDataTableCellRoot key={headCell.id} {...cellProps} sx={{
        position: 'sticky',
        left: leftOffset,
        right: rightOffset,
        backgroundColor: 'var(--mui-palette-MosaicDataTable-background)',
        width: headCell.width ?? '40px',
        minWidth: headCell.width ?? '40px',
        zIndex: 1,
        ...sx,
    }}>{children}</MosaicDataTableCellRoot>
}


interface ResponsivePinProps {
    pin: 'left' | 'right' | boolean
    breakpoint: Breakpoint | number;
    direction?: 'up' | 'down'
}
export const useResponsivePin = ({
    pin,
    breakpoint,
    direction = 'up'
}: ResponsivePinProps): 'left' | 'right' | boolean | undefined => {
    const isActive = useMediaQuery((theme: Theme) => theme.breakpoints[direction](breakpoint));
    if (isActive) {
        return pin;
    }
    return undefined;
}