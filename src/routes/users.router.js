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

router.get('/logout', logout)


// DELETE
router.delete('/', deleteInactiveUsers)

router.delete('/deleteAll', deleteAllUsers)



// LOGIN GITHUB
router.get('/registroGithub', passport.authenticate('githubRegistro', { scope: ['user:email'] }))

router.get(
    "/github",
    passport.authenticate("githubRegistro", { failureRedirect: "/api/views/errorLogin" }),
    getGithub
);


export default router
