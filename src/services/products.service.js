import ProductManager from '../persistencia/DAOs/mongoManagers/ProductManager.js'


const productManager = new ProductManager()

export async function getProducts() {
    try {
        const products = await productManager.getProducts()
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

export async function getProductById(pid) {
    try {
        const productFound = await productManager.getOneProduct(pid)
        if (productFound) {
            return productFound
        } else {
            return 'Producto no encontrado'
        }
    } catch (error) {
        return error
    }
}


export async function updateProductById(pid, prod) {
    try {
        const updateProduct = await productManager.updateOneProduct(pid, prod)
        return updateProduct
    } catch (error) {
        return error
    }
}

export async function deleteProductById(pid) {
    try {
        const deletedProd = await productManager.deleteOneProduct(pid)
        return deletedProd
    } catch (error) {
        return error
    }
}





