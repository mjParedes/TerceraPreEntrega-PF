import { Router } from "express";
import CartManager from '../persistencia/DAOs/mongoManagers/CartManager.js'
import { cartModel } from "../persistencia/DAOs/models/carts.model.js";
import { isLogged } from "../middlewares/auth.middlewares.js";
import { purchase, addProduct } from "../controllers/carts.controller.js";
import { getCartByID } from "../services/carts.service.js";
// import {getTickets,getTicketById, createTicket, resolveTicket} from '../controllers/tickets.controller.js'

const cartManager = new CartManager()

const router = Router()

router.get('/:cid', async (req, res) => {
    const { cid } = req.params
    const cart = await cartModel.findById(cid)
    res.json({ cart })
})

router.get('/', async (req, res) => {
    try {
        const carts = await cartManager.getCarts()
        res.json(carts)
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    const { products } = req.body
    if (!products) {
        res.json({ message: 'Values required' })
    } else {
        const newCart = cartManager.addCart({
            products
        })
        if (!newCart) {
            res.json({ message: 'Error' })
        } else {
            res.json({ message: 'Success', product: newCart })
        }
    }
})

router.post('/addProducts', addProduct)
// router.post('/addProducts', isLogged, async (req, res) => {
//     const { cartId, productId } = req.body
//     const cart = await cartModel.findById(cartId)
//     cart.products.push(productId)
//     cart.save()
//     res.json({ message: 'producto agregado' })
// })

router.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body
    const cart = await cartManager.updateQuantity(cid, pid, quantity)
    res.json({ message: 'Carrito actualizado con exito', carrito: cart })
})

router.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const cart = await cartManager.deleteProductToCart(cid, pid)
    res.json({ message: 'Producto eliminado correctamente', carrito: cart })
})

router.delete('/:cid', async (req, res) => {
    const { cid } = req.params
    const cart = await cartModel.findById(cid)
    cart.products = []
    cart.save()
    res.json({ message: 'Productos eliminados', cart })
})


router.post('/:cid/purchase', purchase)


export default router
