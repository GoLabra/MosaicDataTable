import { TableCell, TableCellProps, TableHead, TableRow, TableRowProps } from '@mui/material'
import { SxProps, Theme } from '@mui/material/styles'
import React, { ReactNode, useCallback, useMemo } from 'react'
import { EnhancedTableProps, ColumnDef, MosaicDataTableHeadCellContentRenderPlugin, MosaicDataTableHeadCellRenderPlugin, MosaicDataTableHeadCellStylePlugin, MosaicDataTableHeadRowRenderPlugin, MosaicDataTableHeadRowStylePlugin, MosaicDataTableHeadExtraRowStartPlugin, MosaicDataTableHeadExtraRowEndPlugin, MosaicDataTableHeadRowCellPropsPlugin, MosaicDataTableHeadRowPropsPlugin, GridApi } from './types/table-types'
import { MosaicDataTableCellRoot } from './style'
import { filterGridPluginsByColumnScope } from './util/filterGridPlugins'

export const MosaicDataTableHeadCell = <T,>(props: {
    headCell: ColumnDef<T>;
    gridApi: React.MutableRefObject<GridApi>
    caller: string;
}) => {

     const sColumn = useMemo(() => {
            return JSON.stringify(props.headCell);
        }, [props.headCell]);


    const cellStyle = useMemo((): SxProps<Theme> => {
        return props.gridApi.current.pluginMap.headCellStyle.reduce((acc: SxProps<Theme>, plugin: MosaicDataTableHeadCellStylePlugin) => {
            const cellStyle = plugin.getHeadCellStyle?.({ headcell: props.headCell, gridApi: props.gridApi.current, caller: props.caller });
            return {
                ...acc,
                ...cellStyle
            }
        }, {});
    }, [...props.gridApi.current.pluginMap.headCellStyle, sColumn, props.caller]);

    const cellProps = useMemo(() => {
        return props.gridApi.current.pluginMap.headRowCellProps.reduce((acc: TableCellProps, plugin: MosaicDataTableHeadRowCellPropsPlugin) => {
            const headRowCellProps = plugin.getHeadRowCellProps({ columnDef: props.headCell, gridApi: props.gridApi.current });
            return {
                ...acc,
                ...headRowCellProps
            }
        }, {});
    }, [...props.gridApi.current.pluginMap.headRowCellProps, sColumn]);

    const contentRenderPlugins = useMemo((): MosaicDataTableHeadCellContentRenderPlugin[] => {
            return filterGridPluginsByColumnScope<MosaicDataTableHeadCellContentRenderPlugin>(props.gridApi.current.pluginMap.headCellContentRender, 'renderHeadCellContentColumnScope', props.headCell.id);
        }, [...props.gridApi.current.pluginMap.headCellContentRender, props.headCell.id]);

    const cellContent = useMemo(() => {
        const initialContent = props.caller == 'mosaic-data-table' ? typeof props.headCell.header === 'function' ? props.headCell.header() : props.headCell.header : '';

        return props.gridApi.current.pluginMap.headCellContentRender.reduce((acc: ReactNode | null, plugin: MosaicDataTableHeadCellContentRenderPlugin) => {
            const cellContent = plugin.renderHeadCellContent?.({ headcell: props.headCell, gridApi: props.gridApi.current, caller: props.caller, children: acc });
            return cellContent;
        }, initialContent);

    }, [...contentRenderPlugins, props.caller]);

    const cell = useMemo(() => {

        for (const plugin of props.gridApi.current.pluginMap.headCellRender) {
            var cell = plugin.renderHeadCell?.({ headcell: props.headCell, gridApi: props.gridApi.current, caller: props.caller, props: cellProps, sx: cellStyle, children: cellContent });
            if (cell) {
                return cell;
            }
        }

        return (<MosaicDataTableCellRoot
            key={props.headCell.id as string}
            align="left"
            padding="normal"
            sx={{
                minWidth: props.headCell.width,
                width: props.headCell.width,
                ...cellStyle
            }}
            {...cellProps}
        >{cellContent}</MosaicDataTableCellRoot>);

    }, [...props.gridApi.current.pluginMap.headCellRender, props.gridApi.current.columnsHash, props.caller, cellContent, cellProps, cellStyle]);

    return (
        <React.Fragment>
            {cell}
        </React.Fragment>
    )
}
