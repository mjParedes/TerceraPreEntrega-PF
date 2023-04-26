import TicketManager from '../persistencia/DAOs/mongoManagers/TicketManager.js'

const ticketManager = new TicketManager()

export async function getTickets() {
    try {
        const tickets = await ticketManager.getAll()
        return tickets
    } catch (error) {
        return error
    }
}

export async function createTicket(obj) {
    try {
        const newTicket = await ticketManager.create(obj)
        return newTicket
    } catch (error) {
        return error
    }
}



