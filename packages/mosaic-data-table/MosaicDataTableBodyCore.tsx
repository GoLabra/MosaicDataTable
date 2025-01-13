import { useCallback, useMemo, useState } from "react";
import { GridApi, ColumnDef, MosaicDataTablePlugin, MosaicDataTableBodyRenderPlugin, MosaicDataTableBodyExtraRowPlugin } from "./types/table-types";
import React from "react";
import { TableBody } from "@mui/material";
import { filterGridPlugins } from "./util/filterGridPlugins";
import { MosaicDataTableBodyRow } from "./MosaicDataTableBodyRow";


export function MosaicDataTableBodyCore<T>(props: {
    columns: ColumnDef<T>[];
    plugins?: MosaicDataTablePlugin[];
    gridApi: GridApi;
    items: T[];
}) {

    // body-render
    const bodyRenderPlugins = useMemo((): MosaicDataTableBodyRenderPlugin[] => {
        return filterGridPlugins<MosaicDataTableBodyRenderPlugin>(props.plugins, 'body-render');
    }, [props.plugins]);

    const getTableBody = useCallback((params: { children?: React.ReactNode }) => {
        for (const plugin of bodyRenderPlugins) {
            var cell = plugin.renderBody?.(props.columns, props.items, props.gridApi, params.children);
            if (cell) {
                return cell;
            }
        }

        return (<TableBody>{params.children}</TableBody>);
    }, [bodyRenderPlugins]);

    // extra-row
    const extraRowPlugins = useMemo((): MosaicDataTableBodyExtraRowPlugin[] => {
        return filterGridPlugins<MosaicDataTableBodyExtraRowPlugin>(props.plugins, 'body-extra-row');
    }, [props.plugins]);

    const getExtraRows = useCallback(() => {

        return extraRowPlugins.map((plugin) => {
            var row = plugin.getBodyExtraRow?.(props.columns, props.items, props.gridApi);
            return row;
        });

    }, [extraRowPlugins, props.items, props.columns, props.gridApi]);

    return (
        <React.Fragment>

            {getTableBody({
                children: <>
                    {(props.items ?? []).map((row) => (
                        <MosaicDataTableBodyRow
                            key={JSON.stringify(row)}
                            row={row}
                            headCells={props.columns}
                            plugins={props.plugins}
                            gridApi={props.gridApi}
                        />
                    ))}
                    
                    {getExtraRows().map(i => i)}
                </>
            })}

        </React.Fragment>
    )
}