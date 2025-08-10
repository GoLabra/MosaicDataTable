import { Breakpoint } from "@mui/material";

type MatchesSnapshot = Record<string, boolean>;

export function createMediaQueryListManager(
	onChange: (snapshot: MatchesSnapshot) => void,
	initialQueries: string[] = []
) {
	if (typeof window === 'undefined' || !window.matchMedia) {
		return {
			add: (_alias: Breakpoint | number, _q: string) => false,
			remove: (_q: Breakpoint | number) => false,
			clear: () => { },
			list: () => [] as (Breakpoint | number)[],
			snapshot: {},
			dispose: () => { }
		};
	}

    const normalize = (q: string) => {
        const trimmed = q.trim();
        return trimmed.replace(/^@media\s*/i, '');
    };
	const mqlByQuery = new Map<Breakpoint | number, MediaQueryList>();
	const handlerByQuery = new Map<Breakpoint | number, (e?: MediaQueryListEvent) => void>();
	const snapshot: MatchesSnapshot = {};

	const notify = (changed?: string[]) => {
		onChange({...snapshot});
	};

	const attach = (alias: Breakpoint | number, query: string): boolean => {
		const q = normalize(query);
		if (mqlByQuery.has(alias)) {
			return false;
		}

		const mql = window.matchMedia(q);
		mqlByQuery.set(alias, mql);
		snapshot[alias] = mql.matches;

		const handler = (_e?: MediaQueryListEvent) => {
			snapshot[alias] = _e?.matches ?? false;
			notify([q])
		};

		// Cross-browser listener API
		if (typeof mql.addEventListener === 'function') {
			mql.addEventListener('change', handler);
		} else {
			// @ts-ignore legacy
			mql.addListener(handler);
		}

		handlerByQuery.set(alias, handler);
		return true;
	};

	const detach = (alias: Breakpoint | number): boolean => {
		
		const mql = mqlByQuery.get(alias);
		const handler = handlerByQuery.get(alias);
		if (!mql || !handler) {
			return false;
		}

		if (typeof mql.removeEventListener === 'function') {
			mql.removeEventListener('change', handler);
		} else {
			// @ts-ignore legacy
			mql.removeListener(handler);
		}
		mqlByQuery.delete(alias);
		handlerByQuery.delete(alias);
		return true;
	};

	// API
	const add = (alias: Breakpoint | number, q: string) => {
		if(!attach(alias, q)){
			return false;
		}
		notify();
		return true;
	};
	const remove = (alias: Breakpoint | number) => detach(alias);
	const clear = () => { for (const q of [...mqlByQuery.keys()]) detach(q); };
	const list = () => [...mqlByQuery.keys()];
	const dispose = () => clear();

	// emit initial state
	//notify();

	return { add, snapshot, remove, clear, list, dispose };
}