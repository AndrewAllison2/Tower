import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventsService.js";

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTowerEvent)
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