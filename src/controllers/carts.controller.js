import { getCarts, addCart, getCartByID, addOneProduct } from "../services/carts.service.js";
import ProductsManager from '../persistencia/DAOs/mongoManagers/ProductManager.js'

const productManager = new ProductsManager()

export async function addProduct(req, res) {
    const { cartId, productId } = req.body
    try {
        const productAdded = await addOneProduct(cartId, productId)
        res.json({ message: 'producto agregado', productAdded })
    } catch (error) {
        res.json({ message: 'producto no encontrado' })
    }
}

export async function purchase(req, res) {
    try {
        const { cid } = req.params
        const cart = await getCartByID(cid)
        if (!cart) {
            res.json({ message: 'Carrito no encontrado' })
        }
        // const products = await Promise.all(cart.products.map(async (p) => await productManager.getProductById(p._id)))
        const array = []
        for (let i = 0; i < cart.products.lenght; i++) {
            array.push(await productManager.getProductById(cart.products[i]._id))

        }
        console.log(array)
        if (!products) {
            res.json({ message: 'El carrito esta vacio' })
        } else {
            // res.json({ message: 'Success' })
            res.json(products)
        }
    } catch (error) {
        res.status(500).json({ error })
    }
}


