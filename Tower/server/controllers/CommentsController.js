import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .get('/:commentId', this.getCommentById)

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .delete('/:commentId', this.removeComment)
  }

  async createComment(req, res, next) {
    try {
      const commentData = req.body
      commentData.creatorId = req.userInfo.id
      const comment = await commentsService.createComment(commentData)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async getCommentById(req, res, next) {
    try {
      const commentId = req.params.commenId
      const comment = await commentsService.getCommentsByEventId(commentId)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async removeComment(req, res, next) {
    try {

      const commentId = req.params.commentId
      const userId = req.userInfo.id
      const comment = await commentsService.removeComment(commentId, userId)
      res.send(comment)
    } catch (error) {
      next(error)
    }

  }
}