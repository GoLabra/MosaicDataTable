import { GlobalStyles, Table, TableBody, TableContainer, TableProps } from "@mui/material";
import { PropsWithChildren, useCallback, useEffect, useMemo, useRef } from "react";
import { MosaicDataTableHead } from "./MosaicDataTableHead";
import { GridApi, ColumnDef, MosaicDataTableBodyRenderPlugin, MosaicDataTableGridColumnsPlugin, MosaicDataTableProps, MosaicDataTablePropsPlugin } from "./types/table-types";
import { MosaicDataTableBody } from "./MosaicDataTableBody";
import { MosaicDataTableRoot } from "./style";
import { filterGridPlugins, getPluginMap } from "./util/filterGridPlugins";
import { MemoStore } from "./util/MemoStore";

export const MosaicDataTable = <T extends any,>(props: PropsWithChildren<MosaicDataTableProps<T>>) => {

    useEffect(() => {
        props.plugins?.forEach((plugin) => {
            plugin.onInit?.(gridApi.current);
        });
    }, [props.plugins]);

    const memoStore = useRef(new MemoStore());
    const pluginMap = useMemo(() => getPluginMap(props.plugins), [...props.plugins ?? []]);
    
    const visileHeadCells = useMemo((): Array<ColumnDef<any>> => {
        return props.headCells.filter((headCell) => headCell.visible ?? true);
    }, [props.headCells]);
    
    const columns = useMemo((): Array<ColumnDef<any>> => {
        return pluginMap.gridColumns.reduce((acc: Array<ColumnDef<any>>, plugin: MosaicDataTableGridColumnsPlugin): Array<ColumnDef<any>> => {
            const cellContent = plugin.getColumns?.({ headCells: acc, memoStore: memoStore.current });
            return cellContent ?? [];
        }, visileHeadCells);

    }, [...pluginMap.gridColumns, visileHeadCells]);


    useEffect(() => {
        memoStore.current.clear();
    }, [props.items]);

    const gridApi = useRef<GridApi>({} as GridApi);
    gridApi.current.items = props.items;
    gridApi.current.columns = columns;
    gridApi.current.plugins = props.plugins || [];
    gridApi.current.pluginMap = pluginMap;
    gridApi.current.memoStore = memoStore.current;


    // const gridApi: GridApi = useMemo(() => ({
    //     items: props.items,
    //     columns: columns,
    //     plugins: props.plugins || [],
    //     pluginMap: pluginMap,
    //     memoStore: memoStore.current
    // }), [props.items, columns, memoStore, pluginMap]);

    // props
    // const tablePropsPlugins = useMemo((): MosaicDataTablePropsPlugin[] => {
    //     return filterGridPlugins<MosaicDataTablePropsPlugin>(props.plugins, 'table-props');
    // }, [props.plugins]);

    const tableProps = useMemo(() => {

        return pluginMap.tableProps.reduce((acc: TableProps, plugin: MosaicDataTablePropsPlugin) => {
            const tableProps = plugin.getTableProps({gridApi:gridApi.current});
            return {
                ...acc,
                ...tableProps
            }
        }, {});

    }, [...pluginMap.tableProps]);

    return (<>

        <GlobalStyles styles={{
            'html': {
                '--mui-palette-MosaicDataTable-background': 'var(--mui-palette-background-paper)',  
                '--mui-palette-MosaicDataTable-highlight': 'color-mix(in srgb, rgb(var(--mui-palette-primary-mainChannel)), transparent 70%)',
                '--mui-palette-MosaicDataTable-rowHover': 'color-mix(in srgb, rgb(var(--mui-palette-background-paperChannel)), var(--mui-palette-common-onBackground) 7%)',
                '--mui-palette-MosaicDataTable-extraRow': 'color-mix(in srgb, rgb(var(--mui-palette-primary-mainChannel)), var(--mui-palette-background-paper) 90%)',
            }
        }} />

        <MosaicDataTableRoot {...props.root}>
     
                <TableContainer>
               
                    <Table sx={{ height: '100%' }} aria-labelledby="tableTitle" size="medium" {...tableProps}>
                        <caption>{props.caption}</caption>
                     
                        <MosaicDataTableHead
                            headCells={columns}
                            gridApi={gridApi}
                        />

                        <MosaicDataTableBody
                            columns={columns}
                            gridApi={gridApi}
                            items={props.items}
                        />
                        
                    </Table>
                </TableContainer>

        </MosaicDataTableRoot>
        </>
    )
}