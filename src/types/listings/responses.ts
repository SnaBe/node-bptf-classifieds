export interface DeleteListingsResponse {

}

export interface DeleteListingResponse {
    
}

export interface GetListingResponse {

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

}

export interface DeleteAllListingsResponse {

}
