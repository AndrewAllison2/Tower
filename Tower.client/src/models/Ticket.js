export class Ticket {
  constructor(data) {
    this.id = data.id
    this.eventId = data.eventId
    this.accountId = data.accountId
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.profile = data.profile
    this.event = data.event
  }
}

// let tix = {
//   "_id": "64c291b3ac4d2058f0a870cc",
//   "eventId": "64c291b2ac4d2058f0a870c8",
//   "accountId": "64c04bae0994e96c60decf3a",
//   "createdAt": "2023-07-27T15:48:03.430Z",
//   "updatedAt": "2023-07-27T15:48:03.430Z",
//   "__v": 0,
//   "profile": {
//     "_id": "64c04bae0994e96c60decf3a",
//     "subs": [
//       "auth0|64c04baef9ed8a1d94c43d7f"
//     ],
//     "email": "codeguy@coder.guy",
//     "name": "codeguy",
//     "picture": "https://s.gravatar.com/avatar/ccd9ab853bc94ce2f34bf1d9aa3f9423?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fco.png",
//     "createdAt": "2023-07-25T22:24:49.871Z",
//     "updatedAt": "2023-07-25T22:24:49.871Z",
//     "__v": 0,
//     "id": "64c04bae0994e96c60decf3a"
//   },
//   "id": "64c291b3ac4d2058f0a870cc"
// }