import { ReactNode, useCallback, useMemo, useState } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableBodyCellRenderPlugin, MosaicDataTableBodyCellStylePlugin, MosaicDataTableBodyRowRenderPlugin, MosaicDataTableBodyRowStylePlugin, MosaicDataTablePlugin } from "./types/table-types";
import React from "react";
import { SxProps, Theme } from "@mui/material/styles";
import { filterGridPlugins } from "./util/filterGridPlugins";
import { MosaicDataTableCellRoot, MosaicDataTableRowRoot } from "./style";


export function MosaicDataTableBodyRow<T>(props: {
    row: T | any;
    headCells: ColumnDef<T>[];
    plugins?: MosaicDataTablePlugin[];
    gridApi: GridApi;
}) {
    const { row, headCells } = props

    // body-row-render
    const rowRenderPlugins = useMemo((): MosaicDataTableBodyRowRenderPlugin[] => {
        return filterGridPlugins<MosaicDataTableBodyRowRenderPlugin>(props.plugins, 'body-row-render');
    }, [props.plugins]);

    const getRow = useCallback((params: {row: any, children?: ReactNode }) => {

        const rowStyle = getRowStyle();

        for (const plugin of rowRenderPlugins) {
            var cell = plugin.renderBodyRow?.(row, props.gridApi, rowStyle, params.children);
            if (cell) {
                return cell;
            }
        }

        return (<MosaicDataTableRowRoot key={row} hover tabIndex={-1} sx={rowStyle} >{params.children}</MosaicDataTableRowRoot>);
    }, [rowRenderPlugins]);

    // body-row-style
    const rowStylePlugins = useMemo((): MosaicDataTableBodyRowStylePlugin[] => {
        return filterGridPlugins<MosaicDataTableBodyRowStylePlugin>(props.plugins, 'body-row-style');
    }, [props.plugins]);

    const getRowStyle = useCallback((): SxProps<Theme> => {
        return rowStylePlugins.reduce((acc: SxProps<Theme>, plugin: MosaicDataTableBodyRowStylePlugin) => {
            const rowStyle = plugin.getBodyRowStyle?.(row, props.gridApi);
            return {
                ...acc,
                ...rowStyle
            }
        }, {});
    }, [rowStylePlugins]);

    // body-cell-render
    const cellRenderPlugins = useMemo((): MosaicDataTableBodyCellRenderPlugin[] => {
        return filterGridPlugins<MosaicDataTableBodyCellRenderPlugin>(props.plugins, 'body-cell-render');
    }, [props.plugins]);

    const getCell = useCallback((params: { cell: ColumnDef<T>, row: T, children?: ReactNode }) => {

        const cellStyle = getCellStyle({ cell: params.cell, row: params.row });

        for (const plugin of cellRenderPlugins) {
            var cell = plugin.renderBodyCell?.(params.cell, params.row, props.gridApi, cellStyle, params.children);
            if (cell) {
                return cell;
            }
        }

        return (<MosaicDataTableCellRoot key={params.cell.id} align="left" sx={cellStyle} >{params.children}</MosaicDataTableCellRoot>);
    }, [cellRenderPlugins]);


    // body-cell-style
    const cellStylePlugins = useMemo((): MosaicDataTableBodyCellStylePlugin[] => {
        return filterGridPlugins<MosaicDataTableBodyCellStylePlugin>(props.plugins, 'body-cell-style');
    }, [props.plugins]);

    const getCellStyle = useCallback((params: { cell: ColumnDef<T>, row: T }): SxProps<Theme> => {
        return cellStylePlugins.reduce((acc: SxProps<Theme>, plugin: MosaicDataTableBodyCellStylePlugin) => {
            const cellStyle = plugin.getBodyCellStyle?.(params.cell, row, props.gridApi);
            return {
                ...acc,
                ...cellStyle
            }
        }, {});
    }, [cellStylePlugins]);

    // body-cell-content-render
    const cellContentRenderPlugins = useMemo((): MosaicDataTableBodyCellContentRenderPlugin[] => {
        return filterGridPlugins<MosaicDataTableBodyCellContentRenderPlugin>(props.plugins, 'body-cell-content-render');
    }, [props.plugins]);

    const getCellContent = useCallback((cell: ColumnDef<T>, row: T) => {
        return cellContentRenderPlugins.reduce((acc: ReactNode | null, plugin: MosaicDataTableBodyCellContentRenderPlugin) => {
            const cellContent = plugin.renderBodyCellContent?.(cell, row, props.gridApi, acc);
            return cellContent;
        }, null);
    }, [cellContentRenderPlugins]);

    return (
        <React.Fragment>

            {getRow({
                row: row,
                children: (
                    <>
                        {headCells
                            .map((h) => {
                                return (
                                    getCell({
                                        cell: h,
                                        row: row,
                                        children: (<>{getCellContent(h, row)}</>)
                                    })
                                )
                            })
                        }
                    </>
                )
            })}

        </React.Fragment>
    )
}