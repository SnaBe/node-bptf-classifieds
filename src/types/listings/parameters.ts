import { 
    DeleteListingsResponse,
    DeleteListingResponse,
    GetListingResponse,
    GetUserListingsResponse,
    CreateListingResponse,
    DeleteAllListingsResponse
} from "./responses";

export interface DeleteListingsParameters {
    callback?: (error: Error | null, response: DeleteListingsResponse | null) => void
}

export interface DeleteListingParameters {
    callback?: (error: Error | null, response: DeleteListingResponse | null) => void
}

export interface GetListingParameters {
    callback?: (error: Error | null, response: GetListingResponse | null) => void
}

export interface GetUserListingsParameters {
    skip?: number,
    limit?: number,
    callback?: (error: Error | null, response: GetUserListingsResponse | null) => void
}

export interface CreateListingParameters {
    callback?: (error: Error | null, response: CreateListingResponse | null) => void
}

export interface DeleteAllListingsParameters {
    callback?: (error: Error | null, response: DeleteAllListingsResponse | null) => void
}
