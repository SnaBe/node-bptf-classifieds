import axios from 'axios'

import { ClassifiedsBody, ClassifiedsResponse, ClassifiedsCallback } from './types/classifieds'

export interface Listing {
    steamid: string,
    offers: number,
    buyout: number
    details: string,
    timestamp: number,
    intent: 'sell' | 'buy',
    price: number,
    item: any,
    currencies: any,
    bump: number,
    userAgent: any
}

export interface ListingAttribute {
    defindex: number,
    value: number,
    float_value: number
}

export interface ListingElement {
    id: string,
    steamid?: string,
    appid: number,
    currencies: {
        metal?: number,
        keys?: number
    },
    offers: number,
    buyout: number,
    details: string,
    created: number,
    bump: number,
    intent: 0 | 1,
    item: {
        id: number,
        original_id: number,
        defindex: number,
        level: number,
        quality: number,
        inventory: number,
        quantity: number,
        origin: number,
        attributes: Array<ListingAttribute>,
        name: string
    },
    automatic?: number,
    count?: number,
    promoted?: number
}

export interface CreateListing {
    intent: 'sell' | 'buy',
    id: string,
    item?: {
        quality: string,
        item_name: string,
        craftable?: string | number,
        priceindex?: number
    },
    offers?: number,
    buyout?: number,
    promoted?: number,
    details?: string,
    currencies: {
        metal?: number,
        keys?: number
    }
}

export interface SearchResponse {
    response: {
        message: string
    }
}

export interface GetMyListingsResponse {
    message?: string,
    cap: number,
    promotes_remaining: number,
    listings?: Array<ListingElement>
}

export interface GetListingsResponse {
    listings?: Array<Listing>,
    appid: number,
    sku: string,
    createdAt: number
}

export interface CreateListingsResponse {
    message: string
}

export interface SearchParameters {
    intent?: 'sell' | 'buy' | 'dual',
    page_size?: number,
    fold?: 0 | 1,
    item?: string,
    steamid?: string,
    callback?: (error: Error | null, response: SearchResponse | null) => void
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

export interface CreateListingsParameters  {
    callback?: (error: Error | null, response: CreateListingsResponse | null) => void
}

// Wrapper class for the Backpack.tf Classifieds Web API
class Classifieds {
    // The user's token stored in a private field
    private readonly token: string | undefined
    private readonly key: string | undefined

    /**
     * Constructs a new bptf-classifieds instance.
     * @param { string } token A Backpack.tf user token.
     * @param { string } key A Backpack.tf API key.
     */
    constructor(token: string | undefined, key: string | undefined) {
        // A Backpack.tf user token is required to make requests
        this.token = token

        // A Backpack.tfAPI key is required to make premium requests
        this.key = key
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
            // The callback parameter must be a function
            if (typeof callback === 'function') {
                // Callback with the GET response data
                callback(null, response.data)
            }

            // Return the GET response data
            return response.data
        }).catch(error => {
            // The callback parameter must be a function
            if (typeof callback === 'function') {
                // Callback with the caught error
                callback(error, null)
            }

            // Throw the error if no callback was supplied
            throw error
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
            // The callback parameter must be a function
            if (typeof callback === 'function') {
                // Callback with the POST response data
                callback(null, response.data)
            }

            // Return the POST response data
            return response.data
        }).catch(error => {
            // The callback parameter must be a function
            if (typeof callback === 'function') {
                // Callback with the caught error
                callback(error, null)
            }

            // Throw the error if no callback was supplied
            throw error
        })
    }

    /**
     * Make a GET request to the endpoint parameter.
     * @param endpoint The API endpoint for which to submit the request.
     * @param callback Optional, called when a response is available. If omitted the function returns a promise.
     * @returns The response data from the request.
     */
    private DELETE(endpoint: string, callback?: ClassifiedsCallback): Promise<ClassifiedsResponse> | void {
        return axios.delete(endpoint).then(response => {
            // The callback parameter must be a function
            if (typeof callback === 'function') {
                // Callback with the DELETE response data
                callback(null, response.data)
            }

            // Return the DELETE response data
            return response.data
        }).catch(error => {
            // The callback parameter must be a function
            if (typeof callback === 'function') {
                // Callback with the caught error
                callback(error, null)
            }

            // Throw the error if no callback was supplied
            throw error
        })
    }

    /**
     * Search the Backpack.tf Classifieds programmatically.
     * @param { any } params An object of valid arguments for the /classifieds/search/v1 endpoint.
     * @param { string } params.item The item's name, defaults to Team Captain.
     * @returns { Promise<SearchResponse> | Function } Backpack.tf Classifieds matching the method parameters.
     */
    search({ intent = 'dual', page_size = 10, fold = 1, item = 'Team Captain', callback }: SearchParameters): Promise<SearchResponse> | void {
        // Check if the API key is defined
        if (this.key === undefined || this.key.length === 0 || this.key === '') throw new Error('The Backpack.tf API key is an invalid string or missing.')
        
        // Return the response from the /classifieds/search/v1 endpoint
        return this.GET(`https://backpack.tf/api/classifieds/search/v1?key=${this.key}&intent=${intent}&page_size=${page_size}&fold=${fold}&item=${item}`, callback)
    }

    /**
     * Get your own Backpack.tf Classifieds listings.
     * @param { any } params An object of valid arguments for the /classifieds/listings/v1 endpoint.
     * @param { number } params.inactive If 0, hides your inactive listings.
     * @param { Function } params.callback Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<GetMyListingsResponse> | Function } Your Backpack.tf Classifieds listings.
     */
    getMyListings({ inactive = 1, callback }: GetMyListingsParameters): Promise<GetMyListingsResponse> | void {
        // Check if the token is defined
        if (this.token === undefined || this.token.length === 0 || this.token === '') throw new Error('The Backpack.tf token is an invalid string or missing.')

        // Return the response from the /classifieds/listings/v1 endpoint
        return this.GET(`https://backpack.tf/api/classifieds/listings/v1?inactive=${inactive}&token=${this.token}`, callback)
    }

    /**
     * Create multiple Classifieds listings.
     * @param params An object of valid arguments for the /classifieds/list/v1 endpoint.
     * @returns { Promise<CreateListingsResponse> | Function }
     */
    createListings({ callback }: CreateListingsParameters): Promise<CreateListingsResponse> | void {
        // Check if the token is defined
        if (this.token === undefined || this.token.length === 0 || this.token === '') throw new Error('The Backpack.tf token is an invalid string or missing.')

        // Return the response from the /classifieds/list/v1 endpoint
        return this.POST('https://backpack.tf/api/classifieds/list/v1', { token: this.token, listings: [] }, callback)
    }

    /**
     * Get an array of relevant listings for an item SKU.
     * @param { any } params An object of valid arguments for the /classifieds/listings/snapshot endpoint.
     * @param { number } params.appid The appid of the item, defaults to 440 (Team Fortress 2).
     * @param { string } params.SKU The SKU is considered to be what you see items being sold as on the backpack.tf listings.
     * @param { Function } params.callback Optional, called when a response is available. If omitted the function returns a promise.
     * @returns The first fifteen buy and sell orders for the item.
     */
    getListings({ appid = 440, sku = 'Team Captain', callback }: GetListingsParameters): Promise<GetListingsResponse> | void {
        // Check if the token is defined
        if (this.token === undefined || this.token.length === 0 || this.token === '') throw new Error('The Backpack.tf token is an invalid string or missing.')

        // Return the response from the /classifieds/listings/snapshot endpoint
        return this.GET(`https://backpack.tf/api/classifieds/listings/snapshot?sku=${sku}&appid=${appid}&token=${this.token}`, callback)
    }
}

// Export the Classifieds class
export default Classifieds
