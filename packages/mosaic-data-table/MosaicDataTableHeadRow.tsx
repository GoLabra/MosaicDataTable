import { TableRow, TableRowProps } from '@mui/material'
import { SxProps, Theme } from '@mui/material/styles'
import { ReactNode, useCallback, useMemo } from 'react'
import { MosaicDataTableHeadCell } from './MosaicDataTableHeadRowCell'
import { EnhancedTableProps, MosaicDataTableHeadRowPropsPlugin, MosaicDataTableHeadRowStylePlugin } from './types/table-types'
import { MosaicDataTableHeadRowRoot } from './style'

export const MosaicDataTableHeadRow = <T,>(props: EnhancedTableProps<T>) => {
    const { headCells } = props

    const pluginMap = props.gridApi.current.pluginMap
    
    const rowStyle = useMemo((): SxProps<Theme> => {
        return pluginMap.headRowStyle.reduce((acc: SxProps<Theme>, plugin: MosaicDataTableHeadRowStylePlugin) => {
            const rowStyle = plugin.getHeadRowStyle?.({ gridApi: props.gridApi.current, caller: props.caller });
            return {
                ...acc,
                ...rowStyle
            }
        }, {});
    }, [pluginMap.headRowStyle, props.caller]);

    const headRowProps = useMemo(() => {
        return pluginMap.headRowProps.reduce((acc: TableRowProps, plugin: MosaicDataTableHeadRowPropsPlugin) => {
            const bodyRowProps = plugin.getHeadRowProps({ gridApi: props.gridApi.current });
            return {
                ...acc,
                ...bodyRowProps
            }
        }, {});
    }, [pluginMap.headRowProps]);

    // Memoize the children to prevent unnecessary re-creation
    const headCellsChildren = useMemo(() => (
        <>
            {headCells.map((h) => (
                <MosaicDataTableHeadCell
                    key={h.id}
                    headCell={h}
                    gridApi={props.gridApi}
                    caller={props.caller}
                />
            ))}
        </>
    ), [headCells, props.gridApi, props.caller]);

    // Memoize the final row styles to prevent object recreation
    const finalRowSx = useMemo(() => ({
        ...(props.sx ?? {}),
        ...rowStyle
    } as SxProps<Theme>), [props.sx, rowStyle]);

    // Optimized getRow function with better memoization
    const getRow = useCallback((params: { children?: ReactNode }) => {
        // Check plugins first - most common case
        for (const plugin of pluginMap.headRowRender) {
            const row = plugin.renderHeadRow?.({ 
                gridApi: props.gridApi.current, 
                caller: props.caller, 
                props: headRowProps, 
                sx: finalRowSx, 
                children: params.children 
            });
            if (row) {
                return row;
            }
        }

        // Default row rendering
        return (
            <MosaicDataTableHeadRowRoot 
                key="head-row" 
                sx={finalRowSx} 
                {...headRowProps}
            >
                {params.children}
            </MosaicDataTableHeadRowRoot>
        );
    }, [pluginMap.headRowRender, props.caller, headRowProps, finalRowSx]);

    // Memoize the final result to prevent unnecessary re-renders
    const rowElement = useMemo(() => 
        getRow({ children: headCellsChildren }), 
        [getRow, headCellsChildren]
    );

    return rowElement;
}
