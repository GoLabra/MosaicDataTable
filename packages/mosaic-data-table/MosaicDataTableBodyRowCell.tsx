import { TableCellProps } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import React, { ReactNode, useMemo } from "react";
import { MosaicDataTableCellRoot } from "./style";
import { ColumnDef, GridApi, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableBodyCellStylePlugin, MosaicDataTableBodyRowCellPropsPlugin } from "./types/table-types";
import { filterGridPluginsByColumnScope } from "./util/filterGridPlugins";

export function MosaicDataTableBodyRowCell<T>(props: {
    row: T | any;
    rowId: string;
    headCell: ColumnDef<T>;
    gridApi: React.MutableRefObject<GridApi>
}) {

    const pluginMap = props.gridApi.current.pluginMap

    const cellStyle = useMemo((): SxProps<Theme> => {
        return pluginMap.bodyCellStyle.reduce((acc: SxProps<Theme>, plugin: MosaicDataTableBodyCellStylePlugin) => {
            const cellStyle = plugin.getBodyCellStyle?.({ headcell: props.headCell, row: props.row, gridApi: props.gridApi.current });
            return {
                ...acc,
                ...cellStyle
            }
        }, {});
    }, [pluginMap.bodyCellStyle, props.headCell, props.row]);

    const bodyRowCellProps = useMemo(() => {
        return pluginMap.bodyRowCellProps.reduce((acc: TableCellProps, plugin: MosaicDataTableBodyRowCellPropsPlugin) => {
            const bodyRowCellProps = plugin.getBodyRowCellProps({ columnDef: props.headCell, row: props.row, gridApi: props.gridApi.current });
            return {
                ...acc,
                ...bodyRowCellProps
            }
        }, {});
    }, [pluginMap.bodyRowCellProps, props.headCell, props.row]);

    const contentRenderPlugins = useMemo((): MosaicDataTableBodyCellContentRenderPlugin[] => {
        return filterGridPluginsByColumnScope<MosaicDataTableBodyCellContentRenderPlugin>(pluginMap.bodyCellContentRender, 'renderBodyCellContentColumnScope', props.headCell.id);
    }, [pluginMap.bodyCellContentRender, props.headCell.id]);

    const cellContent = useMemo(() => {
        return contentRenderPlugins.reduce((acc: ReactNode | null, plugin: MosaicDataTableBodyCellContentRenderPlugin) => {
            return plugin.renderBodyCellContent?.({ headcell: props.headCell, row: props.row, rowId: props.rowId, gridApi: props.gridApi.current, children: acc })
        }, null);
    }, [contentRenderPlugins, props.headCell, props.row, props.rowId]);

    // Optimized getCell function with better memoization
    const getCell = useMemo(() => {
        // Check plugins first - most common case
        for (const plugin of pluginMap.bodyCellRender) {
            const cell = plugin.renderBodyCell?.({ 
                headcell: props.headCell, 
                row: props.row, 
                rowId: props.rowId, 
                gridApi: props.gridApi.current, 
                props: bodyRowCellProps, 
                sx: cellStyle, 
                children: cellContent 
            });
            if (cell) {
                return cell;
            }
        }

        // Default cell rendering
        return (
            <MosaicDataTableCellRoot 
                key={props.headCell.id} 
                align="left" 
                sx={cellStyle} 
                {...bodyRowCellProps}
            >
                {cellContent}
            </MosaicDataTableCellRoot>
        );
    }, [pluginMap.bodyCellRender, props.headCell, props.row, props.rowId, bodyRowCellProps, cellStyle, cellContent]);

    return getCell;
}
