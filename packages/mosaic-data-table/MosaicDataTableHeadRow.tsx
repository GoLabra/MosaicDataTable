import { TableCell, TableHead, TableRow } from '@mui/material'
import { SxProps, Theme } from '@mui/material/styles'
import { ReactNode, useCallback, useMemo } from 'react'
import { EnhancedTableProps, ColumnDef, MosaicDataTableHeadCellContentRenderPlugin, MosaicDataTableHeadCellRenderPlugin, MosaicDataTableHeadCellStylePlugin, MosaicDataTableHeadRowRenderPlugin, MosaicDataTableHeadRowStylePlugin, MosaicDataTableHeadExtraRowStartPlugin, MosaicDataTableHeadExtraRowEndPlugin } from './types/table-types'
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
            var row = plugin.renderHeadRow?.(props.gridApi, props.caller, cellStyle, params.children);
            if (row) {
                return row;
            }
        }

        const rowSx = {
            ...(props.sx ?? {} ),
            ...cellStyle
        } as SxProps<Theme>

        return (<TableRow key="head-row" sx={ rowSx } >{params.children}</TableRow>);
    }, [rowRenderPlugins]);


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
    }, [rowStylePlugins, props.caller]);


    // head-cell-render
    const cellRenderPlugins = useMemo((): MosaicDataTableHeadCellRenderPlugin[] => {
        return filterGridPlugins<MosaicDataTableHeadCellRenderPlugin>(props.plugins, 'head-cell-render');
    }, [props.plugins]);

    const getCell = useCallback((params: { headCell: ColumnDef<T>, children?: ReactNode }) => {

        const cellStyle = getCellStyle({ cell: params.headCell });

        for (const plugin of cellRenderPlugins) {
            var cell = plugin.renderHeadCell?.(params.headCell, props.gridApi, props.caller, cellStyle, params.children);
            if (cell) {
                return cell;
            }
        }

        return (<MosaicDataTableCellRoot
            key={params.headCell.id as string}
            align="left"
            padding="normal"
            sx={{
                minWidth: params.headCell.width,
                width: params.headCell.width,
                ...cellStyle
            }} >{params.children}</MosaicDataTableCellRoot>);

    }, [cellRenderPlugins, props.caller]);

    // head-cell-style
    const cellStylePlugins = useMemo((): MosaicDataTableHeadCellStylePlugin[] => {
        return filterGridPlugins<MosaicDataTableHeadCellStylePlugin>(props.plugins, 'head-cell-render');
    }, [props.plugins]);

    const getCellStyle = useCallback((params: { cell: ColumnDef<T> }): SxProps<Theme> => {
        return cellStylePlugins.reduce((acc: SxProps<Theme>, plugin: MosaicDataTableHeadCellStylePlugin) => {
            const cellStyle = plugin.getHeadCellStyle?.(params.cell, props.gridApi, props.caller);
            return {
                ...acc,
                ...cellStyle
            }
        }, {});
    }, [cellStylePlugins, props.caller]);

    // head-cell-content-render
    const cellContentRenderPlugins = useMemo((): MosaicDataTableHeadCellContentRenderPlugin[] => {
        return filterGridPlugins<MosaicDataTableHeadCellContentRenderPlugin>(props.plugins, 'head-cell-content-render');
    }, [props.plugins]);

    const getCellContent = useCallback((cell: ColumnDef<T>) => {

        const initialContent = props.caller == 'mosaic-data-table' ? typeof cell.header === 'function' ? cell.header() : cell.header : '';

        return cellContentRenderPlugins.reduce((acc: ReactNode | null, plugin: MosaicDataTableHeadCellContentRenderPlugin) => {
            const cellContent = plugin.renderHeadCellContent?.(cell, props.gridApi, props.caller, acc);
            return cellContent;
        }, initialContent);

    }, [cellContentRenderPlugins, props.caller]);


    return (
        getRow({
            children: (
                <>
                    {headCells
                        .map((headCell: ColumnDef<any>) => {
                            return (
                                getCell({
                                    headCell: headCell,
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
