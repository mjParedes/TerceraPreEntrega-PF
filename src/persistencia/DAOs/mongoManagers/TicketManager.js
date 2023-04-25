import { ticketModel } from "../models/ticket.model.js";

export default class TicketManager {
    async getTickets() {
        try {
            const tickets = await ticketModel.find()
            return tickets
        } catch (error) {
            console.log(error)
        }
    }
    async addTicket(objTicket) {
        try {
            const newTicket = await ticketModel.create(objTicket)
            return newTicket
        } catch (error) {
            console.log(error)
        }
    }
}
