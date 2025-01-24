import { useCallback, useMemo, useState } from "react";
import { GridApi, ColumnDef, MosaicDataTablePlugin, MosaicDataTableBodyRenderPlugin, MosaicDataTableBodyExtraRowEndPlugin, MosaicDataTableBodyExtraRowStartPlugin, MosaicDataTableBodyOnClickPlugin } from "./types/table-types";
import React from "react";
import { TableBody } from "@mui/material";
import { filterGridPlugins } from "./util/filterGridPlugins";
import { MosaicDataTableBodyRow } from "./MosaicDataTableBodyRow";

interface MosaicDataTableBodyProps<T> {
    columns: ColumnDef<T>[];
    plugins?: MosaicDataTablePlugin[];
    gridApi: GridApi;
    items: T[];
}
export function MosaicDataTableBody<T>(props: MosaicDataTableBodyProps<T>) {
    // body-render
    const bodyRenderPlugins = useMemo((): MosaicDataTableBodyRenderPlugin[] => {
        return filterGridPlugins<MosaicDataTableBodyRenderPlugin>(props.plugins, 'body-render');
    }, [props.plugins]);

    const getTableBody = useCallback((params: { children?: React.ReactNode }) => {
        for (const plugin of bodyRenderPlugins) {
            var body = plugin.renderBody?.(props.columns, props.items, props.gridApi, params.children, { onClick: headOnClick });
            if (body) {
                return body
            }
        }

        return (<TableBody onClick={headOnClick}>{params.children}</TableBody>);
    }, [...bodyRenderPlugins, props.items, props.columns, props.gridApi]);

    // extra-row-start
    const extraRowStartPlugins = useMemo((): MosaicDataTableBodyExtraRowStartPlugin[] => {
        return filterGridPlugins<MosaicDataTableBodyExtraRowStartPlugin>(props.plugins, 'body-extra-row-start');
    }, [props.plugins]);

    const getExtraRowsStart = useMemo(() => {
        return extraRowStartPlugins.map((plugin) => {
            var row = plugin.getBodyExtraRowStart?.(props.columns, props.items, props.gridApi);
            return row;
        });
    }, [...extraRowStartPlugins, props.items, props.columns, props.gridApi]);


    // extra-row-end
    const extraRowEndPlugins = useMemo((): MosaicDataTableBodyExtraRowEndPlugin[] => {
        return filterGridPlugins<MosaicDataTableBodyExtraRowEndPlugin>(props.plugins, 'body-extra-row-end');
    }, [props.plugins]);

    const getExtraRowsEnd = useMemo(() => {
        return extraRowEndPlugins.map((plugin) => {
            var row = plugin.getBodyExtraRowEnd?.(props.columns, props.items, props.gridApi);
            return row;
        });

    }, [...extraRowEndPlugins, props.items, props.columns, props.gridApi]);

    // events
    const bodyOnClickPlugins = useMemo((): MosaicDataTableBodyOnClickPlugin[] => {
        return filterGridPlugins<MosaicDataTableBodyOnClickPlugin>(props.plugins, 'on-click');
    }, [props.plugins]);

    const headOnClick = useCallback((event: React.MouseEvent<HTMLTableSectionElement>) => {
        for (const plugin of bodyOnClickPlugins) {
            plugin.bodyOnClick(event, props.gridApi);
        }
    }, [...bodyOnClickPlugins]);

    return (
        <React.Fragment>

            {getTableBody({
                children: <>

                    {getExtraRowsStart}

                    {(props.items ?? []).map((row) => (
                        <MosaicDataTableBodyRow
                            key={JSON.stringify(row)}
                            row={row}
                            headCells={props.columns}
                            plugins={props.plugins}
                            gridApi={props.gridApi}
                        />
                    ))}
                    
                    {getExtraRowsEnd}
                </>
            })}

        </React.Fragment>
    )
}