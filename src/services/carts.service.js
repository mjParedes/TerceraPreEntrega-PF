import CartManager from '../persistencia/DAOs/mongoManagers/CartManager.js'

const cartManager = new CartManager()

export async function getCarts() {
    try {
        const carts = await cartManager.getCarts()
        return carts
    } catch (error) {
        return error
    }
}

export async function addCart(objCart) {
    try {
        const newCart = await cartManager.addCart(objCart)
        return newCart
    } catch (error) {
        return error
    }
}

