import { dbContext } from "../db/DbContext.js"

class TowerEventsService {

  async getTowerEvents() {
    const towerEvents = await dbContext.Events.find().populate('ticketCount')
    return towerEvents
  }

  async getEventById(eventId) {
    const foundEvent = (await dbContext.Events.findById(eventId)).populate('ticketCount')
    return foundEvent
  }

  async createTowerEvent(eventData) {
    const newEvent = await dbContext.Events.create(eventData)
    await newEvent.populate('ticketCount')

    return newEvent

  }
}

export const towerEventsService = new TowerEventsService()