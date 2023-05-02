import TicketManager from '../persistencia/DAOs/mongoManagers/TicketManager.js'
// import UsersManager from '../persistencia/DAOs/mongoManagers/UserManager.js'
import {usersModel} from '../persistencia/DAOs/models/users.model.js'
import {cartModel} from '../persistencia/DAOs/models/carts.model.js'
import {productsModel} from '../persistencia/DAOs/models/products.model.js'
import {ticketModel} from '../persistencia/DAOs/models/ticket.model.js'

const ticketManager = new TicketManager()
// const userManager = new UsersManager()


// Traer todos los tickets
export async function getTickets(req, res) {
    const tickets = await ticketManager.getAll()
    res.send({ status: 'success', result: result })
}

// Creacion de ticket
export async function createTicket(req, res) {
    const { cid } = req.params
    let codeT = await ticketManager.createCode()
    let purchase_datetime = new Date()
    let user = await usersModel.findOne({ cart: cid })
    if (!user) {
        console.log('User no existe')
        // return done(null, false, { message: 'User not found' })
    }

    let cart = await cartModel.findOne({ _id: cid }).lean().populate('products.product')
    if (!cart) {
        return done(null, false, { message: 'Cart not found' })
    }
    let addToPayment = 0
    // Recorro el carrito
    for (let i = 0; i < cart.products.length; i++) {
        // Busco id,precio,stock,cantidad
        const idProduct = cart.products[i].product._id;
        const priceProduct = cart.products[i].product.price;
        const stockProduct = cart.products[i].product.stock;
        const quantityProduct = cart.products[i].quantity;
        // Comparo si el stock es suficiente
        if (stockProduct >= quantityProduct) {
            const newStock = stockProduct - quantityProduct
            let priceXQuantity = priceProduct * quantityProduct
            addToPayment = addToPayment + priceXQuantity
            let idP = idProduct.toString()
            let updateCart = await cartModel.updateOne({
                _id: idC,
            },
                {
                    $pull: {
                        products: {
                            product: idP
                        },
                    },
                }
            )
            // Actualizo el stock del producto comprado
            const updateStockProduct = await productsModel.updateOne(
                { _id: idP },
                {
                    $set: {
                        stock: newStock
                    }
                }
            )
        } else {
            return done(null, false, { message: 'Stock insuficiente' })
        }

    }

    // Crear ticket de compra
    let result = await ticketModel.create({
        code: codeT,
        purchase_datetime,
        amount: addToPayment,
        purcharser: user.id
    });
    console.log(result);
    // res.redirect('/products');
    res.send({ status: "success", payload: result });
}

//Traer ticket por id
export async function getTicketById(req, res) {
    res.send({ status: "success", result: result })
}


export async function resolveTicket(req, res) {
    res.send({ status: "success", result: result })
}
