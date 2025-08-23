import { BoxProps, ComponentsOverrides, ComponentsProps, ComponentsVariants, SxProps, TableBodyProps, TableHeadProps, TableProps, TableRowProps, Theme } from '@mui/material'
import { ReactNode } from 'react'

export type Listener = () => void;

export interface Pagination {
    page: number
    rowsPerPage: number
    count: number
}

export interface MosaicDataTableProps<T = any> extends HTMLAttributes {
    caption?: string;
    items: T[] | null;
    headCells: ColumnDef<T>[];
    plugins?: MosaicDataTablePlugin[];
}

export interface EnhancedTableProps<T = any> {
    headCells: ColumnDef<T>[]
    gridApi: React.MutableRefObject<GridApi>;
    caller: string;
    sx?: SxProps<Theme>
}

export interface PinProps {
    pin: 'left' | 'right' | boolean
    responsiveBreakpoint?: Breakpoint | number;
    direction?: 'up' | 'down'
}

export interface ColumnDef<T = any> {
    id: string,
    header: string | (() => string | ReactNode), 
    width?: number
    visible?: boolean = true;

    //plugin needed
    highlight?: boolean;
    cell?: (row: T) => ReactNode;
    pin?: PinProps | PinProps["pin"];
    hasSort?: boolean;
}

export interface Action<T = any> {
    id: string
    render: (item: T) => ReactNode,
    isVisible?: (item: T) => boolean,
}

export interface MosaicDataTablePlugin {
    scope: string | Array<string>;
    onInit?: (gridApi: GridApi) => void;
    displayName?: string;
}

type ArrayWithRequired<T extends string> = [T, ...string[]] | [...string[], T] | [...string[], T, ...string[]];

export interface MosaicDataTableGridColumnsPlugin extends MosaicDataTablePlugin {
    scope: 'grid-columns' | ArrayWithRequired<'grid-columns'>;
    getColumns?: (props: {headCells: Array<HeadCell<any>>, memoStore: MemoStore}) => Array<HeadCell<any>>;
}

export interface MosaicDataTableBodyRenderPlugin extends MosaicDataTablePlugin {
    scope: 'body-render' | ArrayWithRequired<'body-render'>;
    renderBody: (props: {headCells: Array<HeadCell<any>>, rows: any[] | null, gridApi: GridApi, props: TableBodyProps, children?: ReactNode}) => ReactElement;
}

export interface MosaicDataTableHeadRowRenderPlugin extends MosaicDataTablePlugin {
    scope: 'head-row-render' | ArrayWithRequired<'head-row-render'>;
    renderHeadRow?: (props: {gridApi: GridApi, caller: string, props: TableRowProps, sx: SxProps<Theme>, children?: ReactNode}) => ReactElement;
}

export interface MosaicDataTableBodyRowRenderPlugin extends MosaicDataTablePlugin {
    scope: 'body-row-render' | ArrayWithRequired<'body-row-render'>;
    renderBodyRow?: (props: {row: any, gridApi: GridApi, props: TableRowProps, sx: SxProps<Theme>, children?: ReactNode}) => ReactElement;
}

export interface MosaicDataTableHeadCellRenderPlugin extends MosaicDataTablePlugin {
    scope: 'head-cell-render' | ArrayWithRequired<'head-cell-render'>;
    renderHeadCell?: (props: {headcell: ColumnDef<any>, gridApi: GridApi, caller: string, props: TableCellProps, sx: SxProps<Theme>, children?: ReactNode, cellProps?: TableCellProps}) => ReactElement;
}

export interface MosaicDataTableBodyCellRenderPlugin extends MosaicDataTablePlugin {
    scope: 'body-cell-render' | ArrayWithRequired<'body-cell-render'>;
    renderBodyCell?: (props: {headcell: ColumnDef<any>, row: any, rowId: string, gridApi: GridApi, props: TableCellProps, sx: SxProps<Theme>, children?: ReactNode, cellProps?: TableCellProps}) => ReactElement;
}

export interface MosaicDataTableHeadCellContentRenderPlugin extends MosaicDataTablePlugin {
    scope: 'head-cell-content-render' | ArrayWithRequired<'head-cell-content-render'>;
    renderHeadCellContentColumnScope?: string | Array<string>;
    renderHeadCellContent: (props: {headcell: ColumnDef<any>, gridApi: GridApi, caller: string, children?: ReactNode}) => ReactNode;
}

export interface MosaicDataTableBodyCellContentRenderPlugin extends MosaicDataTablePlugin {
    scope: 'body-cell-content-render' | ArrayWithRequired<'body-cell-content-render'>; 
    renderBodyCellContentColumnScope?: string | Array<string>;
    renderBodyCellContent?: (props: {headcell: ColumnDef<any>, row: any, rowId: string, gridApi: GridApi, children?: ReactNode}) => ReactNode;
}

export interface MosaicDataTableHeadRowStylePlugin extends MosaicDataTablePlugin {
    scope: 'head-row-style' | ArrayWithRequired<'head-row-style'>;
    getHeadRowStyle?: (props: {gridApi: GridApi, caller: string}) => SxProps<Theme>;
}

export interface MosaicDataTableBodyRowStylePlugin extends MosaicDataTablePlugin {
    scope: 'body-row-style' | ArrayWithRequired<'body-row-style'>;
    getBodyRowStyle?: (props: {row: any, gridApi: GridApi}) => SxProps<Theme>;
}

export interface MosaicDataTableHeadCellStylePlugin extends MosaicDataTablePlugin {
    scope: 'head-cell-style' | ArrayWithRequired<'head-cell-style'>;
    getHeadCellStyle?: (props: {headcell: ColumnDef<any>, gridApi: GridApi, caller: string}) => SxProps<Theme>;
}

export interface MosaicDataTableBodyCellStylePlugin extends MosaicDataTablePlugin {
    scope: 'body-cell-style' | ArrayWithRequired<'body-cell-style'>;
    getBodyCellStyle?: (props: {headcell: ColumnDef<any>, row: any, gridApi: GridApi}) => SxProps<Theme>;
}

export interface MosaicDataTableHeadExtraRowStartPlugin extends MosaicDataTablePlugin {
    scope: 'head-extra-row-start' | ArrayWithRequired<'head-extra-row-start'>;
    getHeadExtraRowStart?: (props: {columns: Array<ColumnDef<any>>, gridApi: GridApi}) => ReactNode;
}

export interface MosaicDataTableHeadExtraRowEndPlugin extends MosaicDataTablePlugin {
    scope: 'head-extra-row-end' | ArrayWithRequired<'head-extra-row-end'>;
    getHeadExtraRowEnd?: (props: {columns: Array<ColumnDef<any>>, gridApi: GridApi}) => ReactNode;
}

export interface MosaicDataTableBodyExtraRowStartPlugin extends MosaicDataTablePlugin {
    scope: 'body-extra-row-start' | ArrayWithRequired<'body-extra-row-start'>;
    getBodyExtraRowStart?: (props: {columns: Array<ColumnDef<any>>, row: any, gridApi: GridApi}) => ReactNode;
}

export interface MosaicDataTableBodyExtraRowEndPlugin extends MosaicDataTablePlugin {
    scope: 'body-extra-row-end' | ArrayWithRequired<'body-extra-row-end'>;
    getBodyExtraRowEnd?: (props: {columns: Array<ColumnDef<any>>, row: any, gridApi: GridApi}) => ReactNode;
}



export interface MosaicDataTablePropsPlugin extends MosaicDataTablePlugin {
    scope: 'table-props' | ArrayWithRequired<'table-props'>;
    getTableProps: (props: {gridApi: GridApi}) => TableProps | null | void;
}

export interface MosaicDataTableBodyPropsPlugin extends MosaicDataTablePlugin {
    scope: 'body-props' | ArrayWithRequired<'body-props'>;
     getBodyProps: (props: {gridApi: GridApi}) => TableBodyProps | null | void;
}
export interface MosaicDataTableBodyRowPropsPlugin extends MosaicDataTablePlugin {
    scope: 'body-row-props' | ArrayWithRequired<'body-row-props'>;
    getBodyRowProps: (props: {row: any, gridApi: GridApi}) => TableRowProps | null | void;
}
export interface MosaicDataTableBodyRowCellPropsPlugin extends MosaicDataTablePlugin {
    scope: 'body-row-cell-props' | ArrayWithRequired<'body-row-cell-props'>;
    getBodyRowCellProps: (props: {columnDef: ColumnDef<any>, row: any, gridApi: GridApi}) => TableCellProps | null | void;
}

export interface MosaicDataTableHeadPropsPlugin extends MosaicDataTablePlugin {
    scope: 'head-props' | ArrayWithRequired<'head-props'>;
    getHeadProps: (props: {gridApi: GridApi}) => TableHeadProps | null | void;
}
export interface MosaicDataTableHeadRowPropsPlugin extends MosaicDataTablePlugin {
    scope: 'head-row-props' | ArrayWithRequired<'head-row-props'>;
    getHeadRowProps: (props: {gridApi: GridApi}) => TableRowProps | null | void;
}
export interface MosaicDataTableHeadRowCellPropsPlugin extends MosaicDataTablePlugin {
    scope: 'head-row-cell-props' | ArrayWithRequired<'head-row-cell-props'>;
    getHeadRowCellProps: (props: {columnDef: ColumnDef<any>, gridApi: GridApi}) => TableCellProps | null | void;
}

export interface GridApi {
    items: any[] | null;
    columns: ColumnDef<any>[];
    plugins: MosaicDataTablePlugin[]; 
    pluginMap: PluginMap;
    memoStore: MemoStore;
}

export type GetFunctionParams<T> = T extends (...args: [infer P]) => any ? P : never;


export type PluginMap = {
    gridColumns: MosaicDataTableGridColumnsPlugin[];
    bodyRender: MosaicDataTableBodyRenderPlugin[];
    headRowRender: MosaicDataTableHeadRowRenderPlugin[];
    bodyRowRender: MosaicDataTableBodyRowRenderPlugin[];
    headCellRender: MosaicDataTableHeadCellRenderPlugin[];
    bodyCellRender: MosaicDataTableBodyCellRenderPlugin[];
    headCellContentRender: MosaicDataTableHeadCellContentRenderPlugin[];
    bodyCellContentRender: MosaicDataTableBodyCellContentRenderPlugin[];
    headRowStyle: MosaicDataTableHeadRowStylePlugin[];
    bodyRowStyle: MosaicDataTableBodyRowStylePlugin[];
    headCellStyle: MosaicDataTableHeadCellStylePlugin[];
    bodyCellStyle: MosaicDataTableBodyCellStylePlugin[];
    headExtraRowStart: MosaicDataTableHeadExtraRowStartPlugin[];
    headExtraRowEnd: MosaicDataTableHeadExtraRowEndPlugin[];
    bodyExtraRowStart: MosaicDataTableBodyExtraRowStartPlugin[];
    bodyExtraRowEnd: MosaicDataTableBodyExtraRowEndPlugin[];
    tableProps: MosaicDataTablePropsPlugin[];
    bodyProps: MosaicDataTableBodyPropsPlugin[];
    bodyRowProps: MosaicDataTableBodyRowPropsPlugin[];
    bodyRowCellProps: MosaicDataTableBodyRowCellPropsPlugin[];
    headProps: MosaicDataTableHeadPropsPlugin[];
    headRowProps: MosaicDataTableHeadRowPropsPlugin[];
    headRowCellProps: MosaicDataTableHeadRowCellPropsPlugin[];
}