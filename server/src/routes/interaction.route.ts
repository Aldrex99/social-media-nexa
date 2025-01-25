import e, { Router } from "express";
import * as likeValidator from "@validators/like.validator";
import * as likeController from "@controllers/like.controller";
import * as commentValidator from "@validators/comment.validator";
import * as commentController from "@controllers/comment.controller";

const router = Router();

router.post("/like", likeValidator.addLike, likeController.addLike);
router.get("/like/:post_id", likeValidator.getLikes, likeController.getLikes);
router.delete("/like/:id", likeValidator.removeLike, likeController.removeLike);

router.post(
  "/comment",
  commentValidator.createComment,
  commentController.createComment
);
router.get(
  "/comment/:post_id",
  commentValidator.getComments,
  commentController.getComments
);
router.delete(
  "/comment/:id",
  commentValidator.deleteComment,
  commentController.deleteComment
);

export default router;
