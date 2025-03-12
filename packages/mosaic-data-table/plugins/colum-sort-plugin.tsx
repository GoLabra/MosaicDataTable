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
        scope: 'head-cell-content-render',
        renderHeadCellContent: ({headcell, caller, children}): ReactNode => { 

            if(caller != 'mosaic-data-table'){
                return children;
            }

            if (headcell.hasSort == true) {
                return (<TableSortLabel
                    active={props.orderBy === headcell.id}
                    direction={props.orderBy === headcell.id ? props.order : 'asc'}
                    onClick={() => createSortHandler(headcell.id as string)}
                >
                    {children}

                    {props.orderBy === headcell.id ? (
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
