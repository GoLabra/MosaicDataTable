import { ComponentsOverrides, ComponentsProps, ComponentsVariants, SxProps, TableBodyProps, Theme } from '@mui/material'
import { ReactNode } from 'react'

export interface Pagination {
    page: number
    rowsPerPage: number
    count: number
}

export interface MosaicDataTableProps<T = any> {
    caption?: string;
    items: T[];
    headCells: ColumnDef<T>[];
    root?: any
    plugins?: MosaicDataTablePlugin[];
}

export interface EnhancedTableProps<T = any> {
    headCells: ColumnDef<T>[]
    plugins?: MosaicDataTablePlugin[];
    gridApi: GridApi;
    caller: string;
    sx?: SxProps<Theme>
}

export interface ColumnDef<T = any> {
    id: string,
    header: string | (() => string | ReactNode), 
    width?: number
    visible?: boolean = true;

    //plugin needed
    highlight?: boolean;
    cell?: (row: T) => ReactNode;
    pin?: 'left' | 'right' | boolean;
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
}

type ArrayWithRequired<T extends string> = [T, ...string[]] | [...string[], T] | [...string[], T, ...string[]];

export interface MosaicDataTableGridColumnsPlugin extends MosaicDataTablePlugin {
    scope: 'grid-columns' | ArrayWithRequired<'grid-columns'>;
    getColumns?: (headCells: Array<HeadCell<any>>) => Array<HeadCell<any>>;
}

export interface MosaicDataTableBodyRenderPlugin extends MosaicDataTablePlugin {
    scope: 'body-render' | ArrayWithRequired<'body-render'>;
    renderBody: (headCells: Array<HeadCell<any>>, rows: any[], gridApi: GridApi, children?: ReactNode, bodyProps?: TableBodyProps) => ReactElement;
}

export interface MosaicDataTableHeadRowRenderPlugin extends MosaicDataTablePlugin {
    scope: 'head-row-render' | ArrayWithRequired<'head-row-render'>;
    renderHeadRow?: (gridApi: GridApi, caller: string, sx: SxProps<Theme>, children?: ReactNode, rowProps?: TableRowProps) => ReactElement;
}

export interface MosaicDataTableBodyRowRenderPlugin extends MosaicDataTablePlugin {
    scope: 'body-row-render' | ArrayWithRequired<'body-row-render'>;
    renderBodyRow?: (row: any, gridApi: GridApi, sx: SxProps<Theme>, children?: ReactNode, rowProps?: TableRowProps) => ReactElement;
}

export interface MosaicDataTableHeadCellRenderPlugin extends MosaicDataTablePlugin {
    scope: 'head-cell-render' | ArrayWithRequired<'head-cell-render'>;
    renderHeadCell?: (headcell: ColumnDef<any>, gridApi: GridApi, caller: string, sx: SxProps<Theme>, children?: ReactNode, cellProps?: TableCellProps) => ReactElement;
}

export interface MosaicDataTableBodyCellRenderPlugin extends MosaicDataTablePlugin {
    scope: 'body-cell-render' | ArrayWithRequired<'body-cell-render'>;
    renderBodyCell?: (headcell: ColumnDef<any>, row: any, gridApi: GridApi, sx: SxProps<Theme>, children?: ReactNode, cellProps?: TableCellProps) => ReactElement;
}

export interface MosaicDataTableHeadCellContentRenderPlugin extends MosaicDataTablePlugin {
    scope: 'head-cell-content-render' | ArrayWithRequired<'head-cell-content-render'>;
    renderHeadCellContent: (headcell: ColumnDef<any>, gridApi: GridApi, caller: string, children?: ReactNode) => ReactNode;
}

export interface MosaicDataTableBodyCellContentRenderPlugin extends MosaicDataTablePlugin {
    scope: 'body-cell-content-render' | ArrayWithRequired<'body-cell-content-render'>;
    renderBodyCellContent?: (headcell: ColumnDef<any>, row: any, gridApi: GridApi, children?: ReactNode) => ReactNode;
}

export interface MosaicDataTableHeadRowStylePlugin extends MosaicDataTablePlugin {
    scope: 'head-row-style' | ArrayWithRequired<'head-row-style'>;
    getHeadRowStyle?: (gridApi: GridApi, caller: string) => SxProps<Theme>;
}

export interface MosaicDataTableBodyRowStylePlugin extends MosaicDataTablePlugin {
    scope: 'body-row-style' | ArrayWithRequired<'body-row-style'>;
    getBodyRowStyle?: (row: any, gridApi: GridApi) => SxProps<Theme>;
}

export interface MosaicDataTableHeadCellStylePlugin extends MosaicDataTablePlugin {
    scope: 'head-cell-style' | ArrayWithRequired<'head-cell-style'>;
    getHeadCellStyle?: (headcell: ColumnDef<any>, gridApi: GridApi, caller: string) => SxProps<Theme>;
}

export interface MosaicDataTableBodyCellStylePlugin extends MosaicDataTablePlugin {
    scope: 'body-cell-style' | ArrayWithRequired<'body-cell-style'>;
    getBodyCellStyle?: (headcell: ColumnDef<any>, row: any, gridApi: GridApi) => SxProps<Theme>;
}

export interface MosaicDataTableHeadExtraRowStartPlugin extends MosaicDataTablePlugin {
    scope: 'head-extra-row-start' | ArrayWithRequired<'head-extra-row-start'>;
    getHeadExtraRowStart?: (columns: Array<ColumnDef<any>>, gridApi: GridApi) => ReactNode;
}

export interface MosaicDataTableHeadExtraRowEndPlugin extends MosaicDataTablePlugin {
    scope: 'head-extra-row-end' | ArrayWithRequired<'head-extra-row-end'>;
    getHeadExtraRowEnd?: (columns: Array<ColumnDef<any>>, gridApi: GridApi) => ReactNode;
}

export interface MosaicDataTableBodyExtraRowStartPlugin extends MosaicDataTablePlugin {
    scope: 'body-extra-row-start' | ArrayWithRequired<'body-extra-row-start'>;
    getBodyExtraRowStart?: (columns: Array<ColumnDef<any>>, row: any, gridApi: GridApi) => ReactNode;
}

export interface MosaicDataTableBodyExtraRowEndPlugin extends MosaicDataTablePlugin {
    scope: 'body-extra-row-end' | ArrayWithRequired<'body-extra-row-end'>;
    getBodyExtraRowEnd?: (columns: Array<ColumnDef<any>>, row: any, gridApi: GridApi) => ReactNode;
}

export interface MosaicDataTableOnClickPlugin extends MosaicDataTablePlugin {
    scope: 'on-click' | ArrayWithRequired<'on-click'>;
    onClick: (event: React.MouseEvent<HTMLTableElement>, gridApi: GridApi) => void;
}

export interface MosaicDataTableBodyOnClickPlugin extends MosaicDataTablePlugin {
    scope: 'body-on-click' | ArrayWithRequired<'body-on-click'>;
    bodyOnClick: (event: React.MouseEvent<HTMLTableSectionElement>, gridApi: GridApi) => void;
}
export interface MosaicDataTableBodyRowOnClickPlugin extends MosaicDataTablePlugin {
    scope: 'body-row-on-click' | ArrayWithRequired<'body-row-on-click'>;
    bodyRowOnClick: (event: React.MouseEvent<HTMLTableRowElement>, row: any, gridApi: GridApi) => void;
}
export interface MosaicDataTableBodyRowCellOnClickPlugin extends MosaicDataTablePlugin {
    scope: 'body-row-cell-on-click' | ArrayWithRequired<'body-row-cell-on-click'>;
    bodyRowCellOnClick: (event: React.MouseEvent<HTMLTableCellElement>, columnDef: ColumnDef<any>, row: any, gridApi: GridApi) => void;
}

export interface MosaicDataTableHeadOnClickPlugin extends MosaicDataTablePlugin {
    scope: 'head-on-click' | ArrayWithRequired<'head-on-click'>;
    headOnClick: (event: React.MouseEvent<HTMLTableSectionElement>, gridApi: GridApi) => void;
}
export interface MosaicDataTableHeadRowOnClickPlugin extends MosaicDataTablePlugin {
    scope: 'head-row-on-click' | ArrayWithRequired<'head-row-on-click'>;
    headRowOnClick: (event: React.MouseEvent<HTMLTableRowElement>, gridApi: GridApi) => void;
}
export interface MosaicDataTableHeadRowCellOnClickPlugin extends MosaicDataTablePlugin {
    scope: 'head-row-cell-on-click' | ArrayWithRequired<'head-row-cell-on-click'>;
    headRowCellOnClick: (event: React.MouseEvent<HTMLTableCellElement>, columnDef: ColumnDef<any>, gridApi: GridApi) => void;
}


export interface GridApi {
    getData: () => any[];
    getColumns: () => ColumnDef<any>[];
    getPlugins: () => MosaicDataTablePlugin[]; 
}

export type GetFunctionParams<T> = T extends (...args: [infer P]) => any ? P : never;
