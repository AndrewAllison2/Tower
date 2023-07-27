import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class TicketsService {

  async getTicketsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    logger.log('got tickets', res.data)

  }

  async createTicket(ticketData) {
    const res = await api.post('api/tickets', ticketData)
    logger.log('got a ticket', res.data)
    AppState.tickets.push(new Ticket(res.data))
  }
}


export const ticketsService = new TicketsService()