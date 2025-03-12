import { TableCell, TableCellProps, TableHead, TableRow, TableRowProps } from '@mui/material'
import { SxProps, Theme } from '@mui/material/styles'
import React, { ReactNode, useCallback, useMemo } from 'react'
import { EnhancedTableProps, ColumnDef, MosaicDataTableHeadCellContentRenderPlugin, MosaicDataTableHeadCellRenderPlugin, MosaicDataTableHeadCellStylePlugin, MosaicDataTableHeadRowRenderPlugin, MosaicDataTableHeadRowStylePlugin, MosaicDataTableHeadExtraRowStartPlugin, MosaicDataTableHeadExtraRowEndPlugin, MosaicDataTableHeadRowCellPropsPlugin, MosaicDataTableHeadRowPropsPlugin } from './types/table-types'
import { MosaicDataTableCellRoot } from './style'
import { MosaicDataTableHeadCell } from './MosaicDataTableHeadRowCell'

export const MosaicDataTableHeadRow = <T,>(props: EnhancedTableProps<T>) => {
    const { headCells } = props

    const rowStyle = useMemo((): SxProps<Theme> => {
        return props.gridApi.current.pluginMap.headRowStyle.reduce((acc: SxProps<Theme>, plugin: MosaicDataTableHeadRowStylePlugin) => {
            const rowStyle = plugin.getHeadRowStyle?.({ gridApi: props.gridApi.current, caller: props.caller });
            return {
                ...acc,
                ...rowStyle
            }
        }, {});
    }, [...props.gridApi.current.pluginMap.headRowStyle, props.caller]);


    const headRowProps = useMemo(() => {
        return props.gridApi.current.pluginMap.headRowProps.reduce((acc: TableRowProps, plugin: MosaicDataTableHeadRowPropsPlugin) => {
            const bodyRowProps = plugin.getHeadRowProps({ gridApi: props.gridApi.current });
            return {
                ...acc,
                ...bodyRowProps
            }
        }, {});
    }, [...props.gridApi.current.pluginMap.headRowProps]);

    const getRow = useCallback((params: { children?: ReactNode }) => {

        for (const plugin of props.gridApi.current.pluginMap.headRowRender) {
            var row = plugin.renderHeadRow?.({ gridApi: props.gridApi.current, caller: props.caller, props: headRowProps, sx: rowStyle, children: params.children });
            if (row) {
                return row;
            }
        }

        const rowSx = {
            ...(props.sx ?? {}),
            ...rowStyle
        } as SxProps<Theme>

        return (<TableRow key="head-row" sx={rowSx} {...headRowProps} >{params.children}</TableRow>);
    }, [...props.gridApi.current.pluginMap.headRowRender, props.headCells, headRowProps, rowStyle]);


    return (
        getRow({
            children: (
                <>
                    {headCells
                        .map((h) => <MosaicDataTableHeadCell
                            key={h.id}
                            headCell={h}
                            gridApi={props.gridApi}
                            caller={props.caller}
                        />)
                    }
                </>
            )
        })
    )
}
