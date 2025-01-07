import { useCallback, useMemo } from "react";
import { ContentManagerStoreState } from "../types/types";

export const useContentManagerIds = (storeState: ContentManagerStoreState): {storeIds: [], getId: (row: any) => string} => {
    const storeIds = useMemo(() => {
            if (!storeState.data) {
                return [];
            }
            
            return storeState.data.map((data: any) => data.id);
        }, [storeState]);

    const getId = useCallback((row: any) => {
        return row?.id;
    }, []);

    return {
        storeIds,
        getId
    }
};

