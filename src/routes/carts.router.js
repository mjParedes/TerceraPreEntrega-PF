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

router.put('/:cid', addProductToCart)

router.put('/:cid/product/:pid', updateProductsQuantity)

// delete

router.delete('/:cid/product/:pid', deleteProdsFromCart)

router.delete('/:cid', emptyCartById)

router.delete('/delete/:cid', deleteCart)


export default router



