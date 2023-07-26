import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventsService.js";

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getTowerEvents)
      .get('/:eventId', this.getEventById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTowerEvent)
  }

  async getTowerEvents(req, res, next) {
    try {
      const towerEvents = await towerEventsService.getTowerEvents()
      res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }

  async getEventById(req, res, next) {
    try {
      const eventId = req.params.eventId
      const foundEvent = await towerEventsService.getEventById(eventId)
      res.send(foundEvent)
    } catch (error) {
      next(error)
    }
  }


  async createTowerEvent(req, res, next) {
    try {
      const eventData = req.body
      eventData.creatorId = req.userInfo.id
      const newEvent = await towerEventsService.createTowerEvent(eventData)
      res.send(newEvent)
    } catch (error) {
      next(error)
    }
  }
}