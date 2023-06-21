import CartManager from '../persistencia/DAOs/mongoManagers/CartManager.js'


const cartManager = new CartManager()

export async function getAll() {
    try {
        const carts = await cartManager.getCarts()
        return carts
    } catch (error) {
        return error
    }
}

export async function addOneCart(obj) {
    try {
        const newCart = await cartManager.addCart(obj)
        return newCart
    } catch (error) {
        console.log(error)
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

export async function addOneProduct(cid, pid) {
    try {
        const newProduct = await cartManager.addProductToCart(cid, pid)
        if (newProduct) {
            return newProduct
        } else {
            return 'Producto no existe'
        }
    } catch (error) {
        return error
    }
}

export async function updateProductQuantity(cid, pid, quantity) {
    try {
        const updateProdQ = await cartManager.updateQuantity(cid, pid, quantity)
        return updateProdQ
    } catch (error) {
        return error
    }
}

export async function emptyCart(cid) {
    try {
        const emptyCart = await cartManager.emptyCart(cid)
        return emptyCart
    } catch (error) {
        return error
    }
}

export async function deleteProduct(cid, pid) {
    try {
        const delProd = await cartManager.deleteProductToCart(cid, pid)
        return delProd
    } catch (error) {
        return error
    }
}

export async function deleteCart(cid) {
    try {
        const cartDeleted = await cartManager.deleteCart(cid)
        return cartDeleted
    } catch (error) {
        return error
    }
}

