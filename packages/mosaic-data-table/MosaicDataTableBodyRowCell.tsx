import { ReactNode, useMemo } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableBodyCellRenderPlugin, MosaicDataTableBodyCellStylePlugin, MosaicDataTableBodyRowRenderPlugin, MosaicDataTableBodyRowStylePlugin, MosaicDataTablePlugin, MosaicDataTableBodyRowPropsPlugin, MosaicDataTableBodyRowCellPropsPlugin } from "./types/table-types";
import React from "react";
import { SxProps, Theme } from "@mui/material/styles";
import { filterGridPlugins, filterGridPluginsByColumnScope } from "./util/filterGridPlugins";
import { MosaicDataTableCellRoot } from "./style";
import { TableCellProps } from "@mui/material";

export function MosaicDataTableBodyRowCell<T>(props: {
    row: T | any;
    rowId: string;
    headCell: ColumnDef<T>;
    gridApi: React.MutableRefObject<GridApi>
}) {

    const sColumn = useMemo(() => {
        return JSON.stringify(props.headCell);
    }, [props.headCell]);

    const cellStyle = useMemo((): SxProps<Theme> => {
        return props.gridApi.current.pluginMap.bodyCellStyle.reduce((acc: SxProps<Theme>, plugin: MosaicDataTableBodyCellStylePlugin) => {
            const cellStyle = plugin.getBodyCellStyle?.({ headcell: props.headCell, row: props.row, gridApi: props.gridApi.current });
            return {
                ...acc,
                ...cellStyle
            }
        }, {});
    }, [...props.gridApi.current.pluginMap.bodyCellStyle, sColumn, props.row]);

    const bodyRowCellProps = useMemo(() => {
        return props.gridApi.current.pluginMap.bodyRowCellProps.reduce((acc: TableCellProps, plugin: MosaicDataTableBodyRowCellPropsPlugin) => {
            const bodyRowCellProps = plugin.getBodyRowCellProps({ columnDef: props.headCell, row: props.row, gridApi: props.gridApi.current });
            return {
                ...acc,
                ...bodyRowCellProps
            }
        }, {});
    }, [...props.gridApi.current.pluginMap.bodyRowCellProps, sColumn, props.row]);

    const contentRenderPlugins = useMemo((): MosaicDataTableBodyCellContentRenderPlugin[] => {
        return filterGridPluginsByColumnScope<MosaicDataTableBodyCellContentRenderPlugin>(props.gridApi.current.pluginMap.bodyCellContentRender, 'renderBodyCellContentColumnScope', props.headCell.id);
    }, [...props.gridApi.current.pluginMap.bodyCellContentRender, props.headCell.id]);

    const cellContent = useMemo(() => {
        return contentRenderPlugins.reduce((acc: ReactNode | null, plugin: MosaicDataTableBodyCellContentRenderPlugin) => {
            return plugin.renderBodyCellContent?.({ headcell: props.headCell, row: props.row, rowId: props.rowId, gridApi: props.gridApi.current, children: acc })
        }, null);
    }, [...contentRenderPlugins, sColumn]);

    const cell = useMemo(() => {

        for (const plugin of props.gridApi.current.pluginMap.bodyCellRender) {
            var cell = plugin.renderBodyCell?.({ headcell: props.headCell, row: props.row, rowId: props.rowId, gridApi: props.gridApi.current, props: bodyRowCellProps, sx: cellStyle, children: cellContent });
            if (cell) {
                return cell;
            }
        }

        return (<MosaicDataTableCellRoot key={props.headCell.id} align="left" sx={cellStyle} {...bodyRowCellProps} >{cellContent}</MosaicDataTableCellRoot>);
    }, [...props.gridApi.current.pluginMap.bodyCellRender, bodyRowCellProps, cellStyle, sColumn, props.row, cellContent]);

    return (
        <React.Fragment>
            {cell}
        </React.Fragment>
    )
}
