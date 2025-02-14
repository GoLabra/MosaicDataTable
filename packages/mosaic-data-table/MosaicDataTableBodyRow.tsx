import { ReactNode, useCallback, useMemo, useState } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableBodyCellRenderPlugin, MosaicDataTableBodyCellStylePlugin, MosaicDataTableBodyRowRenderPlugin, MosaicDataTableBodyRowStylePlugin, MosaicDataTablePlugin, MosaicDataTableBodyRowPropsPlugin, MosaicDataTableBodyRowCellPropsPlugin } from "./types/table-types";
import React from "react";
import { SxProps, Theme } from "@mui/material/styles";
import { filterGridPlugins } from "./util/filterGridPlugins";
import { MosaicDataTableCellRoot, MosaicDataTableRowRoot } from "./style";
import { TableCellProps, TableRowProps } from "@mui/material";
import { MosaicDataTableBodyRowCell } from "./MosaicDataTableBodyRowCell";


export function MosaicDataTableBodyRow<T>(props: {
    key: string;
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

    // body-cell-content-render
    const cellContentRenderPlugins = useMemo((): MosaicDataTableBodyCellContentRenderPlugin[] => {
        return filterGridPlugins<MosaicDataTableBodyCellContentRenderPlugin>(props.plugins, 'body-cell-content-render');
    }, [props.plugins]);


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

    return (
        <React.Fragment>

            {getRow({
                row: row,
                children: (
                    <>
                        {headCells
                            .map((h) => <MosaicDataTableBodyRowCell key={h.id} row={row} headCell={h} plugins={props.plugins} gridApi={props.gridApi} />)
                        }
                    </>
                )
            })}

        </React.Fragment>
    )
}