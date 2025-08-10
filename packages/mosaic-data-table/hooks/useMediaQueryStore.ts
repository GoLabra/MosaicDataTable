import { useSyncExternalStore } from 'react';
import { MediaQueryStore, MediaQueryStoreSnapshot } from '../util/createMediaQueryStore';

const DEFAULT_SNAPSHOT: MediaQueryStoreSnapshot = Object.freeze({ matchesByQuery: {} });

export function useMediaQueryStore(store: MediaQueryStore): MediaQueryStoreSnapshot {
  return useSyncExternalStore(
    (notify) => store.subscribe(notify),
    () => store.getSnapshot(),
    () => DEFAULT_SNAPSHOT
  );
}


