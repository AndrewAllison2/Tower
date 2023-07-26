import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { towerEventsService } from "./TowerEventsService.js"

class CommentsService {
  async createComment(commentData) {
    const tower = await towerEventsService.getEventById(commentData.eventId)
    if (tower.isCanceled == true) {
      throw new Forbidden(`${tower.name} has been cancelled. You cannot comment on it.`)
    }
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator', 'name picture')
    return comment
  }

  async getCommentById(commentId) {
    const comment = await dbContext.Comments.findById({ commentId })
    if (!comment) {
      throw new BadRequest('Could not find the comment.')
    }
    return comment
  }

  async getCommentsByEventId(eventId) {
    const comments = await dbContext.Comments.find({ eventId }).populate('creator', 'name picture')
    return comments
  }

  async removeComment(commentId, userId) {
    const commentToRemove = await dbContext.Comments.findById(commentId)

    if (commentToRemove.creatorId.toString() != userId) {
      throw new Forbidden()
    }
    await commentToRemove.remove()
    return commentToRemove


  }
}



export const commentsService = new CommentsService()