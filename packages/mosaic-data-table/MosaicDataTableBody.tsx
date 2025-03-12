import { useCallback, useMemo } from "react";
import { GridApi, ColumnDef, MosaicDataTablePlugin, MosaicDataTableBodyRenderPlugin, MosaicDataTableBodyExtraRowEndPlugin, MosaicDataTableBodyExtraRowStartPlugin, MosaicDataTableBodyPropsPlugin } from "./types/table-types";
import React from "react";
import { TableBody, TableBodyProps } from "@mui/material";
import { filterGridPlugins } from "./util/filterGridPlugins";
import { MosaicDataTableBodyRow } from "./MosaicDataTableBodyRow";
import { hash } from "./util/hash-functinon";

interface MosaicDataTableBodyProps<T> {
    columns: ColumnDef<T>[];
    gridApi: React.MutableRefObject<GridApi>;
    items: T[];
}
export function MosaicDataTableBody<T>(props: MosaicDataTableBodyProps<T>) {

    const getTableBody = useCallback((params: { children?: React.ReactNode }) => {
        for (const plugin of props.gridApi.current.pluginMap.bodyRender) { 
            var body = plugin.renderBody?.({ headCells: props.columns, rows: props.items, gridApi: props.gridApi.current, props: bodyProps, children: params.children });
            if (body) {
                return body
            }
        }

        return (<TableBody {...bodyProps}>{params.children}</TableBody>);
    }, [...props.gridApi.current.pluginMap.bodyRender, props.items, props.columns, props.gridApi]);

    const getExtraRowsStart = useMemo(() => {
        return props.gridApi.current.pluginMap.bodyExtraRowStart.map((plugin) => {
            var row = plugin.getBodyExtraRowStart?.({ columns: props.columns, row: props.items, gridApi: props.gridApi.current });
            return row;
        });
    }, [...props.gridApi.current.pluginMap.bodyExtraRowStart, props.items, props.columns, props.gridApi]);


    // extra-row-end
    // const extraRowEndPlugins = useMemo((): MosaicDataTableBodyExtraRowEndPlugin[] => {
    //     return filterGridPlugins<MosaicDataTableBodyExtraRowEndPlugin>(props.plugins, 'body-extra-row-end');
    // }, [props.plugins]);

    const getExtraRowsEnd = useMemo(() => {
        return props.gridApi.current.pluginMap.bodyExtraRowEnd.map((plugin) => {
            var row = plugin.getBodyExtraRowEnd?.({ columns: props.columns, row: props.items, gridApi: props.gridApi.current });
            return row;
        });

    }, [...props.gridApi.current.pluginMap.bodyExtraRowEnd, props.items, props.columns, props.gridApi]);

    // events
    // const bodyPropsPlugins = useMemo((): MosaicDataTableBodyPropsPlugin[] => {
    //     return filterGridPlugins<MosaicDataTableBodyPropsPlugin>(props.plugins, 'body-props');
    // }, [props.plugins]);

    const bodyProps = useMemo(() => {
        return props.gridApi.current.pluginMap.bodyProps.reduce((acc: TableBodyProps, plugin: MosaicDataTableBodyPropsPlugin) => { 
            const bodyProps = plugin.getBodyProps({ gridApi: props.gridApi.current});
            return {
                ...acc,
                ...bodyProps
            }
        }, {});
    }, [...props.gridApi.current.pluginMap.bodyProps]);

    return (
        <React.Fragment>

            {getTableBody({
                children: <>

                    {getExtraRowsStart}

                    {(props.items ?? []).map((row) => {

                        const rowKey = hash(JSON.stringify(row));

                        return (<MosaicDataTableBodyRow
                            key={rowKey}
                            row={row}
                            rowId={rowKey}
                            headCells={props.columns}
                            gridApi={props.gridApi}
                        />)
                    }
                    )}
                    {getExtraRowsEnd}
                </>
            })}

        </React.Fragment>
    )
}