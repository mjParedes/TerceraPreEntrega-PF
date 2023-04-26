import { ticketModel } from "../models/ticket.model.js";

export default class TicketManager {
    async getAll() {
        try {
            const tickets = await ticketModel.find()
            return tickets
        } catch (error) {
            console.log(error)
        }
    }
    async create(obj) {
        try {
            const newTicket = await ticketModel.create(obj)
            return newTicket
        } catch (error) {
            console.log(error)
        }
    }
}
