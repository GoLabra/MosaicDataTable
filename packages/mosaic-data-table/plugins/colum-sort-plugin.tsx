import { ReactNode } from "react";
import { GridApi, ColumnDef, MosaicDataTableHeadCellContentRenderPlugin } from "../types/table-types";
import { Box, TableSortLabel } from "@mui/material";
import { visuallyHidden } from '@mui/utils'

export type Order = 'asc' | 'desc'

export const ColumnSortPlugin = (props: {
    order: Order,
    orderBy: string|null,
    onSort: (sortBy: string, sortOrder: Order) => void}): MosaicDataTableHeadCellContentRenderPlugin => {

    const createSortHandler = (property: string) => {
        const isAsc = props.orderBy === property && props.order === 'asc'
        props.onSort?.(property, isAsc ? 'desc' : 'asc')
    }

    return {
        type: 'head-cell-content-render',
        renderHeadCellContent: (headCell: ColumnDef<any>, gridApi: GridApi, caller: string,children?: ReactNode): ReactNode => {

            if(caller != 'mosaic-data-table'){
                return children;
            }

            if (headCell.hasSort == true) {
                return (<TableSortLabel
                    active={props.orderBy === headCell.id}
                    direction={props.orderBy === headCell.id ? props.order : 'asc'}
                    onClick={() => createSortHandler(headCell.id as string)}
                >
                    {children}

                    {props.orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                            {props.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                    ) : null}
                </TableSortLabel>)
            }
            return children;
        }
    }
}
