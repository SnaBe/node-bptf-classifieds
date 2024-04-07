// Import Mocha and Chai's expect module for unit testing
import { expect } from 'chai'

// Import the Classifieds module and its relevant data types
// Replace this with import Classifieds from 'bptf-classifieds'; if used outside of the module directory
import { Classifieds, CreatableListing } from '../src/index'

// Create a new Classifieds instance using the token and API key options
const classifieds = new Classifieds({
    token: process.env.USER_TOKEN, // Your Backpack.tf user token.
    apiKey: process.env.API_KEY // Your Backpack.tf API key.
})

// Test the endpoints related to managing Classified listings on Backpack.tf
describe('Backpack.tf Classified tests', () => {
    // Search for specific items listed on Backpack.tf 
    describe.skip('search Classified listings using premium filters', () => {
        // The search endpoint is only for premium users
        it('should return listings that match the search parameters', (done) => {
            // Attemt to search for classifieds listings
            classifieds.search({ intent: 'buy', item: 'Strange All-Father', callback: (error, response) => {
                // An error occured during the search
                if (error) return done(error)

                // The response should have status code 200 (ok)
                // it should also be an object
                // and must have a property named "message" of type string
                expect(response).to.be.an('object')
                expect(response).to.have.property('message')
                expect(response?.response.message).to.be.a('string')

                // Call done to end the test when the callback is invoked
                done()
            }})
        })
    })

    // An array of creatable listing objects
    // and requires certain properties for both Classified intents
    const listings: Array<CreatableListing> = [
        {
            intent: 0, // 0 = Buy, 1 = Sell
            item: { // The item object associated with the listing
                quality: 'Unique', // Unique, Strange, Unusual, ...
                item_name: 'Trencher\'s Tunic' // Any valid market_hash_name (appid 440)
            },
            details: 'Only buying 1 Trencher\'s Tunic.', // Description of classified listing
            currencies: { // The buy price for the listing item
                metal: 4.77, // Refined, Reclaimed and Scrap metal
                keys: 0 // Mann Co. Supply Crate Keys
            }
        },
        {
            intent: 0, // 0 = Buy, 1 = Sell
            item: { // The item object associated with the listing
                quality: 'Strange', // Unique, Strange, Unusual, ...
                item_name: 'Sniper Rifle' // Any valid market_hash_name (appid 440)
            },
            details: 'I will pay extra for Strange parts.',
            currencies: { // The buy price for the listing item
                metal: 34.66, // Refined, Reclaimed and Scrap metal
                keys: 0 // Mann Co. Supply Crate Keys
            }
        }
    ]

    // Create a number of Classified listings on Backpack.tf
    describe('createListings', () => {
        // The request should result in the creation of two Classified listings
        it('should create 2 classified listings', (done) => {
            // Create a listing for each object stored in the listings array
            classifieds.createListings({ listings, callback: (error, response) => {
                // An error occured during the creation process
                if (error) return done(error)
    
                // The response should have status code 200 (ok)
                // it should also be an object
                // and must have a property named "listings"
                expect(response).to.be.an('object')
                expect(response).to.have.property('listings')
    
                // Call done to end the test when the callback is invoked
                done()
            }})
        })
    })

    // An array of listings ids from the creatable listing objects
    let ids: string[] = []

    // Get the Classified listings created by this Classifieds instance
    describe('getMyListings', () => {
        // The request should return an array of Classified listings owned by this instance
        it('should return an array of the session user\'s classifieds listings', (done) => {
            // Get the session user's classified listings
            classifieds.getMyListings({ callback: (error, response) => {
                // An error occured during the request
                if (error) return done(error)

                // The response should have status code 200 (ok)
                // it should also be an object
                // and must have a property named "listings"
                // and it should also be an array of length 2
                expect(response).to.be.an('object')
                expect(response).to.have.property('listings')
                expect(response?.listings).to.be.an('array')
                expect(response?.listings).to.have.length(2)

                // Map the listings ID properties into a new array
                if (response?.listings) ids = response.listings.map(listing => listing.id)
                
                // Call done to end the test when the callback is invoked
                done()
            }})
        })
    })

    // Delete the second listing from Backpack.tf
    describe('deleteListing', () => {
        // The request should result in the deletion of a Classified listing
        it('should delete the listing that matches the id', (done) => {
            // Delete a Classified listing by its id
            classifieds.deleteListing({ id: ids[1], callback: (error, response) => {
                // An error occured during the deletion process
                if (error) return done(error)

                // The response should have status code 204 (No Content)
                // it should also be a number
                expect(response).to.be.a('number')
                expect(response).to.equal(204)

                // Remove the last listing id from the array
                ids.pop()

                // Call done to end the test when the callback is invoked
                done()
            }})
        })
    })

    // Get a Classified listing by its ID
    describe('getListing', () => {
        // The request should return the listing object that matches the ID
        it('should return a listing object that matches the id', (done) => {
            // Get a Classified listing by its ID
            classifieds.getListing({ id: ids[0], callback: (error, response) => {
                // An error occured during the request
                if (error) return done(error)

                // The response should have status code 200 (ok)
                // it should also be an object
                // and must have a property named "currencies"
                // along with a nested property named "metal"
                // that should be a number and equal the listing price
                expect(response).to.be.an('object')
                expect(response).to.have.property('currencies')
                expect(response?.currencies).to.have.property('metal')
                expect(response?.currencies.metal).to.be.a('number')
                expect(response?.currencies.metal).to.equal(listings[0].currencies.metal)

                // Call done to end the test when the callback is invoked
                done()
            }})
        })
    })

    // Delete the remaining listings from Backpack.tf
    describe('deleteListings', () => {
        // The request should result in the deletion of multiple Classified listings
        it('should delete the remaining listings that matches the IDs', (done) => {
            // Delete multiple Classified listings by their IDs
            classifieds.deleteListings({ ids, callback: (error, response) => {
                // An error occured during the deletion process
                if (error) return done(error)

                // The response should have status code 200 (ok)
                // it should also be an object
                // and must have a property named "deleted"
                // and it should also equal 1
                expect(response).to.be.an('object')
                expect(response).to.have.property('deleted')
                expect(response?.deleted).to.be.a('number')
                expect(response?.deleted).to.equal(1)

                // Remove the remaining listing id from the array
                ids.pop()

                // Expect the list of IDs to be empty
                expect(ids).to.have.length(0)

                // Call done to end the test when the callback is invoked
                done()
            }})
        })
    })

    // Classified listing object for a Unique Assassin's Attire
    const listing: CreatableListing = {
        intent: 0, // 0 = Buy, 1 = Sell
        item: { // The item object associated with the listing
            quality: 'Unique', // Unique, Strange, Unusual, ...
            item_name: 'Assassin\'s Attire' // Any valid market_hash_name (appid 440)
        },
        details: 'I prefer pure, but will also accept item overpay.',
        currencies: { // The buy price for the listing item
            metal: 34.66, // Refined, Reclaimed and Scrap metal
            keys: 0 // Mann Co. Supply Crate Keys
        }
    }

    // Create a single Classified listing on Backpack.tf
    describe.skip('createListing', () => {
        // The request should return a copy of the listing created
        it('should create a single Classified listing', (done) => {
            // Create a buy listing for a single Assassin's Attire
            classifieds.createListing({ listing, callback: (error, response) => {
                // An error occured during the creation process
                if (error) return done(error)

                // The response should have status code 200 (ok)
                // it should also be an object
                expect(response).to.be.an('object')

                // Call done to end the test when the callback is invoked
                done()
            }})
        })
    })
    
    // Get any number of Classified listings matching the item parameters
    describe('getListings', () => {
        it('should return an array of item listings relevant to the item SKU', (done) => {
            classifieds.getListings({ sku: 'Sunbeams Federal Casemaker', callback: (error, response) => {
                // An error occured during the request
                if (error) return done(error)

                // The response should have status code 200 (ok)
                // it should also be an object
                // and must have a property named "listings"
                // and it should be an array with any length
                expect(response).to.be.an('object')
                expect(response).to.have.property('listings')
                expect(response?.listings).to.be.an('array')
    
                // Call done to end the test when the callback is invoked
                done()
            }})
        })
    })

    // Test the endpoint that's responsible for deleting multiple listings
    describe('deleteAllListings', () => {
        // The deleteAllListings method has not been implemented
        // but the endpoint still exists in Backpack.tf's API documentation
        it('should return a status code of 501 Not Implemented', (done) => {
            // Attempt to delete all the listings associated with the user token
            classifieds.deleteAllListings({ callback: (error, response) => {
                // Expect the response object to be null
                // and the error to be an object
                expect(response).to.be.null
                expect(error).to.be.an('object')
    
                // Expect the name, stack and message properties to exist
                expect(error?.name).to.exist
                expect(error?.stack).to.exist
                expect(error?.message).to.exist
                
                // Call done to end the test when the callback is invoked
                done()
            }})
        })
    })
})
