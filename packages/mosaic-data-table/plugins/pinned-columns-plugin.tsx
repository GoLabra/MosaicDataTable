import { ReactNode } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyCellRenderPlugin, MosaicDataTableHeadCellRenderPlugin, MosaicDataTablePlugin } from "../types/table-types";
import { TableBodyProps, TableCell, TableCellProps, useMediaQuery } from "@mui/material";
import { alpha, Breakpoint, SxProps, Theme } from "@mui/material/styles";
import { MosaicDataTableCellRoot } from "../style";

export const PinnedColumnsPlugin: MosaicDataTableBodyCellRenderPlugin & MosaicDataTableHeadCellRenderPlugin = {
    scope: ['body-cell-render', 'head-cell-render'] as const,
    renderBodyCell: ({headcell, rowId, gridApi, props, sx, children, cellProps}) => {
        return gridApi.memoStore.memoFunction(`pinned-columns-body-${rowId}-${headcell.id}`, getCell)(headcell, gridApi.columns, '', props, sx, children, cellProps);
    },
    renderHeadCell: ({headcell, gridApi, caller, props, sx, children, cellProps}) => {
        return gridApi.memoStore.memoFunction(`pinned-columns-head-${headcell.id}`, getCell)(headcell, gridApi.columns, caller, props, sx, children, cellProps);
    }
}

const getCell = (headCell: ColumnDef<any>, headCells: Array<ColumnDef<any>>, caller: string, props: TableCellProps, sx: SxProps<Theme>, children?: ReactNode, cellProps?: TableCellProps) => {

    if (!headCell.pin) {
        return null;
    }

    let leftOffset: number | undefined = undefined;
    let rightOffset: number | undefined = undefined;

    if (headCell.pin === 'left' || headCell.pin === true) {

        const leftPins = headCells
            .filter(i => i.pin === 'left' || i.pin === true);

        const beforePins = leftPins.slice(0, leftPins.findIndex(col => col.id === headCell.id));

        leftOffset = beforePins.reduce((acc, col) => acc + col.width!, 0);


    }

    if (headCell.pin == 'right' || headCell.pin === true) {
        const rightPins = headCells
            .filter(i => i.pin === 'right' || i.pin === true);

        const beforePins = rightPins.slice(rightPins.findIndex(col => col.id === headCell.id) + 1)
            .reverse();

        rightOffset = beforePins.reduce((acc, col) => acc + col.width!, 0);
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
        ...props
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