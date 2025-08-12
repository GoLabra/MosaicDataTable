import { ReactNode, useEffect, useMemo, useSyncExternalStore } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyCellRenderPlugin, MosaicDataTableHeadCellRenderPlugin, MosaicDataTablePlugin, PinProps, MosaicDataTableGridColumnsPlugin } from "../types/table-types";
import { TableBodyProps, TableCell, TableCellProps, useMediaQuery } from "@mui/material";
import { alpha, Breakpoint, SxProps, Theme } from "@mui/material/styles";
import { MosaicDataTableCellRoot } from "../style";
import { createMediaQueryListManager } from "../util/createMediaQueryListManager";
import { responsiveColumnStore, useMediaQueryStore } from "../util/responsive-column-store";

export const PinnedColumnsPlugin = (): MosaicDataTableBodyCellRenderPlugin & MosaicDataTableHeadCellRenderPlugin => {

	const mediaQueryStore = responsiveColumnStore();

	return {
		scope: ['body-cell-render', 'head-cell-render'] as const,
		renderBodyCell: ({ headcell, rowId, gridApi, props, sx, children, cellProps }) => {

			if (!headcell.pin) {
				return null;
			}

			return (<PinnedCell
				mediaQueryStore={mediaQueryStore}
				headCell={headcell}
				headCells={gridApi.columns}
				caller={'body-cell-render'}
				props={props}
				sx={sx}
				children={children}
				cellProps={cellProps} />);
		},
		renderHeadCell: ({ headcell, gridApi, caller, props, sx, children, cellProps }) => {

			if (!headcell.pin) {
				return null;
			}

			return (<PinnedCell
				mediaQueryStore={mediaQueryStore}
				headCell={headcell}
				headCells={gridApi.columns}
				caller={caller}
				props={props}
				sx={sx}
				children={children}
				cellProps={cellProps}
			/>);
		}
	}
}

interface PinnedCellProps {
	mediaQueryStore: ReturnType<typeof responsiveColumnStore>,
	headCell: ColumnDef<any>,
	headCells: Array<ColumnDef<any>>
	caller: string
	props: TableCellProps
	sx: SxProps<Theme>
	children?: ReactNode
	cellProps?: TableCellProps
}
const PinnedCell = (props: PinnedCellProps) => {

	const mediaStatus = useMediaQueryStore(props.mediaQueryStore, props.headCell, props.headCells.map(i => i.id));

	useEffect(() => {
    	mediaStatus.registerForResponsiveChanges();
	}, [props.headCell]);

	const pinProps = mediaStatus.props ?? {};

	return <MosaicDataTableCellRoot key={props.headCell.id} {...props.cellProps} sx={{
		...pinProps,
		backgroundColor: 'var(--mui-palette-MosaicDataTable-background)',
		width: props.headCell.width ?? '40px',
		minWidth: props.headCell.width ?? '40px',
		
		...props.sx,
		...props.props
	}}>{props.children}</MosaicDataTableCellRoot>
}

export const createResponsivePin = (pin: PinProps["pin"], responsiveBreakpoint: PinProps["responsiveBreakpoint"], direction?: PinProps["direction"]) => {
	return {
		pin,
		responsiveBreakpoint,
		direction
	}
}

