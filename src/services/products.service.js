import ProductManager from '../persistencia/DAOs/mongoManagers/ProductManager.js'


const productManager = new ProductManager()

export async function getProducts(limit, page, title) {
    try {
        const products = await productManager.getProducts(limit, page, title)
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
        if (productFound) {
            return productFound
        } else {
            return 'Producto no encontrado'
        }
    } catch (error) {
        return error
    }
}


export async function updateProductById(idProd, updObj) {
    try {
        const updProduct = await productManager.updateOneProduct(...idProd, updObj)
        return updProduct
    } catch (error) {
        return error
    }
}

export async function deleteProductById(idProd) {
    try {
        const productDelete = await productManager.deleteOneProduct(idProd)
        if(productDelete){
            return productDelete.id
        } else {
            return 'Producto no encontrado'
        }
    } catch (error) {
        return error
    }
}





