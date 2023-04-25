import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
    code: {
        type: String
    },
    purchase_datetime: {
        type: String
    },
    amount: {
        type: Number
    },
    purchaser: {
        type: String
    }
})

export const ticketModel = model('Ticket',ticketSchema)

