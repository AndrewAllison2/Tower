
import { dbContext } from "../db/DbContext.js"

import { BadRequest, Forbidden } from "../utils/Errors.js"

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

  async editEvent(editData, userId, eventId) {
    const originalEvent = await this.getEventById(eventId)
    if (!originalEvent) {
      throw new BadRequest('The Tower you are looking for does not exist')
    }
    if (originalEvent.isCanceled == true) {
      throw new BadRequest('This Tower has been cancelled. You cannot edit it')
    }
    if (originalEvent.creatorId.toString() != userId) {
      throw new Forbidden('You did not create this Tower. You cannot edit it.')
    }



    originalEvent.name = editData.name
    originalEvent.description = editData.description
    // originalEvent.coverImg = editData.coverImg
    // originalEvent.location = editData.location
    // originalEvent.capacity = editData.capacity
    // originalEvent.startDate = editData.startDate




    const cancelledEvent = await originalEvent.save()

    return cancelledEvent
  }


  async cancelEvent(eventId, userId) {
    const eventToCancel = await this.getEventById(eventId)
    if (eventToCancel.creatorId.toString() != userId) {
      throw new Forbidden('You are not the creator of this Tower. You cannot delete it.')
    }
    eventToCancel.isCanceled = true
    await eventToCancel.save()
    return eventToCancel
  }
}

export const towerEventsService = new TowerEventsService()