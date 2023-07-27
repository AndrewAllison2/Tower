import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService {

  async getCommentsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log('comments', res.data)
    AppState.comments = res.data.map(c => new Comment(c))
  }

  async createComment(commentData) {
    const res = await api.post('api/comments', commentData)
    logger.log('created comment', res.data)
    const newComment = new Comment(res.data)
    AppState.comments.push(newComment)
  }

  async removeComment(commentId) {
    const res = await api.delete(`api/comments/${commentId}`)
    logger.log('deleting comment', res.data)
    const commentIndex = AppState.comments.findIndex(c => c.id == commentId)
    AppState.comments.splice(commentIndex, 1)
  }
}

export const commentsService = new CommentsService()