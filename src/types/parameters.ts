// Import the unique type for creating listings
import { CreatableListing } from './common'

// Import the necessary Classifieds response types
import {
    SearchResponse, // Response object for the search method
    GetListingResponse, // Response object for the getListing method
    GetListingsResponse, // Response object for the getListings method
    GetUserLimitsResponse, // Response object for the getUserLimits method
    GetMyListingsResponse, // Response object for the getMyListings method
    CreateListingResponse, // Response object for the createListing method
    DeleteListingResponse, // Response object for the deleteListing method
    CreateListingsResponse, // Response object for the createListings method
    DeleteListingsResponse, // Response object for the deleteListings method
    GetUserListingsResponse, // Response object for the getUserListings
    DeleteAllListingsResponse, // Response object for the deleteAllListings method
} from './responses'

/** Parameter options for the deleteListings method. */
export interface DeleteListingsParameters {
    ids?: Array<string>, // Array of listing ids
    callback?: (error: Error | null, response: DeleteListingsResponse | null) => void // Callback function
}

/** Parameter options for the deleteListing method. */
export interface DeleteListingParameters {
    id?: string, // The listing's unique id
    callback?: (error: Error | null, response: DeleteListingResponse | null) => void // Callback function
}

/** Parameter options for the getListing method. */
export interface GetListingParameters {
    id?: string, // The listing's unique id
    callback?: (error: Error | null, response: GetListingResponse | null) => void // Callback function
}

/** Parameter options for the getUserListings method. */
export interface GetUserListingsParameters {
    skip?: number, // Number of pages to skip
    limit?: number, // Page limit
    callback?: (error: Error | null, response: GetUserListingsResponse | null) => void // Callback function
}

/** Parameter options for the createListing method. */
export interface CreateListingParameters {
    listing?: CreatableListing | null, // A CreatableListing object
    callback?: (error: Error | null, response: CreateListingResponse | null) => void // Callback function
}

/** Parameter options for the deleteAllListings method. */
export interface DeleteAllListingsParameters {
    callback?: (error: Error | null, response: DeleteAllListingsResponse | null) => void // Callback function
}

/** Parameter options for the getMyListings method. */
export interface GetMyListingsParameters {
    inactive?: 0 | 1, // Filter for inactive listings
    callback?: (error: Error | null, response: GetMyListingsResponse | null) => void // Callback function
}

/** Parameter options for the getListings method. */
export interface GetListingsParameters {
    appid?: number, // App id associated with the listing item
    sku?: string, // The item's SKU or name
    callback?: (error: Error | null, response: GetListingsResponse | null) => void // Callback function
}

/** Parameter options for the createListings method. */
export interface CreateListingsParameters {
    listings?: Array<CreatableListing>, // An array of CreatableListing objects
    callback?: (error: Error | null, response: CreateListingsResponse | null) => void // Callback function
}

/** Parameter options for the search method. */
export interface SearchParameters {
    intent?: 'sell' | 'buy' | 'dual', // Search for buy or sell listings only
    page_size?: number, // Number of listings on each page
    fold?: 0 | 1, // Option for folding listing details together.
    item?: string, // The item's name
    steamid?: string, // Search for a specific owner or listing author
    callback?: (error: Error | null, response: SearchResponse | null) => void // Callback function
}

/** Parameter options for the getUserLimits method. */
export interface GetUserLimitsParameters {
    callback?: (error: Error | null, response: GetUserLimitsResponse | null) => void // Callback function
}
