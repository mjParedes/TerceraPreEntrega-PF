import supertest from 'supertest'
import { expect } from "chai";

const userTest = {
    first_name: 'prueba',
    last_name: 'test',
    email: 'ptest@gmail.com',
    password: '12345'
}

const userTest1 = {
    email: 'mjparedes2505@gmail.com',
    password: '12345'
}


const request = supertest('http://localhost:8080')

describe('Test de endpoint de session', function () {

    it('Prueba de registro metodo POST en /users/signup', async function () {
        const response = await request.post('/users/signup').send(userTest)
        console.log(response)
        expect(response.statusCode).to.be.equal(200)
        expect(response.request._data).to.be.an('object')
    })

    it('Prueba de login metodo POST en /users/login', async function () {
        const response = await request.post('/users/login').send(userTest1)
        expect(response.request._data).to.be.an('object')
        expect(response.statusCode).to.be.equal(200)
    })

    it('Prueba de metodo GET en /api/sessions', async function () {
        const response = await request.get('/api/sessions/current')
        // expect(response._body).to.have.property('usuario')
        // expect(response._body).to.have.property('user')
        expect(response.statusCode).to.be.equal(401)
    })

})
