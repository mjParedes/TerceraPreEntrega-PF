import { Router } from "express";
import { productsModel } from "../persistencia/DAOs/models/products.model.js";
import { auth, isLogged } from "../middlewares/auth.middlewares.js";


const router = Router()


router.get('/registro', (req, res) => {
    res.render('registro')
})


router.get('/errorRegistro', (req, res) => {
    res.render('errorRegistro')
})


router.get('/login', (req, res) => {
    res.render('login')
})


router.get('/products', async (req, res) => {
    const products = await productsModel.find()
    res.render('products', { email: req.session.email })
})


router.get('/perfil', (req, res) => {
    res.render('perfil', { email: req.session.email })
})


router.get('/errorLogin', (req, res) => {
    res.render('errorLogin')
})

router.get('/', (req, res) => {
    res.render('form')
})

router.get('/changePassword', (req,res)=>{
    res.render('changePassword')
})


export default router

