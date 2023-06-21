import { productsModel } from "../persistencia/DAOs/models/products.model.js";
import { getProducts, addOneProduct, getProductById, deleteProductById, updateProductById } from "../services/products.service.js";
import logger from '../utils/winston.js'
import { generateCode } from "../utils/utils.js";
import jwt from 'jsonwebtoken'
import config from "../config.js";
import { cookies } from "./users.controllers.js";
import CustomError from '../utils/errors/customError.js'
import { ErrorsCause, ErrorsMessage, ErrorsName } from '../utils/errors/errors.enum.js'




export async function getAllProducts(req, res) {
    try {
        const { limit = 10, page = 1, category } = req.query //default 10 y 1
        const getProds = await getProducts()
        const productsInfo = await productsModel.paginate({ category }, { limit, page })
        if (!limit || !page || !category) {
            res.json(getProds)
        } else {
            if (productsInfo.hasPrevPage === false) {
                if (productsInfo.hasNextPage === false) {
                    res.json({
                        status: 'excitoso',
                        payload: productsInfo.docs,
                        totalPages: productsInfo.totalPages,
                        prevPage: productsInfo.prevPage,
                        nextPage: productsInfo.nextPage,
                        page: productsInfo.page,
                        hasPrevPage: productsInfo.hasPrevPage,
                        hasNextPage: productsInfo.hasNextPage,
                        prevLink: null,
                        nextLink: null
                    })
                } else {
                    res.json({
                        status: 'excitoso',
                        payload: productsInfo.docs,
                        totalPages: productsInfo.totalPages,
                        prevPage: productsInfo.prevPage,
                        nextPage: productsInfo.nextPage,
                        page: productsInfo.page,
                        hasPrevPage: productsInfo.hasPrevPage,
                        hasNextPage: productsInfo.hasNextPage,
                        prevLink: null,
                        nextLink: `localhost:8080/api/products/?page=${productsInfo.nextPage}`
                    })
                }
            } else {
                if (productsInfo.hasNextPage === false) {
                    res.json({
                        status: 'excitoso',
                        payload: productsInfo.docs,
                        totalPages: productsInfo.totalPages,
                        prevPage: productsInfo.prevPage,
                        nextPage: productsInfo.nextPage,
                        page: productsInfo.page,
                        hasPrevPage: productsInfo.hasPrevPage,
                        hasNextPage: productsInfo.hasNextPage,
                        prevLink: `localhost:8080/api/products/?page=${productsInfo.prevPage}`,
                        nextLink: null
                    })
                } else {
                    res.json({
                        status: 'excitoso',
                        payload: productsInfo.docs,
                        totalPages: productsInfo.totalPages,
                        prevPage: productsInfo.prevPage,
                        nextPage: productsInfo.nextPage,
                        page: productsInfo.page,
                        hasPrevPage: productsInfo.hasPrevPage,
                        hasNextPage: productsInfo.hasNextPage,
                        prevLink: `localhost:8080/api/products/?page=${productsInfo.prevPage}`,
                        nextLink: `localhost:8080/api/products/?page=${productsInfo.nextPage}`
                    })
                }
            }
        }
    } catch (error) {
        logger.fatal('Error in getAllProducts')
        CustomError.createCustomError({
            name: ErrorsName.GET_PRODUCTS_ERROR,
            message: ErrorsMessage.GET_PRODUCTS_ERROR,
            cause: ErrorsCause.GET_PRODUCTS_ERROR
        })
    }
}

export async function addAProduct(req, res) {
    try {
        const { title, description, price, stock, category, owner } = req.body
        if (!title || !description || !price || !stock || !category) {
            logger.error('Product incomplete')
            logger.warning('Some values are missing, check it out.')
            res.send('Product incomplete')
        }
        if (owner === "") {
            const owner = 'adminCoder@coder.com'
            const product = { ...req.body, owner: owner, code: generateCode() }
            const addNewProd = await addOneProduct(product)
            if (addNewProd) {
                logger.info('Product added successfully')
                res.json({ message: 'Product added successfully', addNewProd })
            } else {
                logger.error('Product not added')
                logger.warning('Check product properties')
                res.json({ message: 'Product not added' })
            }
        } else {
            const product = { ...req.body, code: generateCode() }
            const addNewProd = await addOneProduct(product)
            if (addNewProd) {
                logger.info('Product added successfully')
                res.json({ message: 'Product added successfully', addNewProd })
            } else {
                logger.error('Product not added')
                logger.warning("Check the product's     requirements")
                res.json({ message: 'Product not added' })
            }
        }
    } catch (error) {
        logger.fatal('Error in AddOneProduct')
        CustomError.createCustomError({
            name: ErrorsName.ADD_PRODUCT_ERROR,
            message: ErrorsMessage.ADD_PRODUCT_ERROR,
            cause: ErrorsCause.ADD_PRODUCT_ERROR
        })
    }
}

export async function updateAProduct(req, res) {
    const id = req.params.pid
    const obj = req.body
    try {
        const find = await getProductById(id)
        if (!find) {
            logger.error('Product not found')
            logger.warning('Check the variables')
            res.json({ message: "product not found" })
        }
        const updateProd = await updateProductById(id, obj)
        const updatedProd = await getProductById(id)
        if (updateProd) {
            logger.info('Product updated successfully')
            res.json({ message: 'Product updated successfully', updatedProd })
        } else {
            logger.error('Product not found')
            logger.warning('Check the variables')
            res.json({ message: "product not found" })
        }
    } catch (error) {
        logger.fatal('Error in updateProdById')
        CustomError.createCustomError({
            name: ErrorsName.UPDATE_PRODUCT_ERROR,
            message: ErrorsMessage.UPDATE_PRODUCT_ERROR,
            cause: ErrorsCause.UPDATE_PRODUCT_ERROR
        })
    }
}

export async function getOneProduct(req, res) {
    try {
        const product = await getProductById(req.params.pid)
        if (product) {
            logger.info('Product found')
            res.json({ product })
        } else {
            logger.info('Product not found')
            logger.warning('Check properties')
            res.send('Product not found')
        }
    } catch (error) {
        logger.fatal('Error in getProductById')
        CustomError.createCustomError({
            name: ErrorsName.GET_PRODUCT_ID_ERROR,
            message: ErrorsMessage.GET_PRODUCT_ID_ERROR,
            cause: ErrorsCause.GET_PRODUCT_ID_ERROR
        })
    }
}

export async function deleteOneProduct(req, res) {
    const id = req.params.pid
    try {
        const deleteProd = await deleteProductById(id)
        logger.info('Product deleted successfully')
        res.json({ message: 'Product deleted successfully', deleteProd })
    } catch (error) {
        logger.fatal('Error was happened on delete a product.')

    }
}

// export async function deleteOneProduct(req, res) {
//     const id = req.params.pid
//     try {
//         const get = await getProductById({_id: id})
//         console.log(get)
//         const token = cookies[cookies.length - 1]
//         const verify = jwt.verify(token, config.jwt_key)
//         if (verify.user[0].role === 'Premium') {
//             if (verify.user[0].email === get.owner) {
//                 const deleteProd = await deleteProductById(id)
//                 if (deleteProd) {
//                     logger.info('Product deleted successfully')
//                     res.json({ message: 'Product deleted successfully', deleteProd })
//                 } else {
//                     logger.error('product not found')
//                     logger.warning('Check the variables')
//                     res.json({ message: "product not found" })
//                 }
//             } else {
//                 logger.error('Not authorized')
//                 logger.warning('You are not authorized to delete this product')
//                 res.json({ message: "Not authorized" })
//             }
//         } else {
//             const deleteProd = await deleteProductById(id)
//             if (deleteProd) {
//                 logger.info('Product deleted successfully')
//                 res.json({ message: 'Product deleted successfully', deleteProd })
//             } else {
//                 logger.error('product not found')
//                 logger.warning('Check the variables')
//                 res.json({ message: "product not found" })
//             }
//         }
//     } catch (error) {
//         logger.fatal('Error in deleteProductById')
//         CustomError.createCustomError({
//             name: ErrorsName.DELETE_PRODUCT_ERROR,
//             message: ErrorsMessage.DELETE_PRODUCT_ERROR,
//             cause: ErrorsCause.DELETE_PRODUCT_ERROR
//         })
//     }
// }
