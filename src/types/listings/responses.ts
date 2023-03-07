export interface DeleteListingsResponse {
    deleted: number,
    skipped: Array<any>,
    errors: Array<any>
}

export interface DeleteListingResponse {
    message: string
}

export interface GetListingResponse {
    message: string
}

export interface GetUserListingsResponse {
    results: Array<any>,
    cursor: {
        skip: number,
        limit: number,
        total: number,
        _info: string | null
    }
}

export interface CreateListingResponse {
    message: string
}

export interface DeleteAllListingsResponse {
    message: string
}