export class TowerEvent {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.startDate = data.startDate
    this.type = data.type
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.isCanceled = data.isCanceled
    this.ticketCount = data.ticketCount
  }
}

// let events = {
//   "_id": "64c053da18463b9da5b9b032",
//   "creatorId": "64c04bae0994e96c60decf3a",
//   "name": "Event Edited",
//   "description": "Description Edited",
//   "coverImg": "https://images.unsplash.com/photo-1591389710450-3b5873826708?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80",
//   "location": "At The Social Expo Center",
//   "capacity": 88,
//   "startDate": "2023-08-14T06:00:00.000Z",
//   "type": "convention",
//   "createdAt": "2023-07-25T22:59:38.905Z",
//   "updatedAt": "2023-07-26T05:24:29.450Z",
//   "__v": 0,
//   "isCanceled": true,
//   "ticketCount": 0,
//   "id": "64c053da18463b9da5b9b032"
// }