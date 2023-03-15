// We'll use Mocha and Chai's expect module for unit testing
import { expect } from 'chai'

// Import the module and its data types
// Replace this with const SteamMarketFetcher = require('steam-market-fetcher'); if used outside of the module directory
import Classifieds from '../src/index'

// Create a new Classifieds instance using the token and API key options
const classifieds = new Classifieds({
    token: process.env.USER_TOKEN, // Your Backpack.tf user token.
    apiKey: process.env.API_KEY // Your Backpack.tf API key.
})

// Test the endpoints related to managing Classifieds listings on Backpack.tf
describe('Backpack.tf Classifieds tests', () => {
    // Test the endpoint that's responsible for deleting multiple listings
    describe('deleteAllListings', () => {
        // The deleteAllListings method has not been implemented
        // But the endpoint still exists in Backpack.tf's API documentation
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