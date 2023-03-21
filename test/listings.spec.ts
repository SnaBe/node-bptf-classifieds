// Import Mocha and Chai's expect module for unit testing
import { expect } from 'chai'

// Import the Classifieds module and its data types
// Replace this with const Classifieds = require('bptf-classifieds'); if used outside of the module directory
import Classifieds, { CreatableListing } from '../src/index'

// Create a new Classifieds instance using the token and API key options
const classifieds = new Classifieds({
    token: process.env.USER_TOKEN, // Your Backpack.tf user token.
    apiKey: process.env.API_KEY // Your Backpack.tf API key.
})

// Test the endpoints related to managing Classifieds listings on Backpack.tf
describe('Backpack.tf Classifieds tests', () => {
    // Search for specific items listed on Backpack.tf 
    describe.skip('search', () => {
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
    // and requires certain properties for both Classifieds intents
    const listings: Array<CreatableListing> = [
        {
            intent: 0, // 0 = Buy, 1 = Sell
            item: { // The item object associated with the listing
                quality: 'Unique', // Unique, Strange, Unusual, ...
                item_name: 'Trencher\'s Tunic' // Any valid market_hash_name (appid 440)
            },
            details: 'Only buying 1 Tunic.', // Description of classifieds listing
            currencies: { // The buy price for the listing item
                metal: 4.77, // Refined, Reclaimed and Scrap metal
                keys: 0 // Mann Co. Supply Crate Keys
            }
        },
        {
            intent: 0, // 0 = Buy, 1 = Sell
            item: { // // The item object associated with the listing
                quality: 'Strange', // Unique, Strange, Unusual, ...
                item_name: 'Sniper Rifle' // Any valid market_hash_name (appid 440)
            },
            details: 'I will pay extra for parts.',
            currencies: { // The buy price for the listing item
                metal: 34.66, // Refined, Reclaimed and Scrap metal
                keys: 0 // Mann Co. Supply Crate Keys
            }
        }
    ]

    // Create a number of classifieds listings on Backpack.tf
    describe('createListings', () => {
        // The request should result in the creation of two classifieds listings
        it('should create 2 classifieds listings', (done) => {
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

    describe('getMyListings', () => {
        it('should return an array of the session user\'s classifieds listings', (done) => {
            classifieds.getMyListings({ callback: (error, response) => {
                if (error) return done(error)
    
                expect(response).to.be.an('object')
    
                done()
            }})
        })
    })
    
    describe('getListings', () => {
        it('should return an array of item listings relevant to the SKU', (done) => {
            classifieds.getListings({ sku: 'Sunbeams Federal Casemaker', callback: (error, response) => {
                if (error) return done(error)
    
                expect(response).to.be.an('object')
                expect(response).to.have.property('listings')
    
                done()
            }})
        })
    })

    describe('getListing', () => {
        it('should return a listing object that matches the id', (done) => {
            done()
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
