import { productsModel } from "../persistencia/DAOs/models/products.model.js";
import { getProducts, addOneProduct, getProductById, deleteProductById, updateProductById } from "../services/products.service.js";


export async function getAllProducts(req, res) {
    const { limit = 5, page = 1, title } = req.query
    const productsFilter = await getProducts(limit, page, title)

    if (!productsFilter) {
        res.json({ status: 'Error' })
    } else {
        res.json({ status: 'Success', productsFilter })
    }
}

export async function addAProduct(req, res) {
    const { title, description, code, price, stock, category } = req.body
    if (!title || !description || !code || !price || !stock || !category) {
        res.json({ message: 'Values required' })
    } else {
        const newProduct = await addOneProduct({
            title,
            description,
            code,
            price,
            stock,
            category
        })
        if (!newProduct) {
            res.json({ message: 'Error' })
        } else {
            res.json({ message: 'Success', product: newProduct })
        }
    }
}

export async function getOneProduct(req, res) {
    const { pid } = req.params
    try {
        const product = await getProductById(pid)
        if (product) {
            res.status(200).json({ message: 'Producto encontrado con exito', product })
        } else {
            res.status(400).json({ message: 'No existe producto con ese ID' })
        }
    } catch (error) {
        res.send(error)
    }
}

export async function deleteOneProduct(req, res) {
    const { pid } = req.params
    try {
        const product = await deleteProductById(pid)
        if (product) {
            console.log(product)
            res.status(200).json({ message: 'Producto eliminado con exito', product })
        } else {
            res.status(400).json({ message: 'No existe producto con ese ID' })
        }
    } catch (error) {
        res.send(error)
    }
}





