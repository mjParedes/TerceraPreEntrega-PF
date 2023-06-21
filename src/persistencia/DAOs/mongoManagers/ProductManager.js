import { productsModel } from "../models/products.model.js";

export default class ProductsManager {

    async getProducts() {
        try {
            const products = await productsModel.find()
            return products
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async addProduct(objProd) {
        try {
            const newProd = await productsModel.create(objProd)
            return newProd
        } catch (error) {
            console.log(error)
        }
    }

    async getOneProduct(pid) {
        try {
            const product = await productsModel.findById(pid)
            return product
        } catch (error) {
            console.log(error.message)
            throw new Error(error)
        }
    }

    async updateOneProduct(pid, prod) {
        try {
            const updateProduct = await productsModel.findByIdAndUpdate(pid, prod)
            return updateProduct
        } catch (error) {
            console.log(error.message)
            throw new Error(error)
        }
    }

    async deleteOneProduct(pid) {
        try {
            const deleteProduct = await productsModel.findByIdAndDelete(pid)
            return deleteProduct
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
}



