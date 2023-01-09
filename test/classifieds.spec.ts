import { expect } from 'chai'

import Classifieds from '../src/index'

const classifieds = new Classifieds(process.env.USER_TOKEN)

describe('getListings', () => {
    it('should return an array of item listings relevant to the SKU', (done) => {
        classifieds.getListings({ sku: 'Sunbeams Federal Casemaker', callback: (error, response) => {
            if (error) return done(error)

            console.log(response)

            expect(response).to.be.an('object')
            expect(response).to.have.property('listings')

            done()
        }})
    })
})
