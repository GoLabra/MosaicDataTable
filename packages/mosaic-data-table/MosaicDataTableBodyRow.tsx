import { ReactNode, useCallback, useMemo, useState } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableBodyCellRenderPlugin, MosaicDataTableBodyCellStylePlugin, MosaicDataTableBodyRowRenderPlugin, MosaicDataTableBodyRowStylePlugin, MosaicDataTablePlugin, MosaicDataTableBodyRowOnClickPlugin, MosaicDataTableBodyRowCellOnClickPlugin } from "./types/table-types";
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


    // body-row-style
    const rowStylePlugins = useMemo((): MosaicDataTableBodyRowStylePlugin[] => {
        return filterGridPlugins<MosaicDataTableBodyRowStylePlugin>(props.plugins, 'body-row-style');
    }, [props.plugins]);

    const getRowStyle = useMemo((): SxProps<Theme> => {
        return rowStylePlugins.reduce((acc: SxProps<Theme>, plugin: MosaicDataTableBodyRowStylePlugin) => {
            const rowStyle = plugin.getBodyRowStyle?.(row, props.gridApi);
            return {
                ...acc,
                ...rowStyle
            }
        }, {});
    }, [...rowStylePlugins]);

    // body-cell-style
    const cellStylePlugins = useMemo((): MosaicDataTableBodyCellStylePlugin[] => {
        return filterGridPlugins<MosaicDataTableBodyCellStylePlugin>(props.plugins, 'body-cell-style');
    }, [props.plugins]);

    const getCellStyle = useCallback((params: { columnDef: ColumnDef<T>, row: T }): SxProps<Theme> => {
        return cellStylePlugins.reduce((acc: SxProps<Theme>, plugin: MosaicDataTableBodyCellStylePlugin) => {
            const cellStyle = plugin.getBodyCellStyle?.(params.columnDef, row, props.gridApi);
            return {
                ...acc,
                ...cellStyle
            }
        }, {});
    }, [cellStylePlugins]);


    // body-row-render
    const rowRenderPlugins = useMemo((): MosaicDataTableBodyRowRenderPlugin[] => {
        return filterGridPlugins<MosaicDataTableBodyRowRenderPlugin>(props.plugins, 'body-row-render');
    }, [props.plugins]);

    const getRow = useCallback((params: { row: any, children?: ReactNode }) => {

        for (const plugin of rowRenderPlugins) {
            var bodyRow = plugin.renderBodyRow?.(row, props.gridApi, getRowStyle, params.children, { onClick: (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => bodyRowOnClickPlugin(event, params.row) });
            if (bodyRow) {
                return bodyRow;
            }
        }

        return (<MosaicDataTableRowRoot key={row} hover tabIndex={-1} sx={getRowStyle} onClick={(event) => bodyRowOnClickPlugin(event, params.row)} >{params.children}</MosaicDataTableRowRoot>);
    }, [...rowRenderPlugins, getRowStyle]);


    // body-cell-render
    const cellRenderPlugins = useMemo((): MosaicDataTableBodyCellRenderPlugin[] => {
        return filterGridPlugins<MosaicDataTableBodyCellRenderPlugin>(props.plugins, 'body-cell-render');
    }, [props.plugins]);

    const getCell = useCallback((params: { columnDef: ColumnDef<T>, row: T, children?: ReactNode }) => {

        const cellStyle = getCellStyle({ columnDef: params.columnDef, row: params.row });

        for (const plugin of cellRenderPlugins) {
            var cell = plugin.renderBodyCell?.(params.columnDef, params.row, props.gridApi, cellStyle, params.children, { onClick: (event: React.MouseEvent<HTMLTableCellElement>) => bodyRowCellOnClickPlugin(event, params.columnDef, params.row) });
            if (cell) {
                return cell;
            }
        }

        return (<MosaicDataTableCellRoot key={params.columnDef.id} align="left" sx={cellStyle} onClick={(event) => bodyRowCellOnClickPlugin(event, params.columnDef, params.row)} >{params.children}</MosaicDataTableCellRoot>);
    }, [cellRenderPlugins, getCellStyle]);


    // body-cell-content-render
    const cellContentRenderPlugins = useMemo((): MosaicDataTableBodyCellContentRenderPlugin[] => {
        return filterGridPlugins<MosaicDataTableBodyCellContentRenderPlugin>(props.plugins, 'body-cell-content-render');
    }, [props.plugins]);

    const getCellContent = useCallback((columnDef: ColumnDef<T>, row: T) => {
        return cellContentRenderPlugins.reduce((acc: ReactNode | null, plugin: MosaicDataTableBodyCellContentRenderPlugin) => {
            const cellContent = plugin.renderBodyCellContent?.(columnDef, row, props.gridApi, acc);
            return cellContent;
        }, null);
    }, [cellContentRenderPlugins]);


    // events
    const bodyRowOnClickPlugins = useMemo((): MosaicDataTableBodyRowOnClickPlugin[] => {
        return filterGridPlugins<MosaicDataTableBodyRowOnClickPlugin>(props.plugins, 'body-row-on-click');
    }, [props.plugins]);

    const bodyRowOnClickPlugin = useCallback((event: React.MouseEvent<HTMLTableRowElement>, row: any) => {
        for (const plugin of bodyRowOnClickPlugins) {
            plugin.bodyRowOnClick(event, row, props.gridApi);
        }
    }, [...bodyRowOnClickPlugins]);

    const bodyRowCellOnClickPlugins = useMemo((): MosaicDataTableBodyRowCellOnClickPlugin[] => {
        return filterGridPlugins<MosaicDataTableBodyRowCellOnClickPlugin>(props.plugins, 'body-row-cell-on-click');
    }, [props.plugins]);

    const bodyRowCellOnClickPlugin = useCallback((event: React.MouseEvent<HTMLTableCellElement>, columnDef: ColumnDef<any>, row: any) => {
        for (const plugin of bodyRowCellOnClickPlugins) {
            plugin.bodyRowCellOnClick(event, columnDef, row, props.gridApi);
        }


    }, [...bodyRowCellOnClickPlugins]);


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
                                        columnDef: h,
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