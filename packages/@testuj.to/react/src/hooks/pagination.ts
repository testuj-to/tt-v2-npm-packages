import { useCallback, useMemo, useState } from "react";
import {
    type Pagination,
    type PaginationOptions,
} from "@lib/types";

export const usePagination = (options: PaginationOptions = {}): Pagination => {
    const [offset, _setOffset] = useState(options.defaultOffset > 0 ? Math.floor(options.defaultOffset) : 0);
    const [limit, _setLimit] = useState(options.defaultLimit > 0 ? Math.ceil(options.defaultLimit) : 16);

    const setOffset = useCallback((offset: number) => {
        _setOffset(offset > 0 ? Math.floor(offset) : 0);
    }, []);

    const setLimit = useCallback((limit: number) => {
        _setLimit(currentLimit => (limit ? Math.ceil(limit) : currentLimit));
        _setOffset(0);
    }, []);

    const page = useMemo(() => {
        return Math.floor(offset / limit) + 1;
    }, [limit, offset]);

    const setPage = useCallback((page: number) => {
        setOffset(Math.ceil(page - 1) * limit);
    }, [limit]);

    const previousPage = useCallback(() => {
        setPage(page > 0 ? page - 1 : 0);
    }, [page]);

    const nextPage = useCallback(() => {
        setPage(page + 1);
    }, [page]);

    return {
        offset,
        limit,
        page,
        get searchParams() {
            return { offset, limit }
        },
        setOffset,
        setLimit,
        setPage,
        previousPage,
        nextPage,
    };
};
