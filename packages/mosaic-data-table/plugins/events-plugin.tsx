import { ColumnDef, MosaicDataTableBodyOnClickPlugin, MosaicDataTableBodyRowCellOnClickPlugin, MosaicDataTableBodyRowOnClickPlugin, MosaicDataTableHeadOnClickPlugin, MosaicDataTableHeadRowCellOnClickPlugin, MosaicDataTableHeadRowOnClickPlugin, MosaicDataTableOnClickPlugin } from "../types/table-types"

export const EventsPlugin = ({
   tableOnClick,
   bodyOnClick,
   bodyRowOnClick,
   bodyRowCellOnClick,
   headOnClick,
   headRowOnClick,
   headRowCellOnClick
}:{
    tableOnClick?: (event: React.MouseEvent<HTMLTableElement>) => void,
    bodyOnClick?: (event: React.MouseEvent<HTMLTableSectionElement>) => void,
    bodyRowOnClick?: (event: React.MouseEvent<HTMLTableBodyRowElement>) => void,
    bodyRowCellOnClick?: (event: React.MouseEvent<HTMLTableBodyCellElement>) => void,
    headOnClick?: (event: React.MouseEvent<HTMLTableSectionElement>) => void,
    headRowOnClick?: (event: React.MouseEvent<HTMLTableRowElement>) => void,
    headRowCellOnClick?: (event: React.MouseEvent<HTMLTableHeadCellElement>) => void,
}): MosaicDataTableOnClickPlugin
                                & MosaicDataTableBodyOnClickPlugin
                                & MosaicDataTableBodyRowOnClickPlugin
                                & MosaicDataTableBodyRowCellOnClickPlugin
                                & MosaicDataTableHeadOnClickPlugin
                                & MosaicDataTableHeadRowOnClickPlugin
                                & MosaicDataTableHeadRowCellOnClickPlugin => {
    return {
        scope: ['on-click', 'body-on-click', 'body-row-on-click', 'body-row-cell-on-click', 'head-on-click', 'head-row-on-click', 'head-row-cell-on-click'] as const,
        onClick: (event: React.MouseEvent<HTMLTableElement>, gridApi: any) => {
            tableOnClick?.(event);
        },
        bodyOnClick: (event: React.MouseEvent<HTMLTableSectionElement>, gridApi: any) => {
            bodyOnClick?.(event);
        },
        bodyRowOnClick: (event: React.MouseEvent<HTMLTableRowElement>, row: any, gridApi: any) => {
            bodyRowOnClick?.({
                ...event,
                currentTarget: {
                    ...event.currentTarget,
                    row
                }
            });
        },
        bodyRowCellOnClick: (event: React.MouseEvent<HTMLTableCellElement>, columnDef: ColumnDef<any>, row: any, gridApi: any) => {
            bodyRowCellOnClick?.({
                ...event,
                currentTarget: {
                    ...event.currentTarget,
                    columnDef, 
                    row
                }
            });
        },
        headOnClick: (event: React.MouseEvent<HTMLTableSectionElement>, gridApi: any) => {
            headOnClick?.(event);
        },
        headRowOnClick: (event: React.MouseEvent<HTMLTableRowElement>, gridApi: any) => {
            headRowOnClick?.(event);
        },
        headRowCellOnClick: (event: React.MouseEvent<HTMLTableCellElement>, columnDef: ColumnDef<any>, gridApi: any) => {
            headRowCellOnClick?.({
                ...event,
                currentTarget: {
                    ...event.currentTarget,
                    columnDef
                }
        });
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