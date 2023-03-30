// Import the unique type for creating listings
import { CreatableListing } from './common'

/** Import the necessary Classifieds response types */
import {
    SearchResponse,
    GetListingResponse,
    GetListingsResponse,
    GetUserLimitsResponse,
    GetMyListingsResponse,
    CreateListingResponse,
    DeleteListingResponse,
    DeleteListingsResponse,
    CreateListingsResponse,
    GetUserListingsResponse,
    DeleteAllListingsResponse,
} from './responses'

export interface DeleteListingsParameters {
    ids?: Array<string>,
    callback?: (error: Error | null, response: DeleteListingsResponse | null) => void
}

export interface DeleteListingParameters {
    id?: string,
    callback?: (error: Error | null, response: DeleteListingResponse | null) => void
}

export interface GetListingParameters {
    id?: string,
    callback?: (error: Error | null, response: GetListingResponse | null) => void
}

export interface GetUserListingsParameters {
    skip?: number,
    limit?: number,
    callback?: (error: Error | null, response: GetUserListingsResponse | null) => void
}

export interface CreateListingParameters {
    listing?: CreatableListing | null,
    callback?: (error: Error | null, response: CreateListingResponse | null) => void
}

export interface DeleteAllListingsParameters {
    callback?: (error: Error | null, response: DeleteAllListingsResponse | null) => void
}

export interface GetMyListingsParameters {
    inactive?: 0 | 1,
    callback?: (error: Error | null, response: GetMyListingsResponse | null) => void
}

export interface GetListingsParameters {
    appid?: number,
    sku?: string,
    callback?: (error: Error | null, response: GetListingsResponse | null) => void
}

export interface CreateListingsParameters {
    listings?: Array<CreatableListing>,
    callback?: (error: Error | null, response: CreateListingsResponse | null) => void
}

export interface SearchParameters {
    intent?: 'sell' | 'buy' | 'dual',
    page_size?: number,
    fold?: 0 | 1,
    item?: string,
    steamid?: string,
    callback?: (error: Error | null, response: SearchResponse | null) => void
}

export interface GetUserLimitsParameters {
    callback?: (error: Error | null, response: GetUserLimitsResponse | null) => void
}
