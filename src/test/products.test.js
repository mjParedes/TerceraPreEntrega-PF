import supertest from 'supertest'
import { expect } from "chai";

const request = supertest('http://localhost:8080')

const prod = {
    title: "PlayStation 5",
    description: "Consola UltraSlim 1TB",
    price: 240000,
    stock: 53,
    category: "Electro"
}

const prod1 = {
    title: 'PlayStation 4',
    description: 'Consola UltraSlim 500GB',
    price: 105000,
    stock: 49,
    category: 'Electro'
}

const admin = {
    email: 'adminCoder@coder.com',
    password: 'adminCod3r123'
}

describe('Tests de endpoints de Products', function (done) {

    it('Probando metodo POST de /api/products', async function () {
        const response = await request.post('/api/products').send(prod)
        console.log(response)
        expect(response.statusCode).to.be.equal(200)
        expect(response._body.message).to.be.equal('Product added successfully')
    })

    it('Probar metodo GET de /api/products', async function () {
        const response = await request.get('/api/products')
        expect(response.statusCode).to.be.equal(200)
        expect(response._body).to.be.an('array')
        expect(response._body).to.not.have.lengthOf(0)
    })

    it('Probar metodo GET de /api/products/:pid', async function () {
        const create = await request.post('/api/products').send(prod1)
        const pid = create._body.addNewProd._id
        const proddb = await request.get(`/api/products/${pid}`)
        expect(proddb._body.product.title).to.be.equal(prod1.title)
        expect(proddb._body.product).to.have.property('code')
        expect(proddb._body.product).to.have.property('owner')
    })

    it('Probar metodo PUT de /api/products/:pid', async function () {
        const create = await request.post('/api/products').send(prod)
        const pid = create._body.addNewProd._id
        const login = await request.post('/users/login').send(admin)
        const response = await request.put(`/api/products/${pid}`).send({ title: 'iphone 16' })
        const proddb = await request.get(`/api/products/${pid}`)
        expect(response.statusCode).to.be.equal(200)
        expect(response._body.message).to.be.equal('Product updated successfully')
        expect(response._body).to.have.property('updatedProd')
        expect(proddb.title).to.not.be.equal(prod.title)
    })

    it('Probar metodo DELETE de /api/products/:pid', async function () {
        const create = await request.post('/api/products').send(prod)
        const pid = create._body.addNewProd._id
        const login = await request.post('/users/login').send(admin)
        const response = await request.delete(`/api/products/${pid}`)
        expect(response.statusCode).to.be.equal(200)
        expect(response._body.message).to.be.equal('Product deleted successfully')
        expect(response._body).to.have.property('deleteProd')
    })

})
