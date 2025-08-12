import { Breakpoint } from "@mui/material";

export type MatchesSnapshot = Record<string, boolean>;

export function createMediaQueryListManager(
	onChange: (snapshot: MatchesSnapshot) => void,
	initialQueries: string[] = []
) {
	if (typeof window === 'undefined' || !window.matchMedia) {
		return {
			add: (_q: string) => false,
			remove: (_q: string) => false,
			clear: () => { },
			list: () => [] as string[],
			snapshot: {},
			dispose: () => { }
		};
	}

    const normalize = (q: string) => {
        const trimmed = q.trim();
        return trimmed.replace(/^@media\s*/i, '');
    };
	const mqlByQuery = new Map<string, MediaQueryList>();
	const handlerByQuery = new Map<string, (e?: MediaQueryListEvent) => void>();
	const snapshot: MatchesSnapshot = {};

	const notify = (changed?: string[]) => {
		onChange({...snapshot});
	};

	const attach = (query: string): boolean => {
		if (mqlByQuery.has(query)) {
			return false;
		}
		
		const q = normalize(query);

		const mql = window.matchMedia(q);
		mqlByQuery.set(query, mql);
		snapshot[query] = mql.matches;

		const handler = (_e?: MediaQueryListEvent) => {
			snapshot[query] = _e?.matches ?? false;
			notify([q])
		};

		// Cross-browser listener API
		if (typeof mql.addEventListener === 'function') {
			mql.addEventListener('change', handler);
		} else {
			// @ts-ignore legacy
			mql.addListener(handler);
		}

		handlerByQuery.set(query, handler);
		return true;
	};

	const detach = (query: string): boolean => {
		
		const mql = mqlByQuery.get(query);
		const handler = handlerByQuery.get(query);
		if (!mql || !handler) {
			return false;
		}

		if (typeof mql.removeEventListener === 'function') {
			mql.removeEventListener('change', handler);
		} else {
			// @ts-ignore legacy
			mql.removeListener(handler);
		}
		mqlByQuery.delete(query);
		handlerByQuery.delete(query);
		return true;
	};

	// API
	const add = (q: string) => {
		if(!attach(q)){
			return false;
		}
		//notify();
		return true;
	};
	const remove = (query: string) => detach(query);
	const clear = () => { for (const q of [...mqlByQuery.keys()]) detach(q); };
	const list = () => [...mqlByQuery.keys()];
	const dispose = () => clear();

	// emit initial state
	//notify();

	return { add, snapshot, remove, clear, list, dispose };
}