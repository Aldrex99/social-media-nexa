import { Request, Response } from "express";
import * as PostService from "../services/post.service";
import { validationResult } from "express-validator";
import { validationErrorsUtil } from "../utils/validatorError.util";

export const createPost = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await validationErrorsUtil(errors, res);
    return;
  }

  try {
    const { content, imageLink } = req.body;

    if (req.user?.id === undefined) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    await PostService.createPost({
      user_id: req.user.id,
      content,
      imageLink,
    });
    res.status(201).json({ message: "Post created" });
  } catch (error) {
    console.error("Error creating Todo:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the Todo." });
  }
};

export const getPost = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await validationErrorsUtil(errors, res);
    return;
  }

  try {
    const { id } = req.params;

    const post = await PostService.getPost(id);

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error getting Post:", error);
    res
      .status(500)
      .json({ message: "An error occurred while getting the Post." });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const { limit, page } = req.query;

    const posts = await PostService.getPosts(
      limit ? parseInt(limit as string) : 10,
      page ? parseInt(page as string) : 1
    );

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error getting Posts:", error);
    res
      .status(500)
      .json({ message: "An error occurred while getting the Posts." });
  }
};

export const getPostsByUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await validationErrorsUtil(errors, res);
    return;
  }

  try {
    const { id } = req.params;
    const { limit, page } = req.query;

    const posts = await PostService.getPostsByUser(
      id,
      limit ? parseInt(limit as string) : 10,
      page ? parseInt(page as string) : 1
    );

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error getting Posts by User:", error);
    res
      .status(500)
      .json({ message: "An error occurred while getting the Posts by User." });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await validationErrorsUtil(errors, res);
    return;
  }

  try {
    const { id } = req.params;

    await PostService.deletePost(id, req.user?.id ?? "");
  } catch (error) {
    console.error("Error deleting Post:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the Post." });
  }
};
