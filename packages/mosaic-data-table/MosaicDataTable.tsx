import { GlobalStyles, Table, TableBody, TableContainer, TableProps } from "@mui/material";
import { PropsWithChildren, useCallback, useEffect, useMemo, useRef, HTMLAttributes } from "react";
import { MosaicDataTableHead } from "./MosaicDataTableHead";
import { GridApi, ColumnDef, MosaicDataTableBodyRenderPlugin, MosaicDataTableGridColumnsPlugin, MosaicDataTableProps, MosaicDataTablePropsPlugin } from "./types/table-types";
import { MosaicDataTableBody } from "./MosaicDataTableBody";
import { MosaicDataTableRoot } from "./style";
import { filterGridPlugins, getPluginMap } from "./util/filterGridPlugins";
import { MemoStore } from "./util/MemoStore";
import { hash } from "./util/hash-functinon";

type MosaicDataTableExtendedProps<T> = MosaicDataTableProps<T> & 
    Omit<HTMLAttributes<HTMLDivElement>, keyof MosaicDataTableProps<T>>;

export const MosaicDataTable = <T extends any,>(props: PropsWithChildren<MosaicDataTableExtendedProps<T>>) => {

	const { caption, items, headCells, plugins, children, ...rest } = props;

    useEffect(() => {
        plugins?.forEach((plugin) => {
            plugin.onInit?.(gridApi.current);
        });
    }, [plugins]);

    const memoStore = useRef(new MemoStore());
    const pluginMap = useMemo(() => getPluginMap(plugins), [...plugins ?? []]);
    
    const visileHeadCells = useMemo((): Array<ColumnDef<any>> => {
        return headCells.filter((headCell) => headCell.visible ?? true);
    }, [headCells]);
    
    const columns = useMemo((): Array<ColumnDef<any>> => {
        return pluginMap.gridColumns.reduce((acc: Array<ColumnDef<any>>, plugin: MosaicDataTableGridColumnsPlugin): Array<ColumnDef<any>> => {
            const cellContent = plugin.getColumns?.({ headCells: acc, memoStore: memoStore.current });
            return cellContent ?? [];
        }, visileHeadCells);

    }, [...pluginMap.gridColumns, visileHeadCells]);

    const columnsHash = useMemo(() => hash(JSON.stringify(columns)), [columns]);

    useEffect(() => {
        memoStore.current.clear();
    }, [items]);

    const gridApi = useRef<GridApi>({} as GridApi);
    gridApi.current.items = items;
    gridApi.current.columns = columns;
    gridApi.current.columnsHash = columnsHash;
    gridApi.current.plugins = plugins || [];
    gridApi.current.pluginMap = pluginMap;
    gridApi.current.memoStore = memoStore.current;


    // const gridApi: GridApi = useMemo(() => ({
    //     items: items,
    //     columns: columns,
    //     plugins: plugins || [],
    //     pluginMap: pluginMap,
    //     memoStore: memoStore.current
    // }), [items, columns, memoStore, pluginMap]);

    // props
    // const tablePropsPlugins = useMemo((): MosaicDataTablePropsPlugin[] => {
    //     return filterGridPlugins<MosaicDataTablePropsPlugin>(plugins, 'table-props');
    // }, [plugins]);

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

        <MosaicDataTableRoot {...rest}>
     
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
                            items={items}
                        />
                        
                    </Table>
                </TableContainer>

        </MosaicDataTableRoot>
        </>
    )
}