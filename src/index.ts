import axios from 'axios'

import { 
    ClassifiedsBody, 
    ClassifiedsResponse, 
    ClassifiedsCallback 
} from './types/classifieds'

import { 
    GetMyListingsResponse, 
    GetListingsResponse, 
    CreateListingsResponse, 
    GetMyListingsParameters, 
    GetListingsParameters, 
    CreateListingsParameters, 
    CreatableListing 
} from './types/listings'

import { 
    CreateListingParameters, 
    DeleteAllListingsParameters, 
    DeleteListingParameters, 
    DeleteListingsParameters, 
    GetListingParameters, 
    GetUserListingsParameters 
} from './types/listings/parameters'

import { 
    CreateListingResponse, 
    DeleteAllListingsResponse, 
    DeleteListingResponse, 
    DeleteListingsResponse, 
    GetListingResponse, 
    GetUserListingsResponse 
} from './types/listings/responses'

import { EListingIntent } from './resources/EIntent'

export interface SearchResponse {
    response: {
        message: string
    }
}

export interface SearchParameters {
    intent?: 'sell' | 'buy' | 'dual',
    page_size?: number,
    fold?: 0 | 1,
    item?: string,
    steamid?: string,
    callback?: (error: Error | null, response: SearchResponse | null) => void
}

export interface GetUserLimitsResponse {
    listings: {
        promotionSlotsAvailable?: number,
        used: number,
        total: number,
        baseline?: number,
        donationBonus?: number,
        giftedPremiumMonthsBonus?: number,
        multiplier?: number,
        twitterFollowerBonus?: number,
        acceptedSuggestionBonus?: number,
        mvpDonationBonus?: number,
        groupMembershipBonus?: number,
        bumpInterval?: number
    }
}

export interface GetUserLimitsParameters {
    callback?: (error: Error | null, response: GetUserLimitsResponse | null) => void
}

// Constructor options for the Classifieds class
export interface IClassifiedsOptions {
    token?: string, // Backpack.tf user token
    apiKey?: string // Backpack.tf API key
}

// Export the wrapper class for the Backpack.tf Classifieds Web API
export default class Classifieds {
    // The user's token stored in a private field
    private readonly token: string | undefined
    private readonly apiKey: string | undefined

    /**
     * Constructs a new bptf-classifieds instance.
     * @param { any } options An object of valid options for the Classifieds class constructor.
     * @param { string } options.token A Backpack.tf user token.
     * @param { string } options.apiKey A Backpack.tf API key.
     */
    constructor({ token = undefined, apiKey = undefined }: IClassifiedsOptions) {
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
                // Callback with the DELETE request response data
                callback(null, data)
            } else {
                // Return the DELETE request response data
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
     * Search the Backpack.tf Classified listings programmatically.
     * @param { any } params An object of valid arguments for the /classifieds/search/v1 endpoint.
     * @param { string } params.item The item's name, defaults to Team Captain.
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
     * @param { any } params An object of valid arguments for the /classifieds/listings/v1 endpoint.
     * @param { number } params.inactive If 0, hides your inactive listings.
     * @param { void } params.callback Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<GetMyListingsResponse> | void } Your Backpack.tf Classifieds listings.
     */
    getMyListings({ inactive = 1, callback }: GetMyListingsParameters = {}): Promise<GetMyListingsResponse> | void {
        // Check if the token is defined
        if (this.token === undefined || this.token.length === 0 || this.token === '') throw new Error('The Backpack.tf token is an invalid string or missing.')

        // Return the response from the GET /classifieds/listings/v1 endpoint
        return this.GET(`https://backpack.tf/api/classifieds/listings/v1?inactive=${inactive}&token=${this.token}`, callback)
    }

    /**
     * Delete multiple Classifieds listings.
     * @param { any } params An object of valid arguments for the /classifieds/delete/v1 endpoint.
     * @param { Array<string> } params.ids An array of Classifieds listing ids. 
     * @returns { Promise<DeleteListingsResponse> | void } The number of listings that was deleted or skipped. 
     */
    deleteListings({ ids = [], callback }: DeleteListingsParameters = {}): Promise<DeleteListingsResponse> | void {
        // Check if the token is defined
        if (this.token === undefined || this.token.length === 0 || this.token === '') throw new Error('The Backpack.tf token is an invalid string or missing.')

        // Return the response from the DELETE /classifieds/delete/v1 endpoint        
        return this.DELETE(`https://backpack.tf/api/classifieds/delete/v1?token=${this.token}`, { listing_ids: ids }, callback)
    }

    /**
     * Create multiple Classifieds listings.
     * @param { any } params An object of valid arguments for the /classifieds/list/v1 endpoint.
     * @param { Array<CreatableListing> } param.listings An array of Classifieds listings.
     * @param { void } params.callback Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<CreateListingsResponse> | void } A list of objects that represents the listings that was created.
     */
    createListings({ listings = [], callback }: CreateListingsParameters = {}): Promise<CreateListingsResponse> | void {
        // Check if the token is defined
        if (this.token === undefined || this.token.length === 0 || this.token === '') throw new Error('The Backpack.tf token is an invalid string or missing.')

        // Return the response from the POST /classifieds/list/v1 endpoint
        return this.POST(`https://backpack.tf/api/classifieds/list/v1?token=${this.token}`, { listings }, callback)
    }

    /**
     * Get a Classifieds listing by its ID.
     * @param { any } params An object of valid arguments for the /classifieds/listings endpoint.
     * @param { string } params.id The listing id. This is required.
     * @param { void } params.callback Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<GetListingResponse> | void } The listing object or an error if not found.
     */
    getListing({ id = '', callback }: GetListingParameters = {}): Promise<GetListingResponse> | void {
        // Check if the token is defined
        if (this.token === undefined || this.token.length === 0 || this.token === '') throw new Error('The Backpack.tf token is an invalid string or missing.')

        // Return the response from the GET /classifieds/listings endpoint
        return this.GET(`https://backpack.tf/api/classifieds/listings/${id}?token=${this.token}`, callback)
    }

    /**
     * Delete a Classifieds listing by its ID.
     * @param { any } params An object of valid arguments for the /classifieds/listings endpoint.
     * @param { string } params.id The listing id. This is required.
     * @param { void } params.callback Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<DeleteListingResponse> | void } A status code that indicates if the listing was successfully deleted.
     */
    deleteListing({ id = '', callback }: DeleteListingParameters = {}): Promise<DeleteListingResponse> | void {
        // Check if the token is defined
        if (this.token === undefined || this.token.length === 0 || this.token === '') throw new Error('The Backpack.tf token is an invalid string or missing.')

        // Return the response from the DELETE /classifieds/listings endpoint    
        return this.DELETE(`https://backpack.tf/api/classifieds/listings/${id}?token=${this.token}`, null, callback)
    }

    /**
     * Get the listing limits of the session user.
     * @param { any } params An object of valid arguments for the /classifieds/limits endpoint.
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
     * @param { any } params An object of valid arguments for the /classifieds/limits endpoint.
     * @param { void } params.callback Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<CreateListingResponse> | void } An object that represents the listing that was created.
     */
    createListing({ listing = null, callback }: CreateListingParameters = {}): Promise<CreateListingResponse> | void {
        // Check if the token is defined
        if (this.token === undefined || this.token.length === 0 || this.token === '') throw new Error('The Backpack.tf token is an invalid string or missing.')

        // Return the response from the POST /classifieds/listings endpoint
        return this.POST(`https://backpack.tf/api/classifieds/listings?token=${this.token}`, listing, callback)
    }

    /**
     * Delete all Backpack.tf Classifieds listings associated with the token.
     * @param { any } params An object of valid arguments for the /classifieds/limits endpoint.
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
     * @param { any } params An object of valid arguments for the /classifieds/listings/snapshot endpoint.
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
     * @param { any } params An object of valid arguments for the /classifieds/listings/snapshot endpoint.
     * @param { number } params.appid The appid of the item, defaults to 440 (Team Fortress 2).
     * @param { string } params.SKU The SKU is considered to be what you see items being sold as on the backpack.tf listings.
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

// Export the Classifieds types
export {
    CreatableListing,
    EListingIntent as ListingIntent
}
