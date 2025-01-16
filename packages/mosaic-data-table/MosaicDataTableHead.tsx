import { TableCell, TableHead, TableRow } from '@mui/material'
import { SxProps, Theme } from '@mui/material/styles'
import { ReactNode, useCallback, useMemo } from 'react'
import { EnhancedTableProps, ColumnDef, MosaicDataTableHeadCellContentRenderPlugin, MosaicDataTableHeadCellRenderPlugin, MosaicDataTableHeadCellStylePlugin, MosaicDataTableHeadRowRenderPlugin, MosaicDataTableHeadRowStylePlugin, MosaicDataTableHeadExtraRowStartPlugin, MosaicDataTableHeadExtraRowEndPlugin, MosaicDataTablePlugin, GridApi } from './types/table-types'
import { filterGridPlugins } from './util/filterGridPlugins'
import { MosaicDataTableCellRoot } from './style'
import { MosaicDataTableHeadRow } from './MosaicDataTableHeadRow'

interface MosaicDataTableHeadProps<T> {
    headCells: ColumnDef<T>[];
    plugins?: MosaicDataTablePlugin[];
    gridApi: GridApi;
}
export const MosaicDataTableHead = <T,>(props: MosaicDataTableHeadProps<T>) => {
    const { headCells } = props

    // extra-row-start
    const extraRowStartPlugins = useMemo((): MosaicDataTableHeadExtraRowStartPlugin[] => {
        return filterGridPlugins<MosaicDataTableHeadExtraRowStartPlugin>(props.plugins, 'head-extra-row-start');
    }, [props.plugins]);

    const getExtraRowsStart = useMemo(() => {

        return extraRowStartPlugins.map((plugin) => {
            var row = plugin.getHeadExtraRowStart?.(props.headCells, props.gridApi);
            return row;
        });

    }, [...extraRowStartPlugins, props.headCells, props.gridApi]);


    // extra-row-end
    const extraRowEndPlugins = useMemo((): MosaicDataTableHeadExtraRowEndPlugin[] => {
        return filterGridPlugins<MosaicDataTableHeadExtraRowEndPlugin>(props.plugins, 'head-extra-row-end');
    }, [props.plugins]);

    const getExtraRowsEnd = useMemo(() => {

        return extraRowEndPlugins.map((plugin) => {
            var row = plugin.getHeadExtraRowEnd?.(props.headCells, props.gridApi);
            return row;
        });

    }, [...extraRowEndPlugins, props.headCells, props.gridApi]);

    return (
        <TableHead >

            {getExtraRowsStart}

            <MosaicDataTableHeadRow 
                headCells={props.headCells}
                plugins={props.plugins}
                gridApi={props.gridApi}
                caller="mosaic-data-table"
            />

            {getExtraRowsEnd}

        </TableHead >
    )
}
