import { ticketModel } from "../models/ticket.model.js";
import { v4 as uuidv4 } from 'uuid';

export default class TicketManager {
    async getAll() {
        try {
            const tickets = await ticketModel.find()
            return tickets
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async getOne(id) {
        try {
            const ticketFound = await ticketModel.findOne({ _id: id })
            return ticketFound
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async create(obj) {
        try {
            const newTicket = await ticketModel.create(obj)
            return newTicket
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async update(id, obj) {
        try {
            const updateTicket = await ticketModel.updateOne({ _id: id }, { $set: ticket })
            return updateTicket
        } catch (error) {
            console.log(error)
            return null
        }
    }

    createCode = async () => {
        try {
            let isCodeUnique = false;
            let ticketCode;
            // Generar código autogenerado único para el ticket
            while (!isCodeUnique) {
                ticketCode = uuidv4();
                const existingTicket = await ticketModel.findOne({ code: ticketCode });
                if (!existingTicket) {
                    isCodeUnique = true;
                }
            }
            return ticketCode;
        }
        catch (error) {
            console.log(error);
            return null
        }
    }

}

