import { TableCell, TableHead, TableRow } from '@mui/material'
import { SxProps, Theme } from '@mui/material/styles'
import React, { ReactNode, useCallback, useMemo } from 'react'
import { EnhancedTableProps, ColumnDef, MosaicDataTableHeadCellContentRenderPlugin, MosaicDataTableHeadCellRenderPlugin, MosaicDataTableHeadCellStylePlugin, MosaicDataTableHeadRowRenderPlugin, MosaicDataTableHeadRowStylePlugin, MosaicDataTableHeadExtraRowStartPlugin, MosaicDataTableHeadExtraRowEndPlugin, MosaicDataTableHeadRowCellOnClickPlugin, MosaicDataTableHeadRowOnClickPlugin } from './types/table-types'
import { filterGridPlugins } from './util/filterGridPlugins'
import { MosaicDataTableCellRoot } from './style'

export const MosaicDataTableHeadRow = <T,>(props: EnhancedTableProps<T>) => {
    const { headCells } = props

    // head-row-render
    const rowRenderPlugins = useMemo((): MosaicDataTableHeadRowRenderPlugin[] => {
        return filterGridPlugins<MosaicDataTableHeadRowRenderPlugin>(props.plugins, 'head-cell-render');
    }, [props.plugins]);

    const getRow = useCallback((params: { children?: ReactNode }) => {

        const cellStyle = getRowStyle();

        for (const plugin of rowRenderPlugins) {
            var row = plugin.renderHeadRow?.(props.gridApi, props.caller, cellStyle, params.children, { onClick: headRowOnClickPlugin });
            if (row) {
                return row;
            }
        }

        const rowSx = {
            ...(props.sx ?? {}),
            ...cellStyle
        } as SxProps<Theme>

        return (<TableRow key="head-row" sx={rowSx} onClick={headRowOnClickPlugin} >{params.children}</TableRow>);
    }, [...rowRenderPlugins, props.headCells, props.gridApi]);


    // head-row-style
    const rowStylePlugins = useMemo((): MosaicDataTableHeadRowStylePlugin[] => {
        return filterGridPlugins<MosaicDataTableHeadRowStylePlugin>(props.plugins, 'head-row-style');
    }, [props.plugins]);


    const getRowStyle = useCallback((): SxProps<Theme> => {
        return rowStylePlugins.reduce((acc: SxProps<Theme>, plugin: MosaicDataTableHeadRowStylePlugin) => {
            const rowStyle = plugin.getHeadRowStyle?.(props.gridApi, props.caller);
            return {
                ...acc,
                ...rowStyle
            }
        }, {});
    }, [...rowStylePlugins, props.caller]);


    // head-cell-render
    const cellRenderPlugins = useMemo((): MosaicDataTableHeadCellRenderPlugin[] => {
        return filterGridPlugins<MosaicDataTableHeadCellRenderPlugin>(props.plugins, 'head-cell-render');
    }, [props.plugins]);

    const getCell = useCallback((params: { columnDef: ColumnDef<T>, children?: ReactNode }) => {

        const cellStyle = getCellStyle({ columnDef: params.columnDef });

        for (const plugin of cellRenderPlugins) {
            var cell = plugin.renderHeadCell?.(params.columnDef, props.gridApi, props.caller, cellStyle, params.children, { onClick: headRowCellOnClickPlugin });
            if (cell) {
                return cell;
            }
        }

        return (<MosaicDataTableCellRoot
            key={params.columnDef.id as string}
            align="left"
            padding="normal"
            onClick={(event) => headRowCellOnClickPlugin(event, params.columnDef)}
            sx={{
                minWidth: params.columnDef.width,
                width: params.columnDef.width,
                ...cellStyle
            }} >{params.children}</MosaicDataTableCellRoot>);

    }, [...cellRenderPlugins, props.caller, props.headCells, props.gridApi]);

    // head-cell-style
    const cellStylePlugins = useMemo((): MosaicDataTableHeadCellStylePlugin[] => {
        return filterGridPlugins<MosaicDataTableHeadCellStylePlugin>(props.plugins, 'head-cell-render');
    }, [props.plugins]);

    const getCellStyle = useCallback((params: { columnDef: ColumnDef<T> }): SxProps<Theme> => {
        return cellStylePlugins.reduce((acc: SxProps<Theme>, plugin: MosaicDataTableHeadCellStylePlugin) => {
            const cellStyle = plugin.getHeadCellStyle?.(params.columnDef, props.gridApi, props.caller);
            return {
                ...acc,
                ...cellStyle
            }
        }, {});
    }, [...cellStylePlugins, props.caller]);

    // head-cell-content-render
    const cellContentRenderPlugins = useMemo((): MosaicDataTableHeadCellContentRenderPlugin[] => {
        return filterGridPlugins<MosaicDataTableHeadCellContentRenderPlugin>(props.plugins, 'head-cell-content-render');
    }, [props.plugins]);

    const getCellContent = useCallback((columnDef: ColumnDef<T>) => {

        const initialContent = props.caller == 'mosaic-data-table' ? typeof columnDef.header === 'function' ? columnDef.header() : columnDef.header : '';

        return cellContentRenderPlugins.reduce((acc: ReactNode | null, plugin: MosaicDataTableHeadCellContentRenderPlugin) => {
            const cellContent = plugin.renderHeadCellContent?.(columnDef, props.gridApi, props.caller, acc);
            return cellContent;
        }, initialContent);

    }, [...cellContentRenderPlugins, props.caller]);

    const bodyRowOnClickPlugins = useMemo((): MosaicDataTableHeadRowOnClickPlugin[] => {
        return filterGridPlugins<MosaicDataTableHeadRowOnClickPlugin>(props.plugins, 'head-row-on-click');
    }, [props.plugins]);

    const headRowOnClickPlugin = useCallback((event: React.MouseEvent<HTMLTableRowElement>) => {
        for (const plugin of bodyRowOnClickPlugins) {
            plugin.headRowOnClick(event, props.gridApi);
        }
    }, [...bodyRowOnClickPlugins]);

    const headRowCellOnClickPlugins = useMemo((): MosaicDataTableHeadRowCellOnClickPlugin[] => {
        return filterGridPlugins<MosaicDataTableHeadRowCellOnClickPlugin>(props.plugins, 'head-row-cell-on-click');
    }, [props.plugins]);

    const headRowCellOnClickPlugin = useCallback((event: React.MouseEvent<HTMLTableCellElement>, columnDef: ColumnDef<any>) => {
        for (const plugin of headRowCellOnClickPlugins) {
            plugin.headRowCellOnClick(event, columnDef, props.gridApi);
        }
    }, [...headRowCellOnClickPlugins]);

    return (
        getRow({
            children: (
                <>
                    {headCells
                        .map((headCell: ColumnDef<any>) => {
                            return (
                                getCell({
                                    columnDef: headCell,
                                    children: (<>{getCellContent(headCell)}</>)
                                })
                            )
                        })
                    }
                </>
            )
        })
    )
}
