import { Router } from "express";
import { productsModel } from "../persistencia/DAOs/models/products.model.js";
import { usersModel } from '../persistencia/DAOs/models/users.model.js'
import { getAllUsers, createNewUser } from "../controllers/users.controllers.js";
import '../passport/passportStrategies.js'
import passport from "passport";
import { hashPassword, comparePasswords } from "../utils.js";


const router = Router()

router.get('/products', async (req, res) => {
    const products = await productsModel.find()
    res.render('products', products)
})

router.get('/current',)

router.get('/', getAllUsers)

router.post('/create', createNewUser)


//? Mongo
// ? Registro sin passport
router.post('/registro', async (req, res) => {
    const { email, password } = req.body
    const existeUsuario = await usersModel.find({ email })
    console.log(existeUsuario)
    if (existeUsuario.length !== 0) {
        res.redirect('/views/errorRegistro')
    } else {
        const hashNewPassword = await hashPassword(password)
        const newUser = { ...req.body, password: hashNewPassword }
        await usersModel.create(newUser)
        res.redirect('/views/login')
    }
}
)


//? Registro con passport
// router.post('/registro', passport.authenticate('registro', {
//     failureRedirect: '/views/errorRegistro',
//     // successRedirect: '/views/products',
//     // passReqToCallback: true
// }, (req, res) => {
//     res.redirect('/views/products')
// })
// )


router.post('/login', async (req, res) => {
    // req.session = {};
    const { email, password } = req.body
    const usuario = await usersModel.find({ email })
    if (usuario.length !== 0) {
        // comparar la contraseña
        const isPassword = await comparePasswords(password, usuario[0].password)
        if (isPassword) {
            req.session.email = email
            req.session.admin = true
            req.session.logged = true

            if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
                req.session.isAdmin = true
            } else {
                req.session.isAdmin = false
                req.session.role = "usuario"

            }
            return res.redirect('/api/views/products')
        }
    }
    return res.redirect('/api/views/errorLogin')
})


router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) console.log(error)
        else res.redirect('/api/views/login')
    })
})

router.put('/changePassword', async (req, res) => {
    const { email, oldPassword, newPassword } = req.body
    const usuario = await usersModel.findB({ email })
    if (usuario.length !== 0) {
        // comparar la contraseña
        const isPassword = await comparePasswords(oldPassword, usuario[0].password)
        if (isPassword) {
            const user = usuario[0]
            user.password = await hashPassword(newPassword)
            await user.save()
            return res.send('Contraseña actualizada correctamente')
        }
    }
    res.send('Hubo un error')
})

// LOGIN GITHUB
router.get('/registroGithub', passport.authenticate('githubRegistro', { scope: ['user:email'] }))
router.get('/github', passport.authenticate('githubRegistro', { failureRedirect: '/views/errorRegistro' }), async (req, res) => {
    req.session.email = req.user.email
    res.redirect('/api/views/products')
})

export default router