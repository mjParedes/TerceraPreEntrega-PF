import { Router } from "express";
import ProductsManager from '../persistencia/DAOs/mongoManagers/ProductManager.js'
import { isAdmin, isJustAdmin } from "../middlewares/auth.middlewares.js";
import { addAProduct, getAllProducts, getOneProduct, deleteOneProduct, updateAProduct } from "../controllers/products.controller.js";


const productsManager = new ProductsManager()

const router = Router()


// get
router.get('/', getAllProducts)

router.get('/:pid', getOneProduct)


// post
router.post('/', /*isAdmin*/ addAProduct)


// put
router.put('/:pid', /* isJustAdmin*/ updateAProduct)


// delete
router.delete('/:pid', /*isAdmin,*/ deleteOneProduct)


export default router



