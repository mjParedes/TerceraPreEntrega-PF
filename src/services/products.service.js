import ProductManager from '../dao/mongoManagers/ProductManager.js'


const productManager = new ProductManager()

export async function getProducts() {
    try {
        const products = await productManager.getProducts()
        return products
    } catch (error) {
        return error
    }
}

export async function addProduct(objProduct) {
    try {
        const newProduct = await productManager.addProduct(objProduct)
        return newProduct
    } catch (error) {
        return error
    }
}

export async function getProductById(idProd) {
    try {
        const productFound = await productManager.getProductsById(idProd)
        return productFound
    } catch (error) {
        return error
    }
}

export async function deleteProduct(idProd) {
    try {
        const productDelete = await productManager.deleteProduct(idProd)
        return productDelete.id
    } catch (error) {
        return error
    }
}



