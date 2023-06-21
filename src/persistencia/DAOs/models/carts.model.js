import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products'
            },
            quantity: {
                type: Number,
                // default: 1
            }
        }
    ],
    // default: []
})

// Populate en el find sin ponerlo en el manager
cartSchema.pre('find', function (next) {
    this.populate('products.product')
    next()
})

export const cartModel = mongoose.model('Carts', cartSchema)



