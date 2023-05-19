import { productsModel } from "../models/products.model.js";

export default class ProductsManager {
    async getProducts(limit, page, title) {
        try {
            const obj = title
                ? { title }
                : {}
            const products = await productsModel.find(obj).limit(limit).skip((page - 1) * limit)
            return products
        } catch (error) {
            console.log(error)
        }
    }

    async addProduct(objProduct) {
        try {
            const newProd = await productsModel.create(objProduct)
            return newProd
        } catch (error) {
            console.log(error)
        }
    }

    async getOneProduct(idProd) {
        try {
            if (idProd) {
                const foundProduct = await productsModel.findById(idProd)
                console.log(foundProduct)
                return foundProduct
            } else {
                return 'Producto inexistente'
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    async updateOneProduct(idProd, objProd) {
        try {
            if (idProd) {
                const updProduct = await productsModel.updateOne(idProd, objProd)
                return updProduct
            } else {
                return 'Producto no encontrado'
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    async deleteOneProduct(idProd) {
        try {
            if (idProd) {
                const deleteProduct = await productsModel.deleteOne(idProd)
                return deleteProduct
            } else {
                return 'Producto no encontrado'
            }
        } catch (error) {
            console.log(error.message)
        }
    }
}