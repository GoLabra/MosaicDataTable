import { ReactNode, useCallback, useMemo } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyRowStylePlugin, MosaicDataTableBodyRowPropsPlugin, } from "./types/table-types";
import React from "react";
import { SxProps, Theme } from "@mui/material/styles";
import { MosaicDataTableRowRoot } from "./style";
import { TableRowProps } from "@mui/material";
import { MosaicDataTableBodyRowCell } from "./MosaicDataTableBodyRowCell";


export function MosaicDataTableBodyRow<T>(props: {
    key: string;
    row: T | any;
    rowId: string;
    headCells: ColumnDef<T>[];
    gridApi: React.MutableRefObject<GridApi>;
}) {
    const { row, headCells } = props

    const pluginMap = props.gridApi.current.pluginMap

    const getRowStyle = useMemo((): SxProps<Theme> => {
        return pluginMap.bodyRowStyle.reduce((acc: SxProps<Theme>, plugin: MosaicDataTableBodyRowStylePlugin) => {
            const rowStyle = plugin.getBodyRowStyle?.({ row, gridApi: props.gridApi.current });
            return {
                ...acc,
                ...rowStyle
            }
        }, {});
    }, [pluginMap.bodyRowStyle, row]);

    const bodyRowPropsPlugin = useMemo(() => {
        return pluginMap.bodyRowProps.reduce((acc: TableRowProps, plugin: MosaicDataTableBodyRowPropsPlugin) => {
            const bodyRowProps = plugin.getBodyRowProps({ row, gridApi: props.gridApi.current });
            return {
                ...acc,
                ...bodyRowProps
            }
        }, {});
    }, [pluginMap.bodyRowProps, row]);

    // Memoize the children to prevent unnecessary re-creation
    const bodyCellsChildren = useMemo(() => (
        <>
            {headCells.map((h) => (
                <MosaicDataTableBodyRowCell
                    key={h.id}
                    row={row}
                    rowId={props.rowId}
                    headCell={h}
                    gridApi={props.gridApi}
                />
            ))}
        </>
    ), [headCells, row, props.rowId, props.gridApi]);

    // Optimized getRow function with better memoization
    const getRow = useCallback((params: { children?: ReactNode }) => {
        // Check plugins first - most common case
        for (const plugin of pluginMap.bodyRowRender) {
            const bodyRow = plugin.renderBodyRow?.({ 
                row, 
                gridApi: props.gridApi.current, 
                props: bodyRowPropsPlugin, 
                sx: getRowStyle, 
                children: params.children 
            });
            if (bodyRow) {
                return bodyRow;
            }
        }

        // Default row rendering
        return (
            <MosaicDataTableRowRoot 
                key={row} 
                hover 
                tabIndex={-1} 
                sx={getRowStyle} 
                {...bodyRowPropsPlugin}
            >
                {params.children}
            </MosaicDataTableRowRoot>
        );
    }, [pluginMap.bodyRowRender, row, bodyRowPropsPlugin, getRowStyle]);

    // Memoize the final result to prevent unnecessary re-renders
    const rowElement = useMemo(() => 
        getRow({ children: bodyCellsChildren }), 
        [getRow, bodyCellsChildren]
    );

    return rowElement;
}