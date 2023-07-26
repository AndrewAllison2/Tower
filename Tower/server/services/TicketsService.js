import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TicketsService {

  async getMyTickets(accountId) {
    const tickets = await dbContext.Tickets.find({ accountId })
      .populate({
        path: 'event',

      })
    return tickets
  }
  async createdTicket(ticketData, eventId) {
    const newTicket = await dbContext.Tickets.create(ticketData)
    await newTicket.populate('profile', 'name picture')
    await newTicket.populate('event')



    return newTicket
  }

  async getTicketsByEventId(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId }).populate('profile')
    return tickets
  }

  async removeTicket(ticketId, userId) {
    const ticketToDelete = await dbContext.Tickets.findById(ticketId)

    if (!ticketToDelete) {
      throw new BadRequest('Cannot find a ticket with that ID.')
    }

    if (ticketToDelete.accountId != userId) {
      throw new Forbidden('You cannot delete a ticket that is not yours.')
    }
    await ticketToDelete.remove()
    return
  }
}


export const ticketsService = new TicketsService()