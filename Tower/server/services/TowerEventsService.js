import { dbContext } from "../db/DbContext.js"

class TowerEventsService {
  async createTowerEvent(eventData) {
    const newEvent = await dbContext.Events.create(eventData)
    return newEvent

  }
}

export const towerEventsService = new TowerEventsService()