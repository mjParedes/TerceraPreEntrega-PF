import { Router } from "express";
import ProductsManager from '../persistencia/DAOs/mongoManagers/ProductManager.js'
import { productsModel } from "../persistencia/DAOs/models/products.model.js";
import { isAdmin } from "../middlewares/auth.middlewares.js";
import { addAProduct, getAllProducts } from "../controllers/products.controller.js";


const productsManager = new ProductsManager()

const router = Router()

router.get('/', getAllProducts)

router.post('/', addAProduct)


router.get('/:pid', async (req, res) => {
    const { pid } = req.params
    try {
        const product = await productsManager.getProductsById(pid)
        if (product) {
            res.status(200).json({ message: 'Producto encontrado con exito', product })
        } else {
            res.status(400).json({ error: 'No existe producto con ese ID' })
        }
    } catch (error) {
        res.send(error)
    }
})

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

router.delete('/:pid', isAdmin, async (req, res) => {
    const { pid } = req.params
    const product = await productsManager.deleteProduct(parseInt(pid))
    res.json({ message: 'Producto eliminado con exito', product })
})

export default router



