import { Request, Response, NextFunction } from "express";
import * as CommentService from "@services/comment.service";
import { CustomError } from "@/utils/customError.util";
import { validationResult } from "express-validator";
import { validationErrorsUtil } from "@utils/validatorError.util";

export const createComment = async (
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
    const { post_id, content } = req.body;

    const newComment = await CommentService.createComment({
      user: {
        _id: req.user?.id ?? "",
      },
      post_id,
      content,
    });

    res.status(201).json(newComment);
  } catch (error) {
    next(new CustomError((error as Error).message, 500, "COMMENT_ADD_ERROR"));
  }
};

export const getComments = async (
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
    const { post_id } = req.params;
    const { page, limit } = req.query;

    const comments = await CommentService.getComments(
      post_id,
      limit ? parseInt(limit as string) : 10,
      page ? parseInt(page as string) : 1
    );

    res.status(200).json(comments);
  } catch (error) {
    next(new CustomError((error as Error).message, 500, "COMMENT_GET_ERROR"));
  }
};

export const deleteComment = async (
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
    const { comment_id } = req.body;

    const deletedComment = await CommentService.deleteComment(
      comment_id,
      req.user?.id ?? ""
    );

    if (!deletedComment) {
      next(
        new CustomError("Comment not found", 404, "COMMENT_NOT_FOUND_ERROR")
      );
      return;
    }

    res.status(200).json(deletedComment);
  } catch (error) {
    next(
      new CustomError((error as Error).message, 500, "COMMENT_DELETE_ERROR")
    );
  }
};
