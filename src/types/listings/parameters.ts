// Import the unique type for creating listings
import { CreatableListing } from './index'

// Import the necessary Classifieds reponse types
import { 
    DeleteListingsResponse,
    DeleteListingResponse,
    GetListingResponse,
    GetUserListingsResponse,
    CreateListingResponse,
    DeleteAllListingsResponse
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
