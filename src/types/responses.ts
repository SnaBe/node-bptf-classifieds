import { ListingElement, Listing } from './common'

export interface DeleteListingsResponse {
    deleted: number,
    skipped: Array<any>,
    errors: Array<any>
}

export interface DeleteListingResponse {
    message: string
}

export interface GetListingResponse {
    id: string,
    steamid: string,
    appid: number,
    currencies: {
        metal?: number,
        keys?: number
    },
    offers?: number,
    buyouy?: number,
    details?: string,
    created: number,
    bump: number,
    intent: 0 | 1,
    item: {
        defindex: number,
        quality: number,
        name: string
    }
}

export interface GetUserListingsResponse {
    results: Array<any>,
    cursor: {
        skip: number,
        limit: number,
        total: number,
        _info: string | null
    }
}

export interface CreateListingResponse {
    message: string
}

export interface DeleteAllListingsResponse {
    message: string
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

export interface SearchResponse {
    response: {
        message: string
    }
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
