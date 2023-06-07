import { Router } from "express";
import ProductsManager from '../persistencia/DAOs/mongoManagers/ProductManager.js'
import { productsModel } from "../persistencia/DAOs/models/products.model.js";
import { isAdmin, isJustAdmin } from "../middlewares/auth.middlewares.js";
import { addAProduct, getAllProducts, getOneProduct, deleteOneProduct } from "../controllers/products.controller.js";


const productsManager = new ProductsManager()

const router = Router()

router.get('/', getAllProducts)

router.post('/',isAdmin, addAProduct)

router.get('/:pid', getOneProduct)

// Aggregation
router.get('/aggregation', async (req, res) => {
    const products = await productsModel.aggregate([
        { $match: { category: 'Electro' } },
        {
            $group: {
                _id: '$category',
                promedio: { $avg: '$price' },
                cantidad: { $sum: '$price' },
            },
        },
        {
            $sort: { cantidad: 1 }
        },
    ])
    res.json({ products })
})


router.delete('/:pid', /*isAdmin,*/ deleteOneProduct)


export default router



