
import {
    type BarePagination,
} from '@lib/types'

import {
    type RequestOptions,
} from './types'

export const resolveRequestUrl = (path: string, searchParams = new URLSearchParams()): string => {
    let url = path

    const search = searchParams?.toString?.()
    if (search) {
        url = `${url}?${search}`
    }

    return url
}

export const resolveRequestOptions = ({ headers, signal }: RequestOptions = {}): RequestOptions => {
    return { headers, signal }
}

export const parsePaginationParams = (pagination: BarePagination): Record<string, string> => {
    const searchParams: Record<string, string> = {}

    if (typeof pagination?.offset === 'number') {
        searchParams.offset = String(pagination?.offset)
    }

    if (typeof pagination?.limit === 'number') {
        searchParams.limit = String(pagination?.limit)
    }

    return searchParams
}
