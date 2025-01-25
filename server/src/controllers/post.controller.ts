import { Request, Response, NextFunction } from "express";
import { CustomError } from "@/utils/customError.util";
import * as PostService from "@services/post.service";
import { validationResult } from "express-validator";
import { validationErrorsUtil } from "@utils/validatorError.util";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await validationErrorsUtil(errors, res);
    return;
  }

  try {
    const { content, imageLink } = req.body;

    const newPost = await PostService.createPost({
      user: {
        _id: req.user?.id ?? "",
      },
      content,
      imageLink,
    });

    res.status(201).json(newPost);
  } catch (error) {
    next(new CustomError((error as Error).message, 500, "POST_CREATE_ERROR"));
  }
};

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await validationErrorsUtil(errors, res);
    return;
  }

  try {
    const { id } = req.params;

    const post = await PostService.getPost(id);

    if (!post) {
      next(new CustomError("Post not found", 404, "POST_NOT_FOUND_ERROR"));
      return;
    }

    res.status(200).json(post);
  } catch (error) {
    next(new CustomError((error as Error).message, 500, "POST_GET_ERROR"));
  }
};

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit, page } = req.query;

    const posts = await PostService.getPosts(
      limit ? parseInt(limit as string) : 10,
      page ? parseInt(page as string) : 1
    );

    res.status(200).json(posts);
  } catch (error) {
    next(new CustomError((error as Error).message, 500, "POSTS_GET_ERROR"));
  }
};

export const getPostsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    next(new CustomError((error as Error).message, 500, "POSTS_GET_ERROR"));
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await validationErrorsUtil(errors, res);
    return;
  }

  try {
    const { id } = req.params;

    await PostService.deletePost(id, req.user?.id ?? "");

    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    next(new CustomError((error as Error).message, 500, "POST_DELETE_ERROR"));
  }
};
