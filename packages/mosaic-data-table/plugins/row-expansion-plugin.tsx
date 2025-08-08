import { PropsWithChildren, ReactNode, useCallback, useMemo, useState } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableBodyRowRenderPlugin, MosaicDataTableGridColumnsPlugin } from "../types/table-types";
import { Box, Button, Checkbox, IconButton, TableBodyProps, TableCell, TableRow, TableRowProps } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { MosaicDataTableCellRoot, MosaicDataTableRowRoot } from "../style";

type ExpansionState<T> = {
    isOpen: boolean;
    params: T;
};

export const useRowExpansionStore = <T = any>() => {
    const [expansionState, setExpansionState] = useState<Record<string, ExpansionState<T>>>({});

    const isExpanded = useCallback((rowId: string): boolean => {

        const value = expansionState[rowId];
        return value?.isOpen ?? false;

    }, [expansionState]);

    const getExpansionInfo = useCallback((rowId: string): { isOpen: boolean; params: T; } => {
        const value = expansionState[rowId] ?? { isOpen: false, params: null };
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

    const setParams = useCallback(({ rowId, params, openImmediately = true }: { rowId: string, params: Partial<T>, openImmediately?: boolean }) => {
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
        if (!id) {
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

const sys_expansion = {
    id: 'sys_expansion',
    label: '',
    width: 46,
    pin: 'left'
};

export const RowExpansionPlugin = (props: {
    showExpanderButton?: boolean,
    onGetRowId: (row: any) => string,
    expanstionStore: ReturnType<typeof useRowExpansionStore>,
    getExpansionNode: (row: any, params: any) => ReactNode
}): MosaicDataTableGridColumnsPlugin & MosaicDataTableBodyCellContentRenderPlugin & MosaicDataTableBodyRowRenderPlugin => {

    return {
        displayName: 'RowExpansionPlugin',
        scope: ['grid-columns', 'body-cell-content-render', 'body-row-render'] as const,
        getColumns: ({ headCells, memoStore }) => {

            if ((props.showExpanderButton ?? true) == false) {
                return headCells
            }

            return memoStore.memoFunction('expansion-columns', (headCells: Array<ColumnDef<any>>) => [
                sys_expansion,
                ...headCells
            ])(headCells);
        },
        renderBodyCellContentColumnScope: 'sys_expansion',
        renderBodyCellContent: ({ headcell, row, rowId, gridApi, children }) => {

            if (row && row['sys_extra_row']) {
                return children;
            }

            if (headcell.id == 'sys_expansion') {

                const rowId = props.onGetRowId?.(row) ?? null;
                const isOpen = props.expanstionStore.isExpanded(rowId);

                return gridApi.memoStore.memoFunction(`expansion-button-${rowId}`, ExpandButton)(rowId, isOpen, props.expanstionStore.toggle);
            }

            return children;
        },
        renderBodyRow: ({ row, gridApi, props: rowProps, sx, children }) => {
            const rowId = props.onGetRowId?.(row) ?? null;
            const expansionInfo = props.expanstionStore.getExpansionInfo(rowId);

            return gridApi.memoStore.memoFunction(`expansion-row-${rowId}`, Expander)(row, rowId, children, sx, rowProps, expansionInfo, props.getExpansionNode);
        }
    }
}

const Expander = (row: any, rowId: string, children: ReactNode, sx: SxProps<Theme>, rowProps: TableRowProps, expansionInfo: { isOpen: boolean, params: any }, getExpansionNode: (row: any, params: any) => ReactNode) => {
    
    return (
        <>
            <MosaicDataTableRowRoot key={rowId} hover tabIndex={-1} sx={sx} {...rowProps}>{children}</MosaicDataTableRowRoot>

            {expansionInfo?.isOpen && <MosaicDataTableRowRoot key={`${rowId}-expansion`} tabIndex={-1}>
                <MosaicDataTableCellRoot colSpan={100}>
                    {getExpansionNode(row, expansionInfo.params)}
                </MosaicDataTableCellRoot>
            </MosaicDataTableRowRoot>}
        </>
    )
}

const ExpandButton = (rowId: string, isOpen: boolean, toggle: (rowId: string) => void) => {
    return (<Box sx={{ textAlign: 'center' }}>

        <IconButton
            onClick={() => toggle(rowId)}
            size="medium"
            sx={{ m: '0 3px' }}
            aria-label="Actions"
            aria-haspopup="menu"
            id={`user-menu-btn`}
        >
            {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}

        </IconButton>
    </Box>);
}