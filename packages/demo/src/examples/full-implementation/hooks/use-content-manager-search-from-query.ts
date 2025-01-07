
import { useCallback, useMemo } from "react";
import { useQueryState, parseAsInteger, parseAsString, parseAsJson } from 'nuqs';
import { Order } from "mosaic-data-table";
import { ContentManagerSearchState } from "../types/types";
import { initialize } from "next/dist/server/lib/render-server";


interface UseContentManagerSearchFromQueryParams {
    initialSortBy: string;
    initialOrder: Order;
    initialRowsPerPage: number;
}
export const useContentManagerSearchFromQuery = (props: UseContentManagerSearchFromQueryParams) => {

    const [page, setPage] = useQueryState('p', parseAsInteger.withDefault(1))
    const [rowsPerPage, setRowsPerPage] = useQueryState('rpp', parseAsInteger.withDefault(props.initialRowsPerPage))
    const [sortBy, setSortBy] = useQueryState('s', parseAsString.withDefault(props.initialSortBy))
    const [order, setOrderBy] = useQueryState('o', parseAsString.withDefault(props.initialOrder))


    const handlePageChange = useCallback((value: number): void => {
        setPage(value);
    }, [setPage]);

    const handleRowsPerPageChange = useCallback((value: number): void => {
        setRowsPerPage(value);
        setPage(1);
    }, [setRowsPerPage, setPage]);

    const handleSortChange = useCallback((sortBy: string, order: Order): void => {
        setSortBy(sortBy);
        setOrderBy(order);
    }, [setSortBy, setOrderBy]);


    const searchState: ContentManagerSearchState = useMemo(() => ({
        page,
        rowsPerPage,
        sortBy,
        order: order as Order,
    }), [page, rowsPerPage, sortBy, order]);

    return useMemo(() => ({
        handlePageChange,
        handleRowsPerPageChange,
        handleSortChange,
        state: searchState
    }), [ handlePageChange, handleRowsPerPageChange, handleSortChange, searchState]);
};