import { Router } from "express";
import CartManager from '../persistencia/DAOs/mongoManagers/CartManager.js'
import { cartModel } from "../persistencia/DAOs/models/carts.model.js";
import { isLogged } from "../middlewares/auth.middlewares.js";
import { getAllCarts, getOneCart, addCart, purchaseCart, addProductToCart, updateProductsQuantity, deleteProdsFromCart, emptyCartById, deleteCart } from "../controllers/carts.controller.js";
// import { getCartByID } from "../services/carts.service.js";
// import {getTickets,getTicketById, createTicket, resolveTicket} from '../controllers/tickets.controller.js'

const cartManager = new CartManager()

const router = Router()

// get

router.get('/', getAllCarts)

router.get('/:cid', getOneCart)

// post

router.post('/', addCart)

router.post('/:cid/purchase', purchaseCart)

// put

router.put('/cid', addProductToCart)

router.put('/cid/product/:pid', updateProductsQuantity)

// delete

router.delete('/:cid/product/pid', deleteProdsFromCart)

router.delete('/:cid', emptyCartById)

router.delete('/delete/:cid', deleteCart)


export default router



// router.get('/:cid', async (req, res) => {
//     const { cid } = req.params
//     const cart = await cartModel.findById(cid)
//     res.json({ cart })
// })

// router.get('/', async (req, res) => {
//     try {
//         const carts = await cartManager.getCarts()
//         res.json(carts)
//     } catch (error) {
//         console.log(error)
//     }
// })

// router.post('/', async (req, res) => {
//     const { products } = req.body
//     if (!products) {
//         res.json({ message: 'Values required' })
//     } else {
//         const newCart = await cartManager.addCart({
//             products
//         })
//         res.json({ message: 'carro creado exitosamente', newCart })
//         if (!newCart) {
//             res.json({ message: 'Error' })
//         } else {
//             res.json({ message: 'Success', newCart })
//         }
//     }
// })

// router.post('/addProducts', addProduct)
// // router.post('/addProducts', isLogged, async (req, res) => {
// //     const { cartId, productId } = req.body
// //     const cart = await cartModel.findById(cartId)
// //     cart.products.push(productId)
// //     cart.save()
// //     res.json({ message: 'producto agregado' })
// // })

// router.put('/:cid/products/:pid', async (req, res) => {
//     const { cid, pid } = req.params
//     const { quantity } = req.body
//     const cart = await cartManager.updateQuantity(cid, pid, quantity)
//     res.json({ message: 'Carrito actualizado con exito', carrito: cart })
// })

// router.delete('/:cid/products/:pid', async (req, res) => {
//     const { cid, pid } = req.params
//     const cart = await cartManager.deleteProductToCart(cid, pid)
//     res.json({ message: 'Producto eliminado correctamente', carrito: cart })
// })

// router.delete('/:cid', async (req, res) => {
//     const { cid } = req.params
//     const cart = await cartModel.findById(cid)
//     cart.products = []
//     cart.save()
//     res.json({ message: 'Productos eliminados', cart })
// })


// router.post('/:cid/purchase', purchase)


