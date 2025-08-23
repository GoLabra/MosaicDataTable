import { TableHead, TableHeadProps } from '@mui/material';
import { useMemo } from 'react';
import { MosaicDataTableHeadRow } from './MosaicDataTableHeadRow';
import { ColumnDef, GridApi, MosaicDataTableHeadPropsPlugin } from './types/table-types';

interface MosaicDataTableHeadProps<T> {
    headCells: ColumnDef<T>[];
    gridApi: React.MutableRefObject<GridApi>
}

export const MosaicDataTableHead = <T,>(props: MosaicDataTableHeadProps<T>) => {

    const pluginMap = props.gridApi.current.pluginMap

    const headProps = useMemo(() => {
        return pluginMap.headProps.reduce((acc: TableHeadProps, plugin: MosaicDataTableHeadPropsPlugin) => {
            const headProps = plugin.getHeadProps({ gridApi: props.gridApi.current });
            return {
                ...acc,
                ...headProps
            }
        }, {})
    }, [pluginMap.headProps]);

    const getExtraRowsStart = useMemo(() => {
        return pluginMap.headExtraRowStart.map((plugin) => {
            const row = plugin.getHeadExtraRowStart?.({ columns: props.headCells, gridApi: props.gridApi.current });
            return row;
        });
    }, [pluginMap.headExtraRowStart, props.headCells]);

    const getExtraRowsEnd = useMemo(() => {
        return pluginMap.headExtraRowEnd.map((plugin) => {
            const row = plugin.getHeadExtraRowEnd?.({ columns: props.headCells, gridApi: props.gridApi.current });
            return row;
        });
    }, [pluginMap.headExtraRowEnd, props.headCells]);

    // Memoize the children to prevent unnecessary re-creation
    const headRowsChildren = useMemo(() => (
        <>
            {getExtraRowsStart}
            <MosaicDataTableHeadRow 
                headCells={props.headCells}
                gridApi={props.gridApi}
                caller="mosaic-data-table"
            />
            {getExtraRowsEnd}
        </>
    ), [getExtraRowsStart, props.headCells, props.gridApi, getExtraRowsEnd]);

    // Memoize the final result to prevent unnecessary re-renders
    const tableHeadElement = useMemo(() => (
        <TableHead {...headProps}>
            {headRowsChildren}
        </TableHead>
    ), [headProps, headRowsChildren]);

    return tableHeadElement;
}
