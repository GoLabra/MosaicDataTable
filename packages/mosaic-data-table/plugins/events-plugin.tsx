import { ColumnDef, GridApi, MosaicDataTableBodyPropsPlugin, MosaicDataTableBodyRowCellPropsPlugin, MosaicDataTableBodyRowPropsPlugin, MosaicDataTableHeadPropsPlugin, MosaicDataTableHeadRowCellPropsPlugin, MosaicDataTableHeadRowPropsPlugin, MosaicDataTablePropsPlugin } from "../types/table-types"

export const EventsPlugin = ({
    tableOnClick,
    bodyOnClick,
    bodyRowOnClick,
    bodyRowCellOnClick,
    headOnClick,
    headRowOnClick,
    headRowCellOnClick
}: {
    tableOnClick?: (event: React.MouseEvent<HTMLTableElement>) => void,
    bodyOnClick?: (event: React.MouseEvent<HTMLTableSectionElement>) => void,
    bodyRowOnClick?: (event: React.MouseEvent<HTMLTableBodyRowElement>) => void,
    bodyRowCellOnClick?: (event: React.MouseEvent<HTMLTableBodyCellElement>) => void,
    headOnClick?: (event: React.MouseEvent<HTMLTableSectionElement>) => void,
    headRowOnClick?: (event: React.MouseEvent<HTMLTableRowElement>) => void,
    headRowCellOnClick?: (event: React.MouseEvent<HTMLTableHeadCellElement>) => void,
}): MosaicDataTablePropsPlugin
    & MosaicDataTableBodyPropsPlugin
    & MosaicDataTableBodyRowPropsPlugin
    & MosaicDataTableBodyRowCellPropsPlugin
    & MosaicDataTableHeadPropsPlugin
    & MosaicDataTableHeadRowPropsPlugin
    & MosaicDataTableHeadRowCellPropsPlugin => {
    return {
        scope: ['table-props', 'body-props', 'body-row-props', 'body-row-cell-props', 'head-props', 'head-row-props', 'head-row-cell-props'] as const,
        getTableProps: (gridApi: GridApi) => {
            return {
                onClick: (event: React.MouseEvent<HTMLTableElement>) => tableOnClick?.(event)
            };
        },
        getBodyProps: (gridApi: GridApi) => {
            return {
                onClick: (event: React.MouseEvent<HTMLTableSectionElement>) => bodyOnClick?.(event)
            }
        },
        getBodyRowProps: (row: any, gridApi: GridApi) => {
            return {
                onClick: (event: React.MouseEvent<HTMLTableRowElement>) => bodyRowOnClick?.({
                    ...event,
                    currentTarget: {
                        ...event.currentTarget,
                        row
                    }
                })
            }
        },
        getBodyRowCellProps: (columnDef: ColumnDef<any>, row: any, gridApi: GridApi) => {
            return {
                onClick: (event: React.MouseEvent<HTMLTableCellElement>) => bodyRowCellOnClick?.({
                    ...event,
                    currentTarget: {
                        ...event.currentTarget,
                        columnDef,
                        row
                    }
                })
            }
        },
        getHeadProps: (gridApi: GridApi) => {
            return {
                onClick: (event: React.MouseEvent<HTMLTableSectionElement>) => headOnClick?.(event)
            }
        },
        getHeadRowProps: (gridApi: GridApi) => {
            return {
                onClick: (event: React.MouseEvent<HTMLTableRowElement>) => headRowOnClick?.(event)
            }
        },
        getHeadRowCellProps: (columnDef: ColumnDef<any>, gridApi: GridApi) => {
            return {
                onClick: (event: React.MouseEvent<HTMLTableCellElement>) => headRowCellOnClick?.({
                    ...event,
                    currentTarget: {
                        ...event.currentTarget,
                        columnDef
                    }
                })
            }
        }
    }
}


export interface HTMLTableHeadCellElement extends HTMLTableCellElement {
    columnDef: ColumnDef<any>;
}

export interface HTMLTableBodyRowElement extends HTMLTableRowElement {
    row: any
}

export interface HTMLTableBodyCellElement extends HTMLTableCellElement {
    columnDef: ColumnDef<any>;
    row: any
}