import { GlobalStyles, Table, TableBody, TableContainer, TableProps } from "@mui/material";
import { PropsWithChildren, useCallback, useEffect, useMemo, useRef } from "react";
import { MosaicDataTableHead } from "./MosaicDataTableHead";
import { GridApi, ColumnDef, MosaicDataTableBodyRenderPlugin, MosaicDataTableGridColumnsPlugin, MosaicDataTableProps, MosaicDataTablePropsPlugin } from "./types/table-types";
import { MosaicDataTableBody } from "./MosaicDataTableBody";
import { MosaicDataTableRoot } from "./style";
import { filterGridPlugins } from "./util/filterGridPlugins";
import { MemoStore } from "./util/MemoStore";

export const MosaicDataTable = <T extends any,>(props: PropsWithChildren<MosaicDataTableProps<T>>) => {

    useEffect(() => {
        props.plugins?.forEach((plugin) => {
            plugin.onInit?.(gridApi);
        });
    }, [props.plugins]);

    const visileHeadCells = useMemo((): Array<ColumnDef<any>> => {
        return props.headCells.filter((headCell) => headCell.visible ?? true);
    }, [props.headCells]);

    // grid-columns
    const bodyCellRenderPlugins = useMemo((): MosaicDataTableGridColumnsPlugin[] => {
        return filterGridPlugins<MosaicDataTableGridColumnsPlugin>(props.plugins, 'grid-columns');
    }, [props.plugins]);

    const columns = useMemo((): Array<ColumnDef<any>> => {
        return bodyCellRenderPlugins.reduce((acc: Array<ColumnDef<any>>, plugin: MosaicDataTableGridColumnsPlugin): Array<ColumnDef<any>> => {
            const cellContent = plugin.getColumns?.(acc);
            return cellContent ?? [];
        }, visileHeadCells);

    }, [...bodyCellRenderPlugins, visileHeadCells]);

    const memoStore = useRef(new MemoStore());

    useEffect(() => {
        memoStore.current.clear();
    }, [props.items]);

    const gridApi: GridApi = useMemo(() => ({
        items: props.items,
        columns: columns,
        plugins: props.plugins || [],
        memoStore: memoStore.current
    }), [props.items, columns, memoStore, ...props.plugins ??[]]);

    // props
    const tablePropsPlugins = useMemo((): MosaicDataTablePropsPlugin[] => {
        return filterGridPlugins<MosaicDataTablePropsPlugin>(props.plugins, 'table-props');
    }, [props.plugins]);

    const tableProps = useMemo(() => {

        return tablePropsPlugins.reduce((acc: TableProps, plugin: MosaicDataTablePropsPlugin) => {
            const tableProps = plugin.getTableProps(gridApi);
            return {
                ...acc,
                ...tableProps
            }
        }, {});

    }, [...tablePropsPlugins]);

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
                            plugins={props.plugins}
                            gridApi={gridApi}
                        />

                        <MosaicDataTableBody
                            columns={columns}
                            plugins={props.plugins}
                            gridApi={gridApi}
                            items={props.items}
                        />
                        
                    </Table>
                </TableContainer>

        </MosaicDataTableRoot>
        </>
    )
}