import { getCarts, addCart, getCartByID } from "../services/carts.service.js";

export async function purchase(req, res) {
    try {
        const { cid } = req.params
        console.log(cid)
        const cart = await getCartByID(cid)
        console.log(cart)
        if (!cart) {
            res.json({ message: 'Carrito no encontrado' })
        }
        const products = cart.products.map((p) => p._id)
        if (!products) {
            res.json({ message: 'El carrito esta vacio' })
        } else {
            // res.json({ message: 'Success' })
            res.json(products)
        }
    } catch (error) {
        res.status(500).json({error})
    }
}


