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

export async function addCart(obj) {
    try {
        const newCart = await cartManager.addCart(obj)
        return newCart
    } catch (error) {
        return error
    }
}

export async function getCartByID(id) {
    try {
        // const idObject = mongoose.Types.ObjectId(id);
        const cart = await cartManager.getCartById(id)
        return cart
    } catch (error) {
        return error
    }
}

