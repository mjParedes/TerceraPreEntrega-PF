import { getTickets, createTicket } from "../services/tickets.service";

export async function getAllTickets(req, res) {
    try {
        const tickets = await getTickets()
        if (tickets) {
            res.json(tickets)
        } else {
            res.json({ message: 'No existen tickets' })
        }
    } catch (error) {
        res.json(error)
    }

}

export async function createOneTicket(req, res) {
    
}