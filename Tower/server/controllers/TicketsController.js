import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";

export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router


      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .delete('/:ticketId', this.removeTicket)
  }

  async createTicket(req, res, next) {
    try {
      const eventId = req.params.eventId
      const ticketData = req.body
      ticketData.accountId = req.userInfo.id
      const createdTicket = await ticketsService.createdTicket(ticketData, eventId)
      res.send(createdTicket)
    } catch (error) {
      next(error)
    }
  }

  async removeTicket(req, res, next) {
    try {
      const ticketId = req.params.ticketId
      const userId = req.userInfo.id
      const ticket = await ticketsService.removeTicket(ticketId, userId)
      res.send(ticket)
    } catch (error) {
      next(error)
    }

  }
}