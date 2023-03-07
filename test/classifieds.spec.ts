import { expect } from 'chai'

import Classifieds, { CreatableListing } from '../src/index'

const classifieds = new Classifieds(process.env.USER_TOKEN, process.env.API_KEY)

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

const listings: Array<CreatableListing> = [
    {
        intent: 0,
        item: {
            quality: 'Unique',
            item_name: 'Trencher\'s Tunic'
        },
        details: 'Only buying 1 Tunic.',
        currencies: {
            metal: 4.77,
            keys: 0
        }
    }
]

describe('createListings', () => {
    it('should', (done) => {
        classifieds.createListings({ listings, callback: (error, response) => {
            if (error) return done(error)

            expect(response).to.be.an('object')
            expect(response).to.have.property('listings')

            done()
        }})
    })
})
