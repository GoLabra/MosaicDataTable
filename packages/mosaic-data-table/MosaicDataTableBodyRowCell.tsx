import { FC, ReactNode, useCallback, useMemo, useState } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableBodyCellRenderPlugin, MosaicDataTableBodyCellStylePlugin, MosaicDataTableBodyRowRenderPlugin, MosaicDataTableBodyRowStylePlugin, MosaicDataTablePlugin, MosaicDataTableBodyRowPropsPlugin, MosaicDataTableBodyRowCellPropsPlugin } from "./types/table-types";
import React from "react";
import { SxProps, Theme } from "@mui/material/styles";
import { filterGridPlugins } from "./util/filterGridPlugins";
import { MosaicDataTableCellRoot, MosaicDataTableRowRoot } from "./style";
import { TableCellProps, TableRowProps } from "@mui/material";
import { useMemoDebugger } from "./util/use-debug";
import { renderToStaticMarkup } from 'react-dom/server';

export function MosaicDataTableBodyRowCell<T>(props: {
    row: T | any;
    headCell: ColumnDef<T>;
    plugins?: MosaicDataTablePlugin[];
    gridApi: GridApi;
}) {

    const sColumn = useMemo(() => {
        return JSON.stringify(props.headCell);
    }, [props.headCell]);

    // body-cell-style
    const cellStylePlugins = useMemo((): MosaicDataTableBodyCellStylePlugin[] => {
        return filterGridPlugins<MosaicDataTableBodyCellStylePlugin>(props.plugins, 'body-cell-style');
    }, [props.plugins]);

    const cellStyle = useMemo((): SxProps<Theme> => {
        return cellStylePlugins.reduce((acc: SxProps<Theme>, plugin: MosaicDataTableBodyCellStylePlugin) => {
            const cellStyle = plugin.getBodyCellStyle?.(props.headCell, props.row, props.gridApi);
            return {
                ...acc,
                ...cellStyle
            }
        }, {});
    }, [cellStylePlugins, sColumn, props.row]);

    // props
    const bodyRowCellPropsPlugins = useMemo((): MosaicDataTableBodyRowCellPropsPlugin[] => {
        return filterGridPlugins<MosaicDataTableBodyRowCellPropsPlugin>(props.plugins, 'body-row-cell-props');
    }, [props.plugins]);

    const bodyRowCellProps = useMemo(() => {
        return bodyRowCellPropsPlugins.reduce((acc: TableCellProps, plugin: MosaicDataTableBodyRowCellPropsPlugin) => {
            const bodyRowCellProps = plugin.getBodyRowCellProps(props.headCell, props.row, props.gridApi);
            return {
                ...acc,
                ...bodyRowCellProps
            }
        }, {});
    }, [...bodyRowCellPropsPlugins, sColumn, props.row]);

    // body-cell-content-render
    const cellContentRenderPlugins = useMemo((): MosaicDataTableBodyCellContentRenderPlugin[] => {
        return filterGridPlugins<MosaicDataTableBodyCellContentRenderPlugin>(props.plugins, 'body-cell-content-render');
    }, [props.plugins]);

    const CellContent = cellContentRenderPlugins.reduce((acc: ReactNode | null, plugin: MosaicDataTableBodyCellContentRenderPlugin) => {
        return useMemo(() => {
            return plugin.renderBodyCellContent?.(props.headCell, props.row, props.gridApi, acc)
        }, [plugin, acc]);
    }, null);

    const cellContent = useMemo(() => CellContent, [CellContent]); 


    // body-cell-render
    const cellRenderPlugins = useMemo((): MosaicDataTableBodyCellRenderPlugin[] => {
        return filterGridPlugins<MosaicDataTableBodyCellRenderPlugin>(props.plugins, 'body-cell-render');
    }, [props.plugins]);

    const cell = useMemo(() => {

        for (const plugin of cellRenderPlugins) {
            var cell = plugin.renderBodyCell?.(props.headCell, props.row, props.gridApi, bodyRowCellProps, cellStyle, cellContent);
            if (cell) {
                return cell;
            }
        }

        return (<MosaicDataTableCellRoot key={props.headCell.id} align="left" sx={cellStyle} {...bodyRowCellProps} >{cellContent}</MosaicDataTableCellRoot>);
    }, [cellRenderPlugins, bodyRowCellProps, cellStyle, sColumn, props.row, cellContent]);


    return (
        <React.Fragment>
            {cell}
        </React.Fragment>
    )
}
