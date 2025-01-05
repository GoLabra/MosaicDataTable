import { ComponentsOverrides, ComponentsProps, ComponentsVariants, SxProps, Theme } from '@mui/material'
import { ReactNode } from 'react'

export interface Pagination {
    page: number
    rowsPerPage: number
    count: number
}

export interface MosaicDataTableProps<T = any> {
    caption?: string;
    items: T[];
    headCells: HeadCell<T>[];
    root?: any
    plugins?: MosaicDataTablePlugin[];
}

export interface EnhancedTableProps<T = any> {
    headCells: HeadCell<T>[]
    plugins?: MosaicDataTablePlugin[];
    gridApi: GridApi;
}

export interface HeadCell<T = any> {
    id: string,
    label: string
    width?: number

    //plugin needed
    highlight?: boolean;
    render?: (row: T) => ReactNode;
    pin?: 'left' | 'right';
    hasSort?: boolean;
}

export interface Action<T = any> {
    id: string
    render: (item: T) => ReactNode,
    isVisible?: (item: T) => boolean,
}

export interface MosaicDataTablePlugin {
    type: string | Array<string>;
    onInit?: (gridApi: GridApi) => void;
}

type ArrayWithRequired<T extends string> = [T, ...string[]] | [...string[], T] | [string, T, ...string[]];

export interface MosaicDataTableGridColumnsPlugin extends MosaicDataTablePlugin {
    type: 'grid-columns' | ArrayWithRequired<'grid-columns'>;
    getColumns?: (headCells: Array<HeadCell<any>>) => Array<HeadCell<any>>;
}

export interface MosaicDataTableBodyRenderPlugin extends MosaicDataTablePlugin {
    type: 'body-render' | ArrayWithRequired<'body-render'>;
    renderBody: (headCells: Array<HeadCell<any>>, rows: any[], gridApi: GridApi, children?: ReactNode) => ReactNode;
}

export interface MosaicDataTableHeadRowRenderPlugin extends MosaicDataTablePlugin {
    type: 'head-row-render' | ArrayWithRequired<'head-row-render'>;
    renderHeadRow?: (gridApi: GridApi, sx: SxProps<Theme>, children?: ReactNode) => ReactNode;
}

export interface MosaicDataTableBodyRowRenderPlugin extends MosaicDataTablePlugin {
    type: 'body-row-render' | ArrayWithRequired<'body-row-render'>;
    renderBodyRow?: (row: any, gridApi: GridApi, sx: SxProps<Theme>, children?: ReactNode) => ReactNode;
}

export interface MosaicDataTableHeadCellRenderPlugin extends MosaicDataTablePlugin {
    type: 'head-cell-render' | ArrayWithRequired<'head-cell-render'>;
    renderHeadCell?: (headcell: HeadCell<any>, gridApi: GridApi, sx: SxProps<Theme>, children?: ReactNode) => ReactNode;
}

export interface MosaicDataTableBodyCellRenderPlugin extends MosaicDataTablePlugin {
    type: 'body-cell-render' | ArrayWithRequired<'body-cell-render'>;
    renderBodyCell?: (headcell: HeadCell<any>, row: any, gridApi: GridApi, sx: SxProps<Theme>, children?: ReactNode) => ReactNode;
}

export interface MosaicDataTableHeadCellContentRenderPlugin extends MosaicDataTablePlugin {
    type: 'head-cell-content-render' | ArrayWithRequired<'head-cell-content-render'>;
    renderHeadCellContent: (headcell: HeadCell<any>, gridApi: GridApi, children?: ReactNode) => ReactNode;
}

export interface MosaicDataTableBodyCellContentRenderPlugin extends MosaicDataTablePlugin {
    type: 'body-cell-content-render' | ArrayWithRequired<'body-cell-content-render'>;
    renderBodyCellContent?: (headcell: HeadCell<any>, row: any, gridApi: GridApi, children?: ReactNode) => ReactNode;
}

export interface MosaicDataTableHeadRowStylePlugin extends MosaicDataTablePlugin {
    type: 'head-row-style' | ArrayWithRequired<'head-row-style'>;
    getHeadRowStyle?: (gridApi: GridApi) => SxProps<Theme>;
}

export interface MosaicDataTableBodyRowStylePlugin extends MosaicDataTablePlugin {
    type: 'body-row-style' | ArrayWithRequired<'body-row-style'>;
    getBodyRowStyle?: (row: any, gridApi: GridApi) => SxProps<Theme>;
}

export interface MosaicDataTableHeadCellStylePlugin extends MosaicDataTablePlugin {
    type: 'head-cell-style' | ArrayWithRequired<'head-cell-style'>;
    getHeadCellStyle?: (headcell: HeadCell<any>, gridApi: GridApi) => SxProps<Theme>;
}

export interface MosaicDataTableBodyCellStylePlugin extends MosaicDataTablePlugin {
    type: 'body-cell-style' | ArrayWithRequired<'body-cell-style'>;
    getBodyCellStyle?: (headcell: HeadCell<any>, row: any, gridApi: GridApi) => SxProps<Theme>;
}



export interface GridApi {
    getData: () => any[];
    getColumns: () => HeadCell<any>[];
}

export type GetFunctionParams<T> = T extends (...args: [infer P]) => any ? P : never;
