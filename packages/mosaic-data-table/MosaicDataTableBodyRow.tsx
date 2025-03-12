import { ReactNode, useCallback, useMemo } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyRowRenderPlugin, MosaicDataTableBodyRowStylePlugin, MosaicDataTablePlugin, MosaicDataTableBodyRowPropsPlugin, } from "./types/table-types";
import React from "react";
import { SxProps, Theme } from "@mui/material/styles";
import { filterGridPlugins } from "./util/filterGridPlugins";
import { MosaicDataTableRowRoot } from "./style";
import { TableRowProps } from "@mui/material";
import { MosaicDataTableBodyRowCell } from "./MosaicDataTableBodyRowCell";
import { useMemoDebugger } from "./util/use-debug";


export function MosaicDataTableBodyRow<T>(props: {
    key: string;
    row: T | any;
    rowId: string;
    headCells: ColumnDef<T>[];
    gridApi: React.MutableRefObject<GridApi>;
}) {
    const { row, headCells } = props

    const getRowStyle = useMemo((): SxProps<Theme> => {
        return props.gridApi.current.pluginMap.bodyRowStyle.reduce((acc: SxProps<Theme>, plugin: MosaicDataTableBodyRowStylePlugin) => {
            const rowStyle = plugin.getBodyRowStyle?.({ row, gridApi: props.gridApi.current });
            return {
                ...acc,
                ...rowStyle
            }
        }, {});
    }, [...props.gridApi.current.pluginMap.bodyRowStyle]);

    const bodyRowPropsPlugin = useMemo(() => {
        return props.gridApi.current.pluginMap.bodyRowProps.reduce((acc: TableRowProps, plugin: MosaicDataTableBodyRowPropsPlugin) => {
            const bodyRowProps = plugin.getBodyRowProps({ row, gridApi: props.gridApi.current });
            return {
                ...acc,
                ...bodyRowProps
            }
        }, {});
    }, [...props.gridApi.current.pluginMap.bodyRowProps]);

    const getRow = useCallback((params: { children?: ReactNode }) => {

        for (const plugin of props.gridApi.current.pluginMap.bodyRowRender) {
            var bodyRow = plugin.renderBodyRow?.({ row, gridApi: props.gridApi.current, props: bodyRowPropsPlugin, sx: getRowStyle, children: params.children });
            if (bodyRow) {
                return bodyRow;
            }
        }

        return (<MosaicDataTableRowRoot key={row} hover tabIndex={-1} sx={getRowStyle} {...bodyRowPropsPlugin} >{params.children}</MosaicDataTableRowRoot>);
    }, [...props.gridApi.current.pluginMap.bodyRowRender, getRowStyle]);


    return (
        <React.Fragment>
            {getRow({
                children: (<>{headCells
                    .map((h) => <MosaicDataTableBodyRowCell
                        key={h.id}
                        row={row}
                        rowId={props.rowId}
                        headCell={h}
                        gridApi={props.gridApi}
                    />)
                }
                </>)
            })}
        </React.Fragment>
    )
}