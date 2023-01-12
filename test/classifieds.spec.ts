import { expect } from 'chai'

import Classifieds from '../src/index'

const classifieds = new Classifieds(process.env.USER_TOKEN, process.env.API_KEY)

describe('getMyListings', () => {
    it('should return an array of my classifieds listings', (done) => {
        classifieds.getMyListings({ callback: (error, response) => {
            if (error) return done(error)

            console.log(response)

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

describe('createListings', () => {
    it('should', (done) => {
        classifieds.createListings({ callback: (error, response) => {
            if (error) console.log(error)
            if (error) return done(error)

            console.log(response)

            done()
        }})
    })
})
