import { TableCell, TableHead, TableHeadProps, TableRow } from '@mui/material'
import { SxProps, Theme } from '@mui/material/styles'
import { ReactNode, useCallback, useMemo } from 'react'
import { EnhancedTableProps, ColumnDef, MosaicDataTableHeadCellContentRenderPlugin, MosaicDataTableHeadCellRenderPlugin, MosaicDataTableHeadCellStylePlugin, MosaicDataTableHeadRowRenderPlugin, MosaicDataTableHeadRowStylePlugin, MosaicDataTableHeadExtraRowStartPlugin, MosaicDataTableHeadExtraRowEndPlugin, MosaicDataTablePlugin, GridApi, MosaicDataTableHeadPropsPlugin } from './types/table-types'
import { MosaicDataTableHeadRow } from './MosaicDataTableHeadRow'

interface MosaicDataTableHeadProps<T> {
    headCells: ColumnDef<T>[];
    gridApi: React.MutableRefObject<GridApi>
}
export const MosaicDataTableHead = <T,>(props: MosaicDataTableHeadProps<T>) => {
    const { headCells } = props

    const getExtraRowsStart = useMemo(() => {

        return props.gridApi.current.pluginMap.headExtraRowStart.map((plugin) => {
            var row = plugin.getHeadExtraRowStart?.({ columns: props.headCells, gridApi: props.gridApi.current });
            return row;
        });

    }, [...props.gridApi.current.pluginMap.headExtraRowStart, props.headCells]);

    const getExtraRowsEnd = useMemo(() => {

        return props.gridApi.current.pluginMap.headExtraRowEnd.map((plugin) => {
            var row = plugin.getHeadExtraRowEnd?.({ columns: props.headCells, gridApi: props.gridApi.current });
            return row;
        });

    }, [...props.gridApi.current.pluginMap.headExtraRowEnd, props.headCells]);


    const headProps = useMemo(() => {
        return props.gridApi.current.pluginMap.headProps.reduce((acc: TableHeadProps, plugin: MosaicDataTableHeadPropsPlugin) => {
            const headProps = plugin.getHeadProps({ gridApi: props.gridApi.current });
            return {
                ...acc,
                ...headProps
            }
        }, {})
    }, [...props.gridApi.current.pluginMap.headProps]);
    
    return (
        <TableHead {...headProps}>

            {getExtraRowsStart}

            <MosaicDataTableHeadRow 
                headCells={props.headCells}
                gridApi={props.gridApi}
                caller="mosaic-data-table"
            />

            {getExtraRowsEnd}

        </TableHead >
    )
}
