import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"


class TicketsService {

  async getMyEventTickets() {
    try {
      const res = await api.get('account/tickets')
      logger.log('got my tickets', res.data)
      AppState.myTickets = res.data.map(t => new Ticket(t))
    } catch (error) {
      Pop.error(error.message)
    }
  }
  async getTicketsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    logger.log('got tickets', res.data)
    AppState.tickets = res.data.map(t => new Ticket(t))

  }

  async createTicket(ticketData) {
    const res = await api.post('api/tickets', ticketData)
    logger.log('got a ticket', res.data)
    AppState.tickets.push(new Ticket(res.data))
  }


}


export const ticketsService = new TicketsService()