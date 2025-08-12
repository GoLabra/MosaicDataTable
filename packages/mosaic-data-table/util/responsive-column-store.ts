import { useCallback, useMemo, useSyncExternalStore } from "react";
import { createMediaQueryListManager, MatchesSnapshot } from "./createMediaQueryListManager";
import { Breakpoint, useTheme } from "@mui/material";
import { ColumnDef, Listener, PinProps } from "../types/table-types";

const DEFAULT_SNAPSHOT = Object.freeze(new Map<string, {}>());

export type MatchesSnapshotMap = Map<string, boolean>

export type RegisteredColumn = {
	id: string;
	width: number;
	pin: PinProps | PinProps["pin"];
	mediaQuery?: string;
	mediaAlias?: string;
}

export function responsiveColumnStore(initialQueries: string[] = []) {

	let pinnedColumns = new Map<string, RegisteredColumn>(); 
	let pinnedColumnsProps = new Map<string, {}>();
	let mediaAlias = new Map<string, string>();

	//const listeners = new Set<() => void>();
	const listenersByKey = new Map<string, Set<Listener>>();
	let snapshot: MatchesSnapshotMap = new Map<string, boolean>();

	
	const notifyAll = () => {
		for (const listeners of listenersByKey.values()) {
			listeners.forEach((l) => l());
		}
	};

	const notifyKey = (key: string) => {
		const listeners = listenersByKey.get(key);
		if (!listeners) {
			return;
		}
		listeners.forEach((l) => l());
	};

	const mgr = createMediaQueryListManager((snap) => {
		snapshot = getAliasSnapshot(snap);
		processProps(snapshot);
		notifyAll();
	}, initialQueries);

	const getAliasSnapshot = (snap: MatchesSnapshot) => {
		const snapshot = new Map<string, boolean>();
		for(const mediaKey of Object.keys(snap)){
			const media = snap[mediaKey];

			const alias = mediaAlias.get(mediaKey);
			if(!alias){
				continue;
			}
			snapshot.set(alias, media);
		}
		return snapshot;
	}

	const processProps = (snap: MatchesSnapshotMap) => {
		const newPinnedColumnsProps = new Map<string, {}>();
		const allColumns = Array.from(pinnedColumns.values());
		pinnedColumns.forEach((column, id) => {
			newPinnedColumnsProps.set(id, getColumnProps(column, allColumns, snap));
		});
		pinnedColumnsProps = newPinnedColumnsProps;
	}

	const subscribe = (key: string, listener: () => void) => {
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
		  
	};

	const getSnapshot = () => pinnedColumnsProps;

	const getSsrSnapshot = () => {
		processProps(snapshot);
		return pinnedColumnsProps;
	}

	const registerPinnedColumn = (column: RegisteredColumn, columnOrder: string[]) => {
		if (pinnedColumns.has(column.id)) {
			return;
		}

		pinnedColumns.set(column.id, column);
		updateColumnOrder(columnOrder);
		processProps(snapshot);
	}

    const registerForResponsiveChanges = (column: RegisteredColumn) => {
		
		

		if(column.mediaQuery){
			mediaAlias.set(column.mediaQuery, column.mediaAlias!);
			mgr.add(column.mediaQuery);
		}

		const snapshot = getAliasSnapshot(mgr.snapshot);
		processProps(snapshot);
		notifyKey(column.id);
    }

	const updateColumnOrder = (headCellsIds: string[]) => {

		if (pinnedColumns.size === 0 || headCellsIds.length === 0) {
			return;
		}

		const newOrderIds = headCellsIds.filter((id) => pinnedColumns.has(id));
		// const remainingIds: string[] = [];
		// pinnedColumns.forEach((_, id) => {
		// 	if (!headCellsIds.includes(id)) {
		// 		remainingIds.push(id);
		// 	}
		// });

		//const newOrderIds = [...orderedKnownIds, ...remainingIds];

		// Check if order actually changes
		const currentOrderIds = Array.from(pinnedColumns.keys());
		const isSameOrder =
			currentOrderIds.length === newOrderIds.length &&
			currentOrderIds.every((id, index) => id === newOrderIds[index]);

		if (isSameOrder) {
			return;
		}

		const reordered = new Map<string, RegisteredColumn>();
		for (const id of newOrderIds) {
			const col = pinnedColumns.get(id);
			if (col) {
				reordered.set(id, col);
			}
		}

		pinnedColumns = reordered;
	}

	return {
		subscribe,
		getSnapshot,
		getSsrSnapshot,
		// add,
		registerPinnedColumn,
		registerForResponsiveChanges,
		updateColumnOrder,
		remove: mgr.remove,
		clear: mgr.clear,
		list: mgr.list,
		dispose: mgr.dispose,
	};
}


export const getColumnProps = (headCell: RegisteredColumn, headCells: RegisteredColumn[], snapshot: MatchesSnapshotMap) => {

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

export const isResponsivePin = (pin?: PinProps | PinProps["pin"]): pin is PinProps => {
	return pin != null && typeof pin === 'object' && 'responsiveBreakpoint' in pin;
}

export const getPinnedStatus = (snapshot: MatchesSnapshotMap, pin?: PinProps | PinProps["pin"]): 'left' | 'right' | boolean | undefined => {
	if(pin == null) {
		return undefined;
	}

	if(typeof pin === 'boolean' ||
		typeof pin === 'string'
	) {
		return pin;
	}

	const isPinned = snapshot.get(pin.responsiveBreakpoint);
	if(isPinned){
		return pin.pin;
	}

	return undefined;
}

export function useMediaQueryStore(store: ReturnType<typeof responsiveColumnStore>, column: ColumnDef<any>, columnOrder: string[]) {

	const breakpoints = useTheme().breakpoints;
	
	const responsivePin = useMemo(() => {
		if (
			column.pin &&
			typeof column.pin === 'object' &&
			'responsiveBreakpoint' in column.pin
		) {
			const breakpoint = column.pin.responsiveBreakpoint as Required<PinProps>["responsiveBreakpoint"];
			const direction = column.pin.direction;
			return {
				breakpoint,
				direction: direction ?? 'down'
			};
		}
		return undefined;
	}, [column]);

	const registeredColumn = useMemo(() => {
		const media = responsivePin ? breakpoints[responsivePin.direction](responsivePin.breakpoint) : undefined;
		return {
			id: column.id,
			width: column.width!,
			pin: column.pin!,
			mediaQuery: media,
			mediaAlias: responsivePin?.breakpoint
		};
	}, [column, responsivePin]);

	store.registerPinnedColumn(registeredColumn, columnOrder);

	const snapshot = useSyncExternalStore(
		(notify) => store.subscribe(column.id, notify),
		() => store.getSnapshot().get(column.id),
		() => store.getSnapshot().get(column.id)
	);

	const registerForResponsiveChanges = useCallback(() => {
		store.registerForResponsiveChanges(registeredColumn);
	}, [registeredColumn]);

	return useMemo(()=> ({
		registerForResponsiveChanges,
		props: snapshot,
	}), [registerForResponsiveChanges, snapshot]);
}