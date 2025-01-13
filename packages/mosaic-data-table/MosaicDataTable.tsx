import { GlobalStyles, Table, TableBody, TableContainer } from "@mui/material";
import { PropsWithChildren, useCallback, useEffect, useMemo } from "react";
import { MosaicDataTableHeadCore } from "./MosaicDataTableHeadCore";
import { GridApi, HeadCell, MosaicDataTableBodyRenderPlugin, MosaicDataTableGridColumnsPlugin, MosaicDataTableProps } from "./types/table-types";
import { MosaicDataTableBodyCore } from "./MosaicDataTableBodyCore";
import { MosaicDataTableRoot } from "./style";
import { filterGridPlugins } from "./util/filterGridPlugins";

export const MosaicDataTable = <T extends any,>(props: PropsWithChildren<MosaicDataTableProps<T>>) => {

    useEffect(() => {
        props.plugins?.forEach((plugin) => {
            plugin.onInit?.(gridApi);
        });
    }, [props.plugins]);

    const visileHeadCells = useMemo((): Array<HeadCell<any>> => {
        return props.headCells.filter((headCell) => headCell.visible ?? true);
    }, [props.headCells]);

    // grid-columns
    const bodyCellRenderPlugins = useMemo((): MosaicDataTableGridColumnsPlugin[] => {
        return filterGridPlugins<MosaicDataTableGridColumnsPlugin>(props.plugins, 'grid-columns');
    }, [props.plugins]);

    const columns = useMemo((): Array<HeadCell<any>> => {
        return bodyCellRenderPlugins.reduce((acc: Array<HeadCell<any>>, plugin: MosaicDataTableGridColumnsPlugin): Array<HeadCell<any>> => {
            const cellContent = plugin.getColumns?.(acc);
            return cellContent ?? [];
        }, visileHeadCells);

    }, [bodyCellRenderPlugins, visileHeadCells]);


    const gridApi: GridApi = useMemo(() => ({
        getData: () => props.items,
        getColumns: () => columns
    }), [props.items,columns]);

    
    // body-render
    const bodyRenderPlugins = useMemo((): MosaicDataTableBodyRenderPlugin[] => {
        return filterGridPlugins<MosaicDataTableBodyRenderPlugin>(props.plugins, 'body-render');
    }, [props.plugins]);

    const getTableBody = useCallback((params: { children?: React.ReactNode }) => {
        for (const plugin of bodyRenderPlugins) {
            var cell = plugin.renderBody?.(columns, props.items, gridApi, params.children);
            if (cell) {
                return cell;
            }
        }

        return (<TableBody>{params.children}</TableBody>);
    }, [bodyRenderPlugins]);

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

                        {
                            getTableBody({
                                children: <>
                                    {(props.items ?? []).map((row) => (
                                        <MosaicDataTableBodyCore
                                            key={JSON.stringify(row)}
                                            row={row}
                                            headCells={columns}
                                            plugins={props.plugins}
                                            gridApi={gridApi}
                                        />
                                    ))}
                                </>
                            })
                        }

                    </Table>
                </TableContainer>

        </MosaicDataTableRoot>
        </>
    )
}