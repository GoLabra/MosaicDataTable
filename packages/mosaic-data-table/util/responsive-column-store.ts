import { useCallback, useMemo, useSyncExternalStore } from "react";
import { createMediaQueryListManager } from "./createMediaQueryListManager";
import { Breakpoint, useTheme } from "@mui/material";
import { ColumnDef, PinProps } from "../types/table-types";

const DEFAULT_SNAPSHOT = Object.freeze(new Map<ColumnDef<any>, {}>());

// Vanilla media query manager (deduped), store, and hook colocated in this file
export type MatchesSnapshot = Record<string, boolean>

export function responsiveColumnStore(initialQueries: string[] = []) {
	//let snapshot: MatchesSnapshot = DEFAULT_SNAPSHOT;

	let pinnedColumnsProps = new Map<ColumnDef<any>, {}>();
	const listeners = new Set<() => void>();

	const notifyAll = () => {
		for (const listener of listeners) {
			listener();
		}
	};

	const mgr = createMediaQueryListManager((snap) => {
		
		const newPinnedColumnsProps = new Map<ColumnDef<any>, {}>();
		const allColumns = Array.from(pinnedColumnsProps.keys());
		pinnedColumnsProps.forEach((_, column) => {
			newPinnedColumnsProps.set(column, getColumnProps(column, allColumns, snap));
		});
		pinnedColumnsProps = newPinnedColumnsProps;

		notifyAll();
	}, initialQueries);

	const subscribe = (listener: () => void) => {
		listeners.add(listener);
		return () => { listeners.delete(listener); };
	};

	const getSnapshot = () => pinnedColumnsProps;

    const registerPinnedColumn = (column: ColumnDef<any>) => {
		
		if (!pinnedColumnsProps.has(column)) {
			const allColumns = Array.from(pinnedColumnsProps.keys());
            pinnedColumnsProps.set(column, getColumnProps(column, [...allColumns, column], {}));  
        }
    }

	const add = (alias: Breakpoint | number, q: string): boolean => {
		return mgr.add(alias, q);
	}

	return {
		subscribe,
		getSnapshot,
		add,
		registerPinnedColumn,
		remove: mgr.remove,
		clear: mgr.clear,
		list: mgr.list,
		dispose: mgr.dispose,
	};
}


export const getColumnProps = (headCell: ColumnDef<any>, headCells: ColumnDef<any>[], snapshot: MatchesSnapshot) => {

	let leftOffset: number | undefined = undefined;
	let rightOffset: number | undefined = undefined;

	if (getPinnedStatus(snapshot, headCell.pin) === 'left' ||
		getPinnedStatus(snapshot, headCell.pin) === true) {

		const leftPins = headCells
			.filter(i => {
				const pin = getPinnedStatus(snapshot, i.pin);
				return pin === 'left' || pin === true
			});

		const beforePins = leftPins.slice(0, leftPins.findIndex(col => col.id === headCell.id));

		leftOffset = beforePins.reduce((acc, col) => acc + col.width!, 0);
	}

	if (getPinnedStatus(snapshot, headCell.pin) === 'right' ||
		getPinnedStatus(snapshot, headCell.pin) === true) {
		const rightPins = headCells
			.filter(i => {
				const pin = getPinnedStatus(snapshot, i.pin);
				return pin === 'right' || pin === true
			});

		const beforePins = rightPins.slice(rightPins.findIndex(col => col.id === headCell.id) + 1)
			.reverse();

		rightOffset = beforePins.reduce((acc, col) => acc + col.width!, 0);
	}

	const pinProps = (leftOffset != null || rightOffset != null) ? {
		position: 'sticky',
		zIndex: 1,
		left: leftOffset,
		right: rightOffset,
	} : {} as any;

	return pinProps;
}


export const getPinnedStatus = (snapshot: MatchesSnapshot, pin?: PinProps | PinProps["pin"]): 'left' | 'right' | boolean | undefined => {
	if(pin == null) {
		return undefined;
	}

	if(typeof pin === 'boolean' ||
		typeof pin === 'string'
	) {
		return pin;
	}

	const isPinned = snapshot[pin.responsiveBreakpoint];
	if(isPinned){
		return pin.pin;
	}

	return undefined;
}

export function useMediaQueryStore(store: ReturnType<typeof responsiveColumnStore>) {

	const breakpoints = useTheme().breakpoints;
	
	const snapshot = useSyncExternalStore(
		(notify) => store.subscribe(notify),
		() => store.getSnapshot(),
		() => DEFAULT_SNAPSHOT
	);

	const add = useCallback((breakpoint: Required<PinProps["responsiveBreakpoint"]>, direction: PinProps["direction"]) => { 
		const query = breakpoints[direction ?? 'down'](breakpoint);
		store.add(breakpoint, query);
	}, [store.add]);

	return useMemo(()=> ({
		snapshot: snapshot,
		add
	}), [snapshot]);
}