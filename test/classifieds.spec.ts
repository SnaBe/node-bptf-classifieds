// We'll use Mocha and Chai's expect module for unit testing
import { expect } from 'chai'

// Import the Classifieds module
// Replace this with const Classifieds = require('bptf-classifieds'); if used outside of the module directory
import Classifieds from '../src/index'

// Create a new Classifieds instance using your Backpack.tf credentials
const classifieds = new Classifieds({
    token: process.env.USER_TOKEN, // Your Backpack.tf user token
    apiKey: process.env.API_KEY // Your Backpack.tf API key
})

// Test the type Classifieds class object types
describe('classifieds object', () => {
    // The classifieds object should be an instance of the Classifieds constructor
    it('should match the return type of the constructor', (done) => {
        // The classifieds instance should match the class constructor
        expect(classifieds).to.be.an.instanceof(Classifieds)

        // Call done to end the test when the callback is invoked
        done()
    })

    // The object should contain properties associated with the user's limits
    it('should return an object of limits', (done) => {
        // Get the user limits associated with this Classifieds instance
        classifieds.getUserLimits({ callback: (error, response) => {
            // An error occured during the request
            if (error) return done(error)

            // The response should have status code 200 (ok)
            // it should also be an object
            // and must have a object property named "listings"
            expect(response).to.be.an('object')
            expect(response).to.have.property('listings')

            // The listings object should also have a property named "used"
            // and must be of type number and equal zero
            expect(response?.listings).to.have.property('used')
            expect(response?.listings.used).to.be.a('number')
            expect(response?.listings.used).to.equal(0)

            // Call done to end the test when the callback is invoked
            done()
        }})
    })
})
