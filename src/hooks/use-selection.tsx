import { useCallback, useEffect, useState } from 'react';

export interface Selection<T> {
    handleDeselectAll: () => void;
    handleDeselectOne: (item: T) => void;
    handleSelectOne: (item: T) => void;
    selected: T[];
}
export const useSelection = <T,>(): Selection<T> => {
    const [selected, setSelected] = useState<T[]>([]);


    const handleSelectOne = useCallback((item: T): void => {
        setSelected((prevState) => [...prevState, item]);
    }, [setSelected]);

    const handleDeselectAll = useCallback(() => {
        setSelected([]);
    }, [setSelected]);

    const handleDeselectOne = useCallback((item: T): void => {
        setSelected((prevState) => {
            return prevState.filter((_item) => _item !== item);
        });
    }, [setSelected]);

    return {
        handleDeselectAll,
        handleDeselectOne,
        handleSelectOne,
        selected
    };
};
