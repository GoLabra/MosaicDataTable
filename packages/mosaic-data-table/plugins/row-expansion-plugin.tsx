import { PropsWithChildren, ReactNode, useCallback, useMemo, useState } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableBodyRowRenderPlugin, MosaicDataTableGridColumnsPlugin } from "../types/table-types";
import { Box, Button, Checkbox, IconButton, TableBodyProps, TableCell, TableRow, TableRowProps } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { MosaicDataTableCellRoot, MosaicDataTableRowRoot } from "../style";

export const useRowExpansionStore = () => {
    const [expansionState, setExpansionState] = useState<Record<string, {isOpen: boolean;params: any;}>>({});

    const isExpanded = useCallback((rowId: string): boolean => {

        const value = expansionState[rowId];
        return value?.isOpen ?? false;

    }, [expansionState]);

    const getExpansionInfo = useCallback((rowId: string): {isOpen: boolean;params: any;} => {
        const value = expansionState[rowId] ?? {isOpen: false, params: null};
        return value;
    }, [expansionState]);

    const expand = useCallback((rowId: string) => {
        setExpansionState((prevState) => {
            return {
                ...prevState,
                [rowId]: {
                    ...prevState[rowId],
                    isOpen: true
                }
            };
        });
    }, [setExpansionState]);

    const collapse = useCallback((rowId: string) => {
        setExpansionState((prevState) => {
            return {
                ...prevState,
                [rowId]: {
                    ...prevState[rowId],
                    isOpen: false
                }
            }
        });
    }, [setExpansionState]);

    const toggle = useCallback((rowId: string) => {
        setExpansionState((prevState) => {
            return {
                ...prevState,
                [rowId]: {
                    ...prevState[rowId],
                    isOpen: !(prevState[rowId]?.isOpen ?? false)
                }
            }
        });
    }, [setExpansionState]);

    const setParams = useCallback(({rowId, params, openImmediately = true}:{rowId: string, params: any, openImmediately?: boolean}) => {
        setExpansionState((prevState) => {
            return {
                ...prevState,
                [rowId]: {
                    ...prevState[rowId],
                    isOpen: openImmediately ?? prevState[rowId]?.isOpen ?? false,
                    params: {
                        ...prevState[rowId]?.params,
                        ...params
                    }
                }
            }
        });
    }, [setExpansionState]);

    const clear = useCallback((id?: any) => {
        if(!id){
            setExpansionState({});
            return;
        }

        setExpansionState((prevState) => {
            return {
                ...prevState,
                [id]: null
            }
        });

    }, [setExpansionState]);

    return useMemo(() => ({
        expansionState,
        isExpanded,
        getExpansionInfo,
        expand,
        collapse,
        toggle,
        setParams,
        clear
    }), [expansionState, isExpanded, expand, collapse, toggle, setParams, clear]);
}

export const RowExpansionPlugin = (props: {
    showExpanderButton?: boolean,
    onGetRowId: (row: any) => string,
    expanstionStore: ReturnType<typeof useRowExpansionStore>,
    getExpansionNode: (row: any, params: any) => ReactNode
}): MosaicDataTableGridColumnsPlugin & MosaicDataTableBodyCellContentRenderPlugin & MosaicDataTableBodyRowRenderPlugin => {

    return {
        scope: ['grid-columns', 'body-cell-content-render', 'body-row-render'] as const,
        getColumns: (headCells: Array<ColumnDef<any>>) => {

            if((props.showExpanderButton ?? true) == false){
                return headCells
            }

            return [
                {
                    id: 'sys_expansion',
                    label: '',
                    width: 40,
                    pin: 'left'
                },
                ...headCells
            ];
        },
        renderBodyCellContent: (headCell: ColumnDef<any>, row: any, gridApi: GridApi, children?: ReactNode) => {

            if(row && row['sys_extra_row']){
                return children;
            }

            if (headCell.id == 'sys_expansion') {

                const rowId = props.onGetRowId?.(row) ?? null;
                const isOpen = props.expanstionStore.isExpanded(rowId);

                return (
                    <Box sx={{ textAlign: 'center' }}>

                        <IconButton
                            onClick={() => props.expanstionStore.toggle(rowId)}
                            size="medium"
                            sx={{ m: 0 }}
                            aria-label="Actions"
                            aria-haspopup="menu"
                            id={`user-menu-btn`}
                        >
                            {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}

                        </IconButton>
                    </Box>)
            }

            return children;
        },
        renderBodyRow: (row: any, gridApi: GridApi, rowProps: TableRowProps, sx: any, children?: ReactNode) => {
            const rowId = props.onGetRowId?.(row) ?? null;
            const expansionInfo = props.expanstionStore.getExpansionInfo(rowId);

            return <>
                <MosaicDataTableRowRoot key={rowId} hover tabIndex={-1} sx={sx} {...rowProps}>{children}</MosaicDataTableRowRoot>

                {expansionInfo?.isOpen && <MosaicDataTableRowRoot key={`${rowId}-expansion`} tabIndex={-1}>
                    <MosaicDataTableCellRoot colSpan={100}>
                        {props.getExpansionNode(row, expansionInfo.params)}
                    </MosaicDataTableCellRoot>
                </MosaicDataTableRowRoot>}
            </>
        }
    }
}