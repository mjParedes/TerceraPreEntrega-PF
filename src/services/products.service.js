import ProductManager from '../persistencia/DAOs/mongoManagers/ProductManager.js'


const productManager = new ProductManager()

export async function getProducts(limit,page,title) {
    try {
        const products = await productManager.getProducts(limit,page,title)
        return products
    } catch (error) {
        return error
    }
}

export async function addOneProduct(product) {
    try {
        const newProduct = await productManager.addProduct(product)
        return newProduct
    } catch (error) {
        return error
    }
}

export async function getProductById(idProd) {
    try {
        const productFound = await productManager.getOneProduct(idProd)
        return productFound
    } catch (error) {
        return error
    }
}

export async function updateProduct(idProd,updObj){
    try {
        const updProduct = await productManager.updateOneProduct(...idProd,updObj)
        return updProduct        
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



