import { Router } from "express";
import { productsModel } from "../persistencia/DAOs/models/products.model.js";
import { usersModel } from '../persistencia/DAOs/models/users.model.js'
import { changeRole, uploadDocs, signUpUser, loginUser, changePassword, getGithub, logout, deleteAllUsers, getAllUsers, deleteInactiveUsers } from "../controllers/users.controllers.js";
import '../passport/passportStrategies.js'
import passport from "passport";
import { hashPassword, comparePasswords } from "../utils/utils.js";
import { upload } from "../middlewares/multer.js";


const router = Router()


// admin: 'adminCoder@coder.com','adminCod3r123'

// POST
router.post('/registro', signUpUser)

router.post('/login', loginUser)

router.post('/changePassword', changePassword)

const cpUpload = upload.fields([{ name: 'profile', maxCount: 1 }, { name: 'product', maxCount: 10 }, { name: 'identification', maxCount: 1 }, { name: 'address', maxCount: 1 }, { name: 'account', maxCount: 1 }])

router.post('/:uid/documents', cpUpload, uploadDocs)


// PUT
router.put('/premium/:uid', changeRole)


// GET
router.get('/', getAllUsers)

// router.get(
//     '/loginGithub',
//     passport.authenticate('githubRegistro', { scope: ['user:email'] })
// );


// router.get(
//     "/github",
//     passport.authenticate("githubRegistro", { failureRedirect: "/errorLogin" }),
//     getGithub
// );


router.get('/logout', logout)


// DELETE
router.delete('/', deleteInactiveUsers)

router.delete('/deleteAll', deleteAllUsers)



// // GET
// router.get('/products', async (req, res) => {
//     const products = await productsModel.find()
//     res.render('products', products)
// })

// router.get('/current', getOneUser)

// router.get('/', getAllUsers)

// // POST
// router.post('/create', createNewUser)

// // router.post('/:uid/documents', upload.single('profile'), uploadDocs)

// const cpUpload = upload.fields([{ name: 'profile', maxCount: 1 }, { name: 'product', maxCount: 10 }, { name: 'identification', maxCount: 1 }, { name: 'address', maxCount: 1 }, { name: 'account', maxCount: 1 }])

// router.post('/:uid/documents', cpUpload, uploadDocs)

// // PUT
// router.put('/premium/:uid', changeRole)


// //? Mongo
// // ? Registro sin passport
// router.post('/registro', async (req, res) => {
//     const { email, password } = req.body
//     const existeUsuario = await usersModel.find({ email })
//     console.log(existeUsuario)
//     if (existeUsuario) {
//         res.redirect('/api/views/errorRegistro')
//     } else {
//         const hashNewPassword = await hashPassword(password)
//         const newUser = { ...req.body, password: hashNewPassword }
//         await usersModel.create(newUser)
//         res.redirect('/api/views/login')
//     }
// }
// )


// //? Registro con passport
// // router.post('/registro', passport.authenticate('registro', {
// //     failureRedirect: '/views/errorRegistro',
// //     // successRedirect: '/views/products',
// //     // passReqToCallback: true
// // }, (req, res) => {
// //     res.redirect('/views/products')
// // })
// // )


// router.post('/login', async (req, res) => {
//     // req.session = {};
//     const { email, password } = req.body
//     const usuario = await usersModel.find({ email })
//     if (usuario.length !== 0) {
//         // comparar la contraseña
//         const isPassword = await comparePasswords(password, usuario[0].password)
//         if (isPassword) {
//             req.session.email = email
//             req.session.admin = true
//             req.session.logged = true

//             if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
//                 req.session.isAdmin = true
//             } else {
//                 req.session.isAdmin = false
//                 req.session.role = "usuario"

//             }
//             return res.redirect('/api/views/products')
//         }
//     }
//     return res.redirect('/api/views/errorLogin')
// })


// router.get('/logout', (req, res) => {
//     req.session.destroy((error) => {
//         if (error) console.log(error)
//         else res.redirect('/api/views/login')
//     })
// })

// router.put('/changePassword', async (req, res) => {
//     const { email, oldPassword, newPassword } = req.body
//     const usuario = await usersModel.findB({ email })
//     if (usuario.length !== 0) {
//         // comparar la contraseña
//         const isPassword = await comparePasswords(oldPassword, usuario[0].password)
//         if (isPassword) {
//             const user = usuario[0]
//             user.password = await hashPassword(newPassword)
//             await user.save()
//             return res.send('Contraseña actualizada correctamente')
//         }
//     }
//     res.send('Hubo un error')
// })

// // LOGIN GITHUB
router.get('/registroGithub', passport.authenticate('githubRegistro', { scope: ['user:email'] }))

// router.get('/github', passport.authenticate('githubRegistro', { failureRedirect: '/api/views/errorRegistro' }), async (req, res) => {
//     req.session.email = req.user.email
//     res.redirect('/api/views/products')
// })

router.get(
    "/github",
    passport.authenticate("githubRegistro", { failureRedirect: "/api/views/errorLogin" }),
    getGithub
);


export default router
