import { BoxProps, GlobalStyles, Table, TableContainer, TableProps } from "@mui/material";
import { HTMLAttributes, memo, PropsWithChildren, useEffect, useMemo, useRef } from "react";
import { MosaicDataTableBody } from "./MosaicDataTableBody";
import { MosaicDataTableHead } from "./MosaicDataTableHead";
import { MosaicDataTableRoot } from "./style";
import { ColumnDef, GridApi, MosaicDataTableGridColumnsPlugin, MosaicDataTableProps, MosaicDataTablePropsPlugin } from "./types/table-types";
import { getPluginMap } from "./util/filterGridPlugins";
import { MemoStore } from "./util/MemoStore";

type MosaicDataTableExtendedProps<T> = MosaicDataTableProps<T> & 
										BoxProps &
   									    Omit<HTMLAttributes<HTMLDivElement>, keyof MosaicDataTableProps<T>>;

const MosaicDataTableComponent = <T extends any,>(props: PropsWithChildren<MosaicDataTableExtendedProps<T>>) => {

	const { caption, items, headCells, plugins, children, ...rest } = props;

    useEffect(() => {
        plugins?.forEach((plugin) => {
            plugin.onInit?.(gridApi.current);
        });
    }, [plugins]);

    const memoStore = useRef(new MemoStore());
    const pluginMap = useMemo(() => getPluginMap(plugins), [...plugins ?? []]);
    
    const columns = useMemo((): Array<ColumnDef<any>> => {

		const visileHeadCells = headCells.filter((headCell) => headCell.visible ?? true);

        return pluginMap.gridColumns.reduce((acc: Array<ColumnDef<any>>, plugin: MosaicDataTableGridColumnsPlugin): Array<ColumnDef<any>> => {
            const cellContent = plugin.getColumns?.({ headCells: acc, memoStore: memoStore.current });
            return cellContent ?? [];
        }, visileHeadCells);

    }, [...pluginMap.gridColumns, headCells]);

    useEffect(() => {
        memoStore.current.clear();
    }, [items]);

    const gridApi = useRef<GridApi>({} as GridApi);
    gridApi.current.items = items;
    gridApi.current.columns = columns;
    gridApi.current.plugins = plugins || [];
    gridApi.current.pluginMap = pluginMap;
    gridApi.current.memoStore = memoStore.current;

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

        <MosaicDataTableRoot 
			{...rest}
			className={`MosaicDataTable-root ${rest.className || ''}`}
			>
     
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

const MosaicDataTable = memo(MosaicDataTableComponent);

export { MosaicDataTable };
