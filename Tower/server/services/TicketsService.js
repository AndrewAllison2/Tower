import { dbContext } from "../db/DbContext.js"

class TicketsService {
  async createdTicket(ticketData) {
    const newTicket = await dbContext.Tickets.create(ticketData)
    newTicket.populate('profile')
    return newTicket
  }
}


export const ticketsService = new TicketsService()