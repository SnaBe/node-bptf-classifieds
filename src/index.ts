// Import the required dependencies for the Classifieds class
import axios from 'axios'

// Import common Classified TypeScript types
import type { 
    ClassifiedsBody, // Placeholder for the Axios request body
    ClassifiedsOptions, // Constructor options for the Classifieds class
    ClassifiedsResponse, // Placeholder for the Axios response
    ClassifiedsCallback // Callback interface for the Axios response
} from './types/common'

// Import Classified parameter TypeScript types
import type {
    SearchParameters,
    GetListingParameters,
    GetListingsParameters,
    GetUserLimitsParameters,
    GetMyListingsParameters,
    CreateListingParameters,
    DeleteListingParameters,
    CreateListingsParameters,
    DeleteListingsParameters,
    GetUserListingsParameters,
    DeleteAllListingsParameters,
} from './types/parameters'

// Import all the Classified response TypeScript types
import type {
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
} from './types/responses'

/** A Node.js wrapper for the Backpack.tf Classifieds Web API. */
export class Classifieds {
    // The user's token and API key stored in private fields
    private readonly token: string | undefined
    private readonly apiKey: string | undefined

    /**
     * Constructs a new bptf-classifieds instance.
     * @param { ClassifiedsOptions } options An object of valid options for the Classifieds class constructor.
     * @param { string } options.token A Backpack.tf user token.
     * @param { string } options.apiKey A Backpack.tf API key.
     */
    constructor({ token = undefined, apiKey = undefined }: ClassifiedsOptions) {
        // A Backpack.tf user token is required to make requests
        this.token = token

        // A Backpack.tfAPI key is required to make premium requests
        this.apiKey = apiKey
    }

    /**
     * Make a GET request to the endpoint parameter.
     * @param endpoint The API endpoint for which to submit the request.
     * @param callback Optional, called when a response is available. If omitted the function returns a promise.
     * @returns The response data from the request.
     */
    private GET(endpoint: string, callback?: ClassifiedsCallback): Promise<ClassifiedsResponse> | void {
        // Return a promise if no callback is supplied
        return axios.get(endpoint).then(response => {
            // The Axios response might have an empty data property
            const data = response.data ? response.data : response.status

            // The callback parameter must be a function
            if (typeof callback === 'function') {
                // Callback with the GET request's response data
                callback(null, data)
            } else {
                // Return the GET request's response data
                return data
            }
        }).catch(error => {
            // The callback parameter must be a function
            if (typeof callback === 'function') {
                // Callback with the caught error
                callback(error, null)
            } else {
                // Throw the error if no callback was supplied
                throw error
            }
        })
    }

    /**
     * Make a POST request to the endpoint parameter.
     * @param endpoint The API endpoint for which to submit the request.
     * @param body The request body for the endpoint.
     * @param callback Optional, called when a response is available. If omitted the function returns a promise.
     * @returns The response data from the request.
     */
    private POST(endpoint: string, body: ClassifiedsBody, callback?: ClassifiedsCallback): Promise<ClassifiedsResponse> | void {
        // Return a promise if no callback is supplied
        return axios.post(endpoint, body).then(response => {
            // The Axios response might have an empty data property
            const data = response.data ? response.data : response.status

            // The callback parameter must be a function
            if (typeof callback === 'function') {
                // Callback with the POST request's response data
                callback(null, data)
            } else {
                // Return the POST request's response data
                return data
            }
        }).catch(error => {
            // The callback parameter must be a function
            if (typeof callback === 'function') {
                // Callback with the caught error
                callback(error, null)
            } else {
                // Throw the error if no callback was supplied
                throw error
            }
        })
    }

    /**
     * Make a GET request to the endpoint parameter.
     * @param endpoint The API endpoint for which to submit the request.
     * @param callback Optional, called when a response is available. If omitted the function returns a promise.
     * @returns The response data from the request.
     */
    private DELETE(endpoint: string, body: ClassifiedsBody, callback?: ClassifiedsCallback): Promise<ClassifiedsResponse> | void {
        // Return a promise if no callback is supplied
        return axios.delete(endpoint, { data: body }).then(response => {
            // The Axios response might have an empty data property
            const data = response.data ? response.data : response.status

            // The callback parameter must be a function
            if (typeof callback === 'function') {
                // Callback with the DELETE request's response data
                callback(null, data)
            } else {
                // Return the DELETE request's response data
                return data
            }
        }).catch(error => {
            // The callback parameter must be a function
            if (typeof callback === 'function') {
                // Callback with the caught error
                callback(error, null)
            } else {
                // Throw the error if no callback was supplied
                throw error
            }
        })
    }

    /**
     * Search the Backpack.tf Classifieds programmatically.
     * @param { SearchParameters } params An object of valid arguments for the /classifieds/search/v1 endpoint.
     * @param { string } params.intent Filter listings by intent, defaults to dual.
     * @param { number } params.page_size Modify the page size used to paginate, defaults to 10.
     * @param { number } params.fold If set to 0, disables listing folding.
     * @param { string } params.item Item name to search for, defaults to Team Captain.
     * @param { string } params.steamid Only show listings created by the user whose Steam ID is passed.
     * @param { void } params.callback Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<SearchResponse> | void } Backpack.tf Classifieds matching the method parameters.
     */
    search({ intent = 'dual', page_size = 10, fold = 1, item = 'Team Captain', callback }: SearchParameters = {}): Promise<SearchResponse> | void {
        // Check if the API key is defined
        if (this.apiKey === undefined || this.apiKey.length === 0 || this.apiKey === '') throw new Error('The Backpack.tf API key is an invalid string or missing.')
        
        // Return the response from the GET /classifieds/search/v1 endpoint
        return this.GET(`https://backpack.tf/api/classifieds/search/v1?key=${this.apiKey}&intent=${intent}&page_size=${page_size}&fold=${fold}&item=${item}`, callback)
    }

    /**
     * Get your own Backpack.tf Classifieds listings.
     * @param { GetMyListingsParameters } params An object of valid arguments for the /classifieds/listings/v1 endpoint.
     * @param { number } params.intent Filter listings by intent, can be 0 (buy) or 1 (sell). If missing, returns listings with both intents.
     * @param { number } params.inactive If 0, hides your inactive listings.
     * @param { void } params.callback Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<GetMyListingsResponse> | void } Your Backpack.tf Classifieds listings.
     */
    getMyListings({ intent = undefined, inactive = 1, callback }: GetMyListingsParameters = {}): Promise<GetMyListingsResponse> | void {
        // Check if the token is defined
        if (this.token === undefined || this.token.length === 0 || this.token === '') throw new Error('The Backpack.tf token is an invalid string or missing.')

        // If the intent parameter is missing, return listings with both intents
        const prefix = intent ? `intent=${intent}&` : ''

        // Return the response from the GET /classifieds/listings/v1 endpoint
        return this.GET(`https://backpack.tf/api/classifieds/listings/v1?${prefix}inactive=${inactive}&token=${this.token}`, callback)
    }

    /**
     * Delete multiple Classifieds listings.
     * @param { DeleteListingsParameters } params An object of valid arguments for the /classifieds/delete/v1 endpoint.
     * @param { Array<string> } params.ids An array of Classifieds listing ids. 
     * @returns { Promise<DeleteListingsResponse> | void } The number of listings that were deleted or skipped. 
     */
    deleteListings({ ids = [], callback }: DeleteListingsParameters = {}): Promise<DeleteListingsResponse> | void {
        // Check if the token is defined
        if (this.token === undefined || this.token.length === 0 || this.token === '') throw new Error('The Backpack.tf token is an invalid string or missing.')

        // Check if the ids array is empty
        if (Array.isArray(ids) && !ids.length) throw new Error('The array of Classifieds listing ids can not be empty.')

        // Return the response from the DELETE /classifieds/delete/v1 endpoint
        return this.DELETE(`https://backpack.tf/api/classifieds/delete/v1?token=${this.token}`, { listing_ids: ids }, callback)
    }

    /**
     * Create multiple Classifieds listings.
     * @param { CreateListingsParameters } params An object of valid arguments for the /classifieds/list/v1 endpoint.
     * @param { Array<CreatableListing> } param.listings An array of Classifieds listings.
     * @param { void } params.callback Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<CreateListingsResponse> | void } A list of objects that represents the listings that were created.
     */
    createListings({ listings = [], callback }: CreateListingsParameters = {}): Promise<CreateListingsResponse> | void {
        // Check if the token is defined
        if (this.token === undefined || this.token.length === 0 || this.token === '') throw new Error('The Backpack.tf token is an invalid string or missing.')

        // Check if the listings array is empty
        if (Array.isArray(listings) && !listings.length) throw new Error('The array of Classified listings can not be empty.')

        // Return the response from the POST /classifieds/list/v1 endpoint
        return this.POST(`https://backpack.tf/api/classifieds/list/v1?token=${this.token}`, { listings }, callback)
    }

    /**
     * Get a Classifieds listing by its ID.
     * @param { GetListingParameters } params An object of valid arguments for the /classifieds/listings endpoint.
     * @param { string } params.id The listing id, this is required.
     * @param { void } params.callback Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<GetListingResponse> | void } The listing object or an error if not found.
     */
    getListing({ id = '', callback }: GetListingParameters = {}): Promise<GetListingResponse> | void {
        // Check if the token is defined
        if (this.token === undefined || this.token.length === 0 || this.token === '') throw new Error('The Backpack.tf token is an invalid string or missing.')

        // Check if the listing id is defined
        if (id === undefined || id.length === 0 || id === '') throw new Error('The listing id is an invalid string or missing.')

        // Return the response from the GET /classifieds/listings endpoint
        return this.GET(`https://backpack.tf/api/classifieds/listings/${id}?token=${this.token}`, callback)
    }

    /**
     * Delete a Classifieds listing by its ID.
     * @param { DeleteListingParameters } params An object of valid arguments for the /classifieds/listings endpoint.
     * @param { string } params.id The listing id, this is required.
     * @param { void } params.callback Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<DeleteListingResponse> | void } A status code that indicates if the listing was successfully deleted.
     */
    deleteListing({ id = '', callback }: DeleteListingParameters = {}): Promise<DeleteListingResponse> | void {
        // Check if the token is defined
        if (this.token === undefined || this.token.length === 0 || this.token === '') throw new Error('The Backpack.tf token is an invalid string or missing.')

        // Check if the listing id is defined
        if (id === undefined || id.length === 0 || id === '') throw new Error('The listing id is an invalid string or missing.')

        // Return the response from the DELETE /classifieds/listings endpoint
        return this.DELETE(`https://backpack.tf/api/classifieds/listings/${id}?token=${this.token}`, null, callback)
    }

    /**
     * Get the listing limits of the session user.
     * @param { GetUserLimitsParameters } params An object of valid arguments for the /classifieds/limits endpoint.
     * @param { void } params.callback Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<UserLimitsResponse> | void } The listing limits of the session user.
     */
    getUserLimits({ callback }: GetUserLimitsParameters = {}): Promise<GetUserLimitsResponse> | void {
        // Check if the token is defined
        if (this.token === undefined || this.token.length === 0 || this.token === '') throw new Error('The Backpack.tf token is an invalid string or missing.')
        
        // Return the response from the GET /classifieds/limits endpoint
        return this.GET(`https://backpack.tf/api/classifieds/limits?token=${this.token}`, callback)
    }

    /**
     * Creates a new Classifieds listing.
     * @param { CreateListingParameters } params An object of valid arguments for the /classifieds/limits endpoint.
     * @param { CreatableListing } params.listing A Classifieds listing object.
     * @param { void } params.callback Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<CreateListingResponse> | void } An object that represents the listing that was created.
     */
    createListing({ listing = null, callback }: CreateListingParameters = {}): Promise<CreateListingResponse> | void {
        // Check if the token is defined
        if (this.token === undefined || this.token.length === 0 || this.token === '') throw new Error('The Backpack.tf token is an invalid string or missing.')

        // Check if the listing object is missing
        if (listing === undefined || listing === null) throw new Error('The listing object is invalid or missing.')

        // Return the response from the POST /classifieds/listings endpoint
        return this.POST(`https://backpack.tf/api/classifieds/listings?token=${this.token}`, listing, callback)
    }

    /**
     * Delete all Backpack.tf Classifieds listings associated with the token.
     * @param { DeleteAllListingsParameters } params An object of valid arguments for the /classifieds/limits endpoint.
     * @param { void } params.callback Optional, called when a response is available. If omitted the function returns a promise.
     * @returns A status code of 501 Not Implemented.
     */
    deleteAllListings({ callback }: DeleteAllListingsParameters = {}): Promise<DeleteAllListingsResponse> | void {
        // Check if the token is defined
        if (this.token === undefined || this.token.length === 0 || this.token === '') throw new Error('The Backpack.tf token is an invalid string or missing.')

        // Return the response from the DELETE /classifieds/listings endpoint
        return this.DELETE(`https://backpack.tf/api/classifieds/listings?token=${this.token}`, null, callback)
    }

    /**
     * Get the listings for the current session user.
     * @param { GetUserListingsParameters } params An object of valid arguments for the /classifieds/listings/snapshot endpoint.
     * @param { number } params.skip The offset at which to return listings.
     * @param { number } params.limit The listing limit.
     * @param { void } params.callback Optional, called when a response is available. If omitted the function returns a promise.
     * @returns The listings for the current session user.
     */
    getUserListings({ skip = 0, limit = 100, callback }: GetUserListingsParameters = {}): Promise<GetUserListingsResponse> | void {
        // Check if the token is defined
        if (this.token === undefined || this.token.length === 0 || this.token === '') throw new Error('The Backpack.tf token is an invalid string or missing.')

        // Return the response from the GET /classifieds/listings/self endpoint
        return this.GET(`https://backpack.tf/api/classifieds/listings/self?skip=${skip}&limit=${limit}&token=${this.token}`, callback)
    }

    /**
     * Get an array of relevant listings for an item SKU.
     * @param { GetListingsParameters } params An object of valid arguments for the /classifieds/listings/snapshot endpoint.
     * @param { number } params.appid The appid of the item, defaults to 440 (Team Fortress 2).
     * @param { string } params.sku The SKU is considered to be what you see items being sold as on the Backpack.tf listings.
     * @param { void } params.callback Optional, called when a response is available. If omitted the function returns a promise.
     * @returns The first fifteen buy and sell orders for the item.
     */
    getListings({ appid = 440, sku = 'The Team Captain', callback }: GetListingsParameters = {}): Promise<GetListingsResponse> | void {
        // Check if the token is defined
        if (this.token === undefined || this.token.length === 0 || this.token === '') throw new Error('The Backpack.tf token is an invalid string or missing.')

        // Return the response from the /classifieds/listings/snapshot endpoint
        return this.GET(`https://backpack.tf/api/classifieds/listings/snapshot?sku=${sku}&appid=${appid}&token=${this.token}`, callback)
    }
}

// Export common Classifieds types
export * from './types/common'

// Export Classifieds parameter types
export * from './types/parameters'

// Export Classifieds response types
export * from './types/responses'

// Export Classifieds enumerated types
export * from './resources'
