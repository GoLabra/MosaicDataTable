import { ReactNode, useSyncExternalStore } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableGridColumnsPlugin, Listener } from "../types/table-types";
import { Box, Checkbox } from "@mui/material";

const sys_selection_column = {
    id: 'sys_selection',
    label: '',
    width: 46,
    pin: 'left'
};

export interface RowSelectionStore<T = any> {
	subscribeKey: (key: string, listener: Listener) => () => void;
	isOpen: (key: string) => boolean;
	open: (key: string) => void;
	close: (key: string) => void;
	toggle: (key: string) => void;
}
export function createRowSelectionStore<T>(): RowSelectionStore {

	const rowDetailStore = new Map<string, boolean>(); 
	const listenersByKey = new Map<string, Set<Listener>>();

	const notifyKey = (key: string) => {
		const ls = listenersByKey.get(key);
		if (!ls) {
			return;
		}
		ls.forEach((l) => l());
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
			return rowDetailStore.get(key) || false;
		  },
		  open(key: string) {
			const rowDetailState = rowDetailStore.get(key);
			if (rowDetailState) {
				return;
			}
			rowDetailStore.set(key, true);
			notifyKey(key);
		  },
		  close(key: string) {
			const rowDetailState = rowDetailStore.get(key);
			if (!rowDetailState) {
				return;
			}
			rowDetailStore.delete(key);
			notifyKey(key);
		  },
		  toggle(key: string) {
			const rowDetailState = rowDetailStore.get(key) ?? false;
			rowDetailStore.set(key, !rowDetailState);
			notifyKey(key);
		  }
	};

	return api;
}

function useRowSelection<T = any>(store: RowSelectionStore, key: string): boolean {
	return useSyncExternalStore(
	  (notify) => store.subscribeKey(key, notify),
	  () => store.isOpen(key),
	  () => false
	);
  }

export const RowSelectionPlugin = (props: {
    visible?: boolean,
    onGetRowId: (row: any) => string,
    onSelectOne: (id: any) => void,
    onDeselectOne: (id: any) => void,

	rowSelectionStore: RowSelectionStore,
}): MosaicDataTableGridColumnsPlugin & MosaicDataTableBodyCellContentRenderPlugin => {

    return {
        displayName: 'RowSelectionPlugin',
        scope: ['grid-columns', 'body-cell-content-render'] as const,
        getColumns: ({ headCells, memoStore }) => {

            const visible = props.visible ?? true;
            if (!visible) {
                return headCells;
            }

            return memoStore.memoFunction('sys_selection-columns', (headCells: Array<ColumnDef<any>>) => [
                sys_selection_column,
                ...headCells
            ])(headCells);
        },
        renderBodyCellContentColumnScope: 'sys_selection',
        renderBodyCellContent: ({ headcell, row, gridApi, children }) => {

            if (row && row['sys_extra_row']) {
                return children;
            }

            if (headcell.id == 'sys_selection') {
                const rowId = props.onGetRowId?.(row) ?? null;
				return (<RowCheckBox rowId={rowId} onSelectOne={props.onSelectOne} onDeselectOne={props.onDeselectOne} store={props.rowSelectionStore} />);
            }

            return children;
        }
    }
}


interface CheckboxProps {
	rowId: string;
	onSelectOne: (id: any) => void;
	onDeselectOne: (id: any) => void;
	store: RowSelectionStore
}
const RowCheckBox = (props: CheckboxProps) => {

	const checked = useRowSelection(props.store, props.rowId);

    return (<Box key={props.rowId} sx={{ textAlign: 'center' }}>
        <Checkbox
            checked={checked}
            onChange={(event: any) => {
                if (event.target.checked) {
					props.store.open(props.rowId);
                    props.onSelectOne?.(props.rowId);
                } else {
					props.store.close(props.rowId);
                    props.onDeselectOne?.(props.rowId);
                }
            }}
            sx={{
                padding: 1,
                margin: '0 3px'
            }}
            inputProps={{
                'aria-label': "Select row"
            }}
        />
    </Box>)
}