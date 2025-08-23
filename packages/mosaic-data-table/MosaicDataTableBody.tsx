import { TableBody, TableBodyProps } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { MosaicDataTableBodyRow } from "./MosaicDataTableBodyRow";
import { ColumnDef, GridApi, MosaicDataTableBodyPropsPlugin } from "./types/table-types";
import { hash } from "./util/hash-functinon";

interface MosaicDataTableBodyProps<T> {
    columns: ColumnDef<T>[];
    gridApi: React.MutableRefObject<GridApi>;
    items: T[] | null;
}

export function MosaicDataTableBody<T>(props: MosaicDataTableBodyProps<T>) {
    const pluginMap = props.gridApi.current.pluginMap

    const bodyProps = useMemo(() => {
        return pluginMap.bodyProps.reduce((acc: TableBodyProps, plugin: MosaicDataTableBodyPropsPlugin) => { 
            const bodyProps = plugin.getBodyProps({ gridApi: props.gridApi.current});
            return {
                ...acc,
                ...bodyProps
            }
        }, {});
    }, [pluginMap.bodyProps]);

    const getExtraRowsStart = useMemo(() => {
        return pluginMap.bodyExtraRowStart.map((plugin) => {
            const row = plugin.getBodyExtraRowStart?.({ columns: props.columns, row: props.items, gridApi: props.gridApi.current });
            return row;
        });
    }, [pluginMap.bodyExtraRowStart, props.items, props.columns]);

    const getExtraRowsEnd = useMemo(() => {
        return pluginMap.bodyExtraRowEnd.map((plugin) => {
            const row = plugin.getBodyExtraRowEnd?.({ columns: props.columns, row: props.items, gridApi: props.gridApi.current });
            return row;
        });
    }, [pluginMap.bodyExtraRowEnd, props.items, props.columns]);

    // Memoize the children to prevent unnecessary re-creation
    const bodyRowsChildren = useMemo(() => (
        <>
            {getExtraRowsStart}
            {(props.items ?? []).map((row) => {
                const rowKey = hash(JSON.stringify(row));
                return (
                    <MosaicDataTableBodyRow
                        key={rowKey}
                        row={row}
                        rowId={rowKey}
                        headCells={props.columns}
                        gridApi={props.gridApi}
                    />
                );
            })}
            {getExtraRowsEnd}
        </>
    ), [getExtraRowsStart, props.items, props.columns, props.gridApi, getExtraRowsEnd]);

    // Optimized getTableBody function with better memoization
    const getTableBody = useCallback((params: { children?: React.ReactNode }) => {
        // Check plugins first - most common case
        for (const plugin of pluginMap.bodyRender) { 
            const body = plugin.renderBody?.({ 
                headCells: props.columns, 
                rows: props.items, 
                gridApi: props.gridApi.current, 
                props: bodyProps, 
                children: params.children 
            });
            if (body) {
                return body;
            }
        }

        // Default body rendering
        return (
            <TableBody {...bodyProps}>
                {params.children}
            </TableBody>
        );
    }, [pluginMap.bodyRender, props.columns, props.items, bodyProps]);

    // Memoize the final result to prevent unnecessary re-renders
    const tableBodyElement = useMemo(() => 
        getTableBody({ children: bodyRowsChildren }), 
        [getTableBody, bodyRowsChildren]
    );

    return tableBodyElement;
}