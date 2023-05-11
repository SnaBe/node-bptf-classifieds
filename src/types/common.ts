/** Placeholder for the Axios request body. */
export type ClassifiedsBody = any

/** Placeholder for the Axios response. */
export type ClassifiedsResponse = any

/** Callback interface for the Axios response. */
export type ClassifiedsCallback = (error: Error | null, response: ClassifiedsResponse | null) => void

/** Constructor options for the Classifieds class. */
export interface ClassifiedsOptions {
    token?: string, // Backpack.tf user token
    apiKey?: string // Backpack.tf API key
}

/** A Classifieds listing attribute object. */
export interface ListingAttribute {
    defindex: number, // The item's defindex
    value: number, // The item's price value
    float_value?: number // The item's float value
}

/** A Classifieds listing item object. */
export interface ListingItem {
    id?: number, // The item's id
    original_id?: number, // The item's original id
    defindex: number, // The item's defindex
    level?: number, // The item's in-game level
    quality: number, // The item's in-game quality
    inventory?: number, // Inventory id
    quantity?: number, // Number of items owned
    origin?: number, // Origin state for the item
    equipped?: Array<{ class: number, slot: number }> // If the item is equipped to a class
    attributes?: Array<ListingAttribute>, // Array of attributes
    name: string // The item's name
}

/** A Classifieds listing created by the current session user. */
export interface UserListing {
    id: string, // The item's id
    steamid: string, // The user's Steam ID
    appid: number, // The app id associated with the listing item
    currencies: { // Item price in TF2 currencies
        metal?: number, // Refined Metal
        keys?: number // Mann Co. Keys
    },
    offers: number, // If the Listing accepts offers
    buyout: number, // Buyouts only
    details: string, // Listing description
    created: number, // Date the listing was created
    bump: number, // Listing bumping details
    intent: number, // The intent with the listing
    item: ListingItem // Classifieds listing item
}

/** A Classifieds listing object returned by GET requests. */
export interface Listing {
    steamid: string, // The owner's Steam ID 
    offers: number, // If the Listing accepts offers
    buyout: number // Buyouts only
    details: string, // Listing description
    timestamp: number, // Timestamp for listing time
    intent: 'sell' | 'buy', // The intent with the listing
    price: number, // Item price in the listing
    item: ListingItem, // Classifieds listing item
    currencies: { // Item price in TF2 currencies
        metal?: number, // Refined Metal
        keys?: number // Mann Co. Keys
    },
    bump: number, // Listing bumping details
    userAgent: { // User associated with the Listing
        lastPulse: number, // Timestamp for last pulse
        client: string // User client represented by a string
    }
}

/** A Classified listing element object. */
export interface ListingElement {
    id: string, // The listing id
    steamid?: string, // The author of the listing
    appid: number, // The app id associated with the listing item
    currencies: { // The buy or sell price for the listing item
        metal?: number, // Refined Metal
        keys?: number // Mann Co. Keys
    },
    offers: number, // If the Listing accepts offers
    buyout: number, // Buyouts only
    details: string, // Listing description
    created: number, // Date the listing was created
    bump: number, // Listing bumping details
    intent: 0 | 1, // The intent with the listing
    item: ListingItem, // Classifieds listing item
    automatic?: number, // If the listing was automatic
    count?: number, // Number of listings
    promoted?: number // If the listing was promoted, requires premium
}

/** The object structure required for creating listings. */
export interface CreateListing {
    intent: 0 | 1, // Buy or sell
    id?: string, // Asset id if selling
    item?: { // Item object
        quality: string, // The item's quality
        item_name: string, // The item's name
        craftable?: string | number, // If the item is craftable
        priceindex?: number // The item's price index
    },
    offers?: number, // If the Listing accepts offers
    buyout?: number, // Buyouts only
    promoted?: number, // If the listing was promoted, requires premium
    details?: string, // Listing description
    currencies: { // The buy or sell price for the listing item
        metal?: number, // Refined Metal
        keys?: number // Mann Co. Keys
    }
}

/** The object that represents a Classifieds listing. */
export interface CreatableListing {
    intent: 0 | 1, // Buy or sell
    id?: string, // Asset id if selling
    item: { // Item object
        quality: string, // The item's quality
        item_name: string, // The item's name
        craftable?: string | number, // If the item is craftable
        priceindex?: number // The item's price index
    },
    offers?: number, // If the Listing accepts offers
    buyout?: number, // Buyouts only
    promoted?: number, // If the listing was promoted, requires premium
    details?: string, // Listing description
    currencies: { // The buy or sell price for the listing item
        metal?: number, // Refined Metal
        keys?: number // Mann Co. Keys
    }
}
