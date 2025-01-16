
export interface ContentManagerStoreState {
    data: any
    dataLoading: boolean;    
    pagesCount: number;
    totalItems: number;
}

export interface ContentManagerSearchState {
    page: number;
    rowsPerPage: number;
    sortBy: string | null;
    order: Order;
    filter: Filter;
}
