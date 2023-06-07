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
        expect(response._body.message).to.be.equal('Values required')
    })

    it('Probar metodo GET de /api/carts', async function () {
        const response = await request.get('/api/carts')
        expect(response.statusCode).to.be.equal(200)
        expect(response._body).to.not.have.lengthOf(0)
    })

})
