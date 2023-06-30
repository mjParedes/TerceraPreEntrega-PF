import { Router } from "express";
import { productsModel } from "../persistencia/DAOs/models/products.model.js";
import { cartModel } from '../persistencia/DAOs/models/carts.model.js';
import { Logged, auth, isAdmin, isLogged, isNOTAdmin, isPremium } from "../middlewares/auth.middlewares.js";
import { getAllProducts } from "../controllers/products.controller.js";
import ProductsManager from "../persistencia/DAOs/mongoManagers/ProductManager.js";
import socketServer from "../app.js";


const router = Router()
const productManager = new ProductsManager()


// GET
router.get('/', async (req, res) => {
    const products = await getAllProducts(req, res)
    res.render('home', { products })
})

router.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts('max')
    socketServer.on('connection', (socket) => {
        socket.emit('products', products)
    })
    res.render('realTimeProducts', { products })
})

router.get('/admin', auth, isAdmin, async (req, res) => {
    try {
        const { limit = 10, page = 1, category } = req.query
        let products
        if (!category) {
            products = await productsModel.find().limit(limit).skip(page - 1).lean()
        } else {
            products = await productsModel.find({ category }).limit(limit).skip(page - 1).lean()
        }
        console.log(products)
        res.render('adminOrPremium', { products, email: req.session.email, first_name: req.session.first_name, last_name: req.session.last_name, role: req.session.role })
    } catch (error) {
        console.log(error)
    }
})

router.get('/premium', auth, isPremium, async (req, res) => {
    try {
        // /?limit=1&page=1
        const { limit = 10, page = 1, category } = req.query //default 10 y 1
        let products
        if (!category) {
            products = await productsModel.find().limit(limit).skip(page - 1).lean()
        } else {
            products = await productsModel.find({ category }).limit(limit).skip(page - 1).lean()
        }
        console.log(products)
        res.render('adminOrPremium', { products, email: req.session.email, first_name: req.session.first_name, last_name: req.session.last_name, role: req.session.role })
    } catch (error) {
        console.log(error)
    }
})

router.get('/products', auth, isNOTAdmin, async (req, res) => {
    try {
        // /?limit=1&page=1
        const { limit = 10, page = 1, category } = req.query //default 10 y 1
        let products
        if (!category) {
            products = await productsModel.find().limit(limit).skip(page - 1).lean()
        } else {
            products = await productsModel.find({ category }).limit(limit).skip(page - 1).lean()
        }
        console.log(products)
        res.render('products', { products, email: req.session.email, first_name: req.session.first_name, last_name: req.session.last_name, role: req.session.role })
    } catch (error) {
        console.log(error)
    }
})

router.get('/carts/:cid', async (req, res) => {
    const { cid } = req.params
    const cart = await cartModel.find({ _id: cid }).lean()
    if (!cart) {
        res.json({ message: 'Cart not found' })
    } else {
        res.render('cart', { cart });
    }
});

router.get('/registro', isLogged, (req, res) => {
    res.render('registro')
})


router.get('/errorRegistro', (req, res) => {
    res.render('errorRegistro')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/errorLogin', (req, res) => {
    res.render('errorLogin')
})

router.get('/forgotPassword', (req, res) => {
    res.render('forgotPass')
})

router.get('/changePassword', (req, res) => {
    res.render('changePassword')
})

router.get('/emailSent', (req, res) => {
    res.render('emailSent')
})

router.get('/perfil', (req, res) => {
    res.render('perfil', { email: req.session.email })
})

router.get('/', (req, res) => {
    res.render('form')
})

router.get('/errorChangePassword', (req, res) => {
    res.render('errorChangePassword')
})

router.get('/successChangePassword', (req, res) => {
    res.render('successChangePassword')
})

router.get('/uploadDocs', Logged, (req, res) => {
    res.render('uploadDocs')
})

router.get('/filesUploaded', (req, res) => {
    res.render('filesUploaded')
})

router.get('/upgradeToPremium', (req, res) => {
    res.render('upgradeToPremium')
})

// POST
router.post('/realtimeproducts', async (req, res) => {
    try {
        const product = await req.body
        console.log('product:', product)
        await productManager.addProduct(product)
        const products = await productManager.getProducts('max')
        socketServer.sockets.emit('products', products)
    } catch (error) {
        return error
    }
})


export default router

