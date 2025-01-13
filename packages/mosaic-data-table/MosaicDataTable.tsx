import { GlobalStyles, Table, TableBody, TableContainer } from "@mui/material";
import { PropsWithChildren, useCallback, useEffect, useMemo } from "react";
import { MosaicDataTableHeadCore } from "./MosaicDataTableHeadCore";
import { GridApi, ColumnDef, MosaicDataTableBodyRenderPlugin, MosaicDataTableGridColumnsPlugin, MosaicDataTableProps } from "./types/table-types";
import { MosaicDataTableBodyCore } from "./MosaicDataTableBodyCore";
import { MosaicDataTableRoot } from "./style";
import { filterGridPlugins } from "./util/filterGridPlugins";

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

    }, [bodyCellRenderPlugins, visileHeadCells]);


    const gridApi: GridApi = useMemo(() => ({
        getData: () => props.items,
        getColumns: () => columns,
        getPlugins: () => props.plugins || []
    }), [props.items,columns]);


    return (<>

        <GlobalStyles styles={{
            'html': {
                '--mui-palette-MosaicDataTable-background': 'var(--mui-palette-background-paper)',  
                '--mui-palette-MosaicDataTable-highlight': 'color-mix(in srgb, rgb(var(--mui-palette-primary-mainChannel)), transparent 70%)',
                '--mui-palette-MosaicDataTable-rowHover': 'color-mix(in srgb, rgb(var(--mui-palette-background-paperChannel)), var(--mui-palette-common-onBackground) 7%)',
            }
        }} />

        <MosaicDataTableRoot {...props.root}>
     
                <TableContainer>
               
                    <Table sx={{ height: '100%' }} aria-labelledby="tableTitle" size="medium">
                        <caption>{props.caption}</caption>
                     
                        <MosaicDataTableHeadCore
                            headCells={columns}
                            plugins={props.plugins}
                            gridApi={gridApi}
                        />

                        <MosaicDataTableBodyCore
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