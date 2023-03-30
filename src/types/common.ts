/** Placeholder for the Axios request body */
export type ClassifiedsBody = any

/** Placeholder for the Axios response */
export type ClassifiedsResponse = any

/** Callback interface for the Axios response */
export type ClassifiedsCallback = (error: Error | null, response: ClassifiedsResponse | null) => void

/** Constructor options for the Classifieds class */
export interface ClassifiedsOptions {
    token?: string, // Backpack.tf user token
    apiKey?: string // Backpack.tf API key
}

/** A Classified listing object returned by GET requests */
export interface Listing {
    steamid: string, // The owner's Steam ID 
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
    intent: 0 | 1,
    id?: string,
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

/** The object that represents a Classified listing */
export interface CreatableListing {
    intent: 0 | 1,
    id?: string,
    item: {
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
