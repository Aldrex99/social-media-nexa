import { Router } from "express";
import * as postController from "../controllers/post.controller";
import * as postValidator from "../validators/post.validator";

const router = Router();

router.post("/", postValidator.createPost, postController.createPost);
router.get("/", postValidator.getPosts, postController.getPosts);
router.get("/:id", postValidator.getPost, postController.getPost);
router.get(
  "/user/:id",
  postValidator.getPostsByUser,
  postController.getPostsByUser
);
router.delete("/:id", postValidator.deletePost, postController.deletePost);

export default router;
