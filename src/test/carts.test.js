import supertest from 'supertest'
import { expect } from "chai";

const request = supertest('http://localhost:8080')


const prod = {
    products: [
        {
            _id: "63e445cf5b322796099c7a0e",
            quantity: 1
        }
    ]
}

describe('Tests de endpoints de Carts', function () {

    it('Probando metodo POST de /api/carts', async function () {
        const response = await request.post('/api/carts')
        expect(response.statusCode).to.be.equal(200)
        expect(response._body.message).to.be.equal('Cart created successfully')
        expect(response._body).to.have.property('newCart')
        expect(response._body.newCart).to.have.property('_id')
    })

    it('Probar metodo GET de /api/carts', async function () {
        const response = await request.get('/api/carts')
        expect(response.statusCode).to.be.equal(200)
        expect(response._body).to.be.an('array')
        expect(response._body).to.not.have.lengthOf(0)
    })

    it('Probar metodo GET de /api/carts/:cid', async function () {
        const create = await request.post('/api/carts')
        const cid = create._body.newCart._id
        const cartdb = await request.get(`/api/carts/${cid}`)
        expect(cartdb.statusCode).to.be.equal(200)
        expect(cartdb._body).to.have.property('cart')
        expect(cartdb._body.cart).to.have.property('_id')
    })

    it('Probar metodo DELETE de /api/carts/:cid', async function () {
        const create = await request.post('/api/carts')
        const cid = create._body.newCart._id
        const response = await request.delete(`/api/carts/${cid}`)
        expect(response.statusCode).to.be.equal(200)
        expect(response._body.message).to.be.equal('cart emptied successfully')
        expect(response._body).to.have.property('cartEmpty')
    })
})
