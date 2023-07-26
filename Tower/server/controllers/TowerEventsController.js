import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { BadRequest } from "../utils/Errors.js";

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getTowerEvents)
      .get('/:eventId', this.getEventById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTowerEvent)
      .put('/:eventId', this.editEvent)
      .delete('/:eventId', this.cancelEvent)
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

  async editEvent(req, res, next) {
    try {
      const editData = req.body
      const userId = req.userInfo.id
      const eventId = req.params.eventId
      const editedEvent = await towerEventsService.editEvent(editData, userId, eventId)
      res.send(editedEvent)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent(req, res, next) {
    try {
      const eventId = req.params.eventId
      const userId = req.userInfo.id
      const removedEvent = await towerEventsService.cancelEvent(eventId, userId)
      res.send(removedEvent)
    } catch (error) {
      next(error)
    }
  }
}