import { getProducts, addProduct, getProductById, deleteProduct } from "../services/products.service";

export async function getAllProducts(req, res) {
    try {
        const products = await getProducts()
        if (products) {
            res.json(products)
        } else {
            res.json({ message: 'No existen productos' })
        }
    } catch (error) {
        res.json({ error })
    }
}

export async function addAProduct(req,res){
    try {
        
    } catch (error) {
        res.json({error})
    }
}