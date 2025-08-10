import { PropsWithChildren, ReactNode, useCallback, useMemo, useState, useSyncExternalStore } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableBodyRowRenderPlugin, MosaicDataTableGridColumnsPlugin, Listener } from "../types/table-types";
import { Box, Button, Checkbox, IconButton, TableBodyProps, TableCell, TableRow, TableRowProps } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { MosaicDataTableCellRoot, MosaicDataTableRowRoot } from "../style";

type DetailState<T> = {
    isOpen: boolean;
    params: T;
};

const DEFAULT_EXPANSION_INFO: DetailState<any> = Object.freeze({ isOpen: false, params: null });

export interface RowDetailStore<T = any> {
	subscribeKey: (key: string, listener: Listener) => () => void;
	isOpen: (key: string) => boolean;
	open: (key: string) => void;
	close: (key: string) => void;
	toggle: (key: string) => void;
	setParams: (key: string, params: T, openImmediately?: boolean) => void;
	getExpansionInfo: (key: string) => DetailState<T>;
	clear: (key?: string) => void;
}

export function createRowDetailStore<T>(): RowDetailStore {

	const rowDetailStore = new Map<string, DetailState<T>>(); 
	const listenersByKey = new Map<string, Set<Listener>>();

	const notifyKey = (key: string) => {
		const listeners = listenersByKey.get(key);
		if (!listeners) {
			return;
		}
		listeners.forEach((l) => l());
	};

	const notifyAll = () => {
		for (const listeners of listenersByKey.values()) {
			listeners.forEach((l) => l());
		}
	};

	const api = {
		subscribeKey(key: string, listener: Listener) {
			let set = listenersByKey.get(key);
			if (!set) {
				set = new Set();
				listenersByKey.set(key, set);
			}
			set.add(listener);
			return () => {
			  const s = listenersByKey.get(key);
			  if (!s) {
				return;
			  }
			  s.delete(listener);
			  if (s.size === 0) {
				listenersByKey.delete(key);
			  }
			};
		  },
		  isOpen(key: string) {
			const rowDetailState = rowDetailStore.get(key)
			return rowDetailState && rowDetailState.isOpen || false;
		  },
		  open(key: string) {
			const rowDetailState = rowDetailStore.get(key);
			if (!rowDetailState) {
				return;
			}
			rowDetailStore.set(key, {
				...rowDetailState,
				isOpen: true
			});
			notifyKey(key);
		  },
		  close(key: string) {
			const rowDetailState = rowDetailStore.get(key);
			if (!rowDetailState) {
				return;
			}
			rowDetailStore.set(key, {
				...rowDetailState,
				isOpen: false
			});
			notifyKey(key);
		  },
		  toggle(key: string) {
			const rowDetailState = rowDetailStore.get(key) ?? DEFAULT_EXPANSION_INFO;
			rowDetailStore.set(key, {
				...rowDetailState,
				isOpen: !rowDetailState.isOpen
			});
			notifyKey(key);
		  },
		  setParams(key: string, params: Partial<T>, openImmediately = true) {
			const rowDetailState = rowDetailStore.get(key);
			rowDetailStore.set(key, {
				...rowDetailState,
				isOpen: openImmediately ?? (rowDetailState?.isOpen ?? false) ?? false,
				params: {
					...(rowDetailState?.params ?? {}) as T,
					...params
				}
			});
			notifyKey(key);
		  },
		  clear(key?: string){
			if(key){
				rowDetailStore.delete(key);
				notifyKey(key);
				return;
			}

			rowDetailStore.clear();
			notifyAll();
		  },
		  getExpansionInfo(key: string) {
			return rowDetailStore.get(key) ?? DEFAULT_EXPANSION_INFO;
		  }
	};

	return api;
}

export function useRowDetails<T = any>(store: RowDetailStore, key: string): DetailState<T> {
	return useSyncExternalStore(
	  (notify) => store.subscribeKey(key, notify),
	  () => store.getExpansionInfo(key),
	  () => DEFAULT_EXPANSION_INFO
	);
  }

const sys_expansion = {
    id: 'sys_expansion',
    label: '',
    width: 46,
    pin: 'left'
};

export const RowDetailPlugin = (props: { 
    showExpanderButton?: boolean,
    onGetRowId: (row: any) => string,
    rowDetailStore: RowDetailStore,
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
				return (<ExpandButton rowId={rowId} rowDetailStore={props.rowDetailStore} />);
            }

            return children;
        },
        renderBodyRow: ({ row, gridApi, props: rowProps, sx, children }) => {
            const rowId = props.onGetRowId?.(row) ?? null;
			return (<Expander row={row} rowId={rowId} children={children} sx={sx} rowProps={rowProps} rowDetailStore={props.rowDetailStore} getExpansionNode={props.getExpansionNode} />);
        }
    }
}

const Expander = (props: {row: any, rowId: string, children: ReactNode, sx: SxProps<Theme>, rowProps: TableRowProps, rowDetailStore: RowDetailStore, getExpansionNode: (row: any, params: any) => ReactNode}) => {
    
	const expansionInfo = useRowDetails(props.rowDetailStore, props.rowId);
	
    return (
        <>
            <MosaicDataTableRowRoot key={props.rowId} hover tabIndex={-1} sx={props.sx} {...props.rowProps}>{props.children}</MosaicDataTableRowRoot>

            {expansionInfo?.isOpen && <MosaicDataTableRowRoot key={`${props.rowId}-expansion`} tabIndex={-1}>
                <MosaicDataTableCellRoot colSpan={100}>
                    {props.getExpansionNode(props.row, expansionInfo.params)}
                </MosaicDataTableCellRoot>
            </MosaicDataTableRowRoot>}
        </>
    )
}

const ExpandButton = (props: {rowId: string, rowDetailStore: RowDetailStore}) => {

	const expansionInfo = useRowDetails(props.rowDetailStore, props.rowId);

    return (<Box sx={{ textAlign: 'center' }}>

        <IconButton
            onClick={() => props.rowDetailStore.toggle(props.rowId)}
            size="medium"
            sx={{ m: '0 3px' }}
            aria-label="Actions"
            aria-haspopup="menu"
            id={`user-menu-btn`}
        >
            {expansionInfo.isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}

        </IconButton>
    </Box>);
}