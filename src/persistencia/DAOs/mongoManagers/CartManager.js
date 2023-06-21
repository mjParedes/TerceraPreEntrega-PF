import { cartModel } from "../models/carts.model.js";


export default class CartManager {

    async getCarts() {
        try {
            const carts = await cartModel.find()
            if (!carts) {
                return `No existen carts en el sistema`
            } else {
                return carts
            }
        } catch (error) {
            console.log(error)
        }
    }

    async addCart(objCart) {
        try {
            const newCart = await cartModel.create(objCart)
            return newCart
        } catch (error) {
            console.log(error)
        }
    }

    async getCartById(cid) {
        try {
            const cart = await cartModel.findOne({ _id: cid })
            if (cart) {
                return cart
            } else {
                return 'Cart not found'
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async addProductToCart(cid, body) {
        try {
            const cart = await cartModel.findById(cid)
            const products = body.products
            cart.products = [...cart.products, ...products]
            await cart.save()
            const updateCart = await cartModel.findByIdAndUpdate(cid, cart)
            return updateCart
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateQuantity(cid, pid, quantity) {
        try {
            const cart = await cartModel.findById({ _id: cid })
            const product = cart.products.find((p) => p.product.toString() === pid)
            if (!cart) {
                return console.log("Cart not found");
            }
            product.quantity = quantity;
            cart.save();
            return cart
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async emptyCart(cid) {
        try {
            const cart = await cartModel.findById(cid)
            cart.products = []
            await cart.save()
            return cart
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteProductToCart(cid, pid) {
        try {
            const cart = await cartModel.findById(cid)
            const productIndex = cart.products.findIndex(product => product.product.toString() === pid)
            cart.products = await cartModel.deleteOne(productIndex)
            cart.save()
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async deleteCart(cid) {
        try {
            const cart = await cartModel.findByIdAndDelete(cid);
            return cart;
        } catch (error) {
            console.log(error);
        }
    }
}
