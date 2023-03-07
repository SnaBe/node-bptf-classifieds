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

export interface CreatableListing {
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
    message?: string,
    listings: {
        [key: string]: {
            created?: number,
            error?: number,
            retry?: number,
            used?: number,
            cap?: number
        }
    }
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