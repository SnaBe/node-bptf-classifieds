/** The intent for a Classifieds listing. */
export enum EListingIntent {
    BUY, // Only return buy listings
    SELL // Only return sell listings
}

/** Filter Classified listings by their intent. */
export enum ESearchIntent {
    BUY = 'buy', // Filter for buy listings
    SELL = 'sell', // Filter for sell listings
    DUAL = 'dual' // Filter for both listing intents
}
