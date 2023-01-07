import axios, { AxiosResponse } from 'axios'

export type ClassifiedsCallback = (error: Error | null, response: AxiosResponse | null) => void



interface GetListings {
    appid?: number,
    sku?: string,
    callback?: (error: Error | null, response: AxiosResponse | null) => void
}

interface ClassifiedsResponse<T = any> {
    listings?: Array<T>,
    appid: number,
    sku: string,
    createdAt: number
}

// Wrapper class for the Backpack.tf classifieds Web API
class Classifieds {
    // The user's token stored in a private field
    private readonly token: string | undefined

    /**
     * Constructs a new bptf-classifieds instance.
     * @param { string } token A Backpack.tf user token.
     */
    constructor(token: string | undefined) {
        // A Backpack.tf user token is required to make requests
        this.token = token
    }

    /**
     * Make a GET request to the endpoint parameter.
     * @param endpoint The API endpoint for which to submit the request.
     * @param callback Optional, called when a response is available. If omitted the function returns a promise.
     * @returns The response data from the request.
     */
    private GET(endpoint: string, callback?: (err: Error | null, res: AxiosResponse | null) => void): Promise<AxiosResponse> | void {
        // Return a promise if no callback is supplied
        return axios.get(endpoint).then(response => {
            // The callback parameter must be a function
            if (typeof callback === 'function') {
                // Callback with the response data
                callback(null, response.data)
            }

            // Return the response data
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
     * Get an array of relevant listings for an item SKU.
     * @param { any } params An object of valid arguments for the /listings/snapshot endpoint.
     * @param { number } params.appid The appid of the item, defaults to 440 (Team Fortress 2).
     * @param { string } params.SKU The SKU is considered to be what you see items being sold as on the backpack.tf listings.
     * @param { Function } params.callback Optional, called when a response is available. If omitted the function returns a promise.
     * @returns The first fifteen buy and sell orders for the item.
     */
    getListings({ appid = 440, sku = 'Team Captain', callback }: GetListings) {
        // Check if the token is defined
        if (this.token === undefined || this.token.length === 0 || this.token === '') throw new Error('The Backpack.tf token is an invalid string or missing.')

        // Return the response from the /listings/snapshot endpoint
        return this.GET(`https://backpack.tf/api/classifieds/listings/snapshot?sku=${sku}&appid=${appid}&token=${this.token}`, callback)
    }
}

// Export the Classifieds class
export default Classifieds
