import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TowerEventsService {

  async getEvents() {
    const res = await api.get('api/events')
    // logger.log('got events', res.data)
    const towerEvents = res.data.map(t => new TowerEvent(t))
    AppState.towerEvents = towerEvents
  }

  async getEventById(eventId) {
    const res = await api.get(`api/events/${eventId}`)
    //   logger.log('got 1 event', res.data)
    const towerEvent = new TowerEvent(res.data)
    AppState.activeTowerEvent = towerEvent
  }

  async createTowerEvent(eventData) {
    const res = await api.post('api/events', eventData)
    logger.log('new event!', res.data)
    const tower = new TowerEvent(res.data)
    return tower
  }

  async cancelTowerEvent(eventId) {
    const res = await api.delete(`api/events/${eventId}`)
    logger.log('removed event', res.data)
    const eventToCancel = AppState.towerEvents.find(tower => tower.id == eventId)
    eventToCancel.isCanceled = true

  }
}


export const towerEventsService = new TowerEventsService()