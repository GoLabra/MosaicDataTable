import { ReactNode, useCallback, useMemo, useState } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableBodyCellRenderPlugin, MosaicDataTableBodyCellStylePlugin, MosaicDataTableBodyRowRenderPlugin, MosaicDataTableBodyRowStylePlugin, MosaicDataTablePlugin, MosaicDataTableBodyRowPropsPlugin, MosaicDataTableBodyRowCellPropsPlugin } from "./types/table-types";
import React from "react";
import { SxProps, Theme } from "@mui/material/styles";
import { filterGridPlugins } from "./util/filterGridPlugins";
import { MosaicDataTableCellRoot, MosaicDataTableRowRoot } from "./style";
import { TableCellProps, TableRowProps } from "@mui/material";


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
            var bodyRow = plugin.renderBodyRow?.(row, props.gridApi, bodyRowPropsPlugin, getRowStyle, params.children);
            if (bodyRow) {
                return bodyRow;
            }
        }

        return (<MosaicDataTableRowRoot key={row} hover tabIndex={-1} sx={getRowStyle} {...bodyRowPropsPlugin} >{params.children}</MosaicDataTableRowRoot>); 
    }, [...rowRenderPlugins, getRowStyle]);


    // body-cell-render
    const cellRenderPlugins = useMemo((): MosaicDataTableBodyCellRenderPlugin[] => {
        return filterGridPlugins<MosaicDataTableBodyCellRenderPlugin>(props.plugins, 'body-cell-render');
    }, [props.plugins]);

    const getCell = useCallback((params: { columnDef: ColumnDef<T>, row: T, children?: ReactNode }) => {

        const cellStyle = getCellStyle({ columnDef: params.columnDef, row: params.row });
        const bodyRowCellProps = getBodyRowCellPropsPlugin(params.columnDef, params.row);
        
        for (const plugin of cellRenderPlugins) {
            var cell = plugin.renderBodyCell?.(params.columnDef, params.row, props.gridApi, bodyRowCellProps, cellStyle, params.children);
            if (cell) {
                return cell;
            }
        }

        return (<MosaicDataTableCellRoot key={params.columnDef.id} align="left" sx={cellStyle} {...bodyRowCellProps} >{params.children}</MosaicDataTableCellRoot>);
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


    // props
    const bodyRowPropsPlugins = useMemo((): MosaicDataTableBodyRowPropsPlugin[] => {
        return filterGridPlugins<MosaicDataTableBodyRowPropsPlugin>(props.plugins, 'body-row-props');
    }, [props.plugins]);

    const bodyRowPropsPlugin = useMemo(() => { 
        return bodyRowPropsPlugins.reduce((acc: TableRowProps, plugin: MosaicDataTableBodyRowPropsPlugin) => {
            const bodyRowProps = plugin.getBodyRowProps(row, props.gridApi);
            return {
                ...acc,
                ...bodyRowProps
            }
        }, {});
    }, [...bodyRowPropsPlugins]);

    const bodyRowCellPropsPlugins = useMemo((): MosaicDataTableBodyRowCellPropsPlugin[] => {
        return filterGridPlugins<MosaicDataTableBodyRowCellPropsPlugin>(props.plugins, 'body-row-cell-props');
    }, [props.plugins]);

    const getBodyRowCellPropsPlugin = useCallback((columnDef: ColumnDef<any>, row: any) => {
        return bodyRowCellPropsPlugins.reduce((acc: TableCellProps, plugin: MosaicDataTableBodyRowCellPropsPlugin) => {
            const bodyRowCellProps = plugin.getBodyRowCellProps(columnDef, row, props.gridApi);
            return {
                ...acc,
                ...bodyRowCellProps
            }
        }, {});
    }, [...bodyRowCellPropsPlugins]);


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