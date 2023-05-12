// Import the unique data types for listings
import { ListingElement, Listing, UserListing } from './common'

/** Response object for the deleteListings method. */
export interface DeleteListingsResponse {
    deleted: number, // The number of listings deleted
    skipped: Array<any>, // Listings that was skipped due to the errors
    errors: Array<any> // An array of errors
}

/** Response object for the deleteListing method. */
export interface DeleteListingResponse {
    message: string // Attached request message
}

/** Response object for the getListing method. */
export interface GetListingResponse {
    id: string, // The listing id
    steamid: string, // The author of listing
    appid: number, // The app id associated with the listing item
    currencies: { // The buy or sell price for the listing item
        metal?: number, // Refined Metal
        keys?: number // Mann Co. Keys
    },
    offers?: number, // If the Listing accepts offers
    buyout?: number, // Buyouts only
    details?: string, // Listing description
    created: number, // Date the listing was created
    bump: number, // Listing bumping details
    intent: 0 | 1, // The intent with the listing
    item: { // Item object
        defindex: number, // The item's defindex
        quality: number, // The item's in-game quality
        name: string // The item's name
    }
}

/** Response object for the getUserListings method. */
export interface GetUserListingsResponse {
    results: Array<UserListing>, // Array of Classified listings
    cursor: { // Object for point reference to listings
        skip: number, // Listings skipped
        limit: number, // Listing limit
        total: number, // Total number of listing
        _info: string | null // Additional info for the listings
    }
}

/** Response object for the createListing method. */
export interface CreateListingResponse {
    message: string // Response message
}

/** Response object for the deleteAllListings method. */
export interface DeleteAllListingsResponse {
    message: string // Response message
}

/** Response object for the getMyListings method. */
export interface GetMyListingsResponse {
    message?: string, // Response message
    cap: number, // Listings cap
    promotes_remaining: number, // Number of premium promotions remaining
    listings: Array<ListingElement>
}

/** Response object for the getListings method. */
export interface GetListingsResponse {
    listings: Array<Listing>, // Array of Classified listings
    appid: number, // The app id associated with the listing item
    sku: string, // Item SKU or name
    createdAt: number // Time of the request
}

/** Response object for the createListings method. */
export interface CreateListingsResponse {
    message?: string, // Response message
    listings: { // Nested object of listings 
        [key: string]: { // Name of the item listed
            created?: number, // If the listing was created
            error?: number, // If there was any errors
            retry?: number, // If a retry was used
            used?: number, // Listings used up
            cap?: number // Listing cap
        }
    }
}

/** Response object for the search method. */
export interface SearchResponse {
    response: { // The response object
        message: string // Response message or status code
        total?: number // Amount of listings matched by the query
        skip?: number // How many listings were skipped for this page
        page_size?: number // How many listings are shown on this page
        buy?: { // Listings with buy intent
            total: number, // Number of buy listings
            listings: Array<ListingElement>, // Array of listing elements
            fold: boolean // If fold listings were present
        },
        sell?: { // Listings with sell intent
            total: number, // Number of sell listings
            listings: Array<ListingElement>, // Array of listing elements
            fold: boolean // // If fold listings were present
        }
    }
}

/** Response object for the getUserLimits method. */
export interface GetUserLimitsResponse {
    listings: { // Listing limits
        promotionSlotsAvailable?: number, // Number of promotion slots available
        used: number, // Listing slots used
        total: number, // Total number of listings
        baseline?: number, // Baseline for limits
        donationBonus?: number, // Bonus for donating to Backpack.tf
        giftedPremiumMonthsBonus?: number, // Bonus from gifting premium
        multiplier?: number, // Listing multiplier
        twitterFollowerBonus?: number, // Bonus for having Twitter followers
        acceptedSuggestionBonus?: number, // Bonus from price suggestions
        mvpDonationBonus?: number, // Bonus from additional donations
        groupMembershipBonus?: number, // Bonus from being a member
        bumpInterval?: number // Interval for bumping listings
    }
}
