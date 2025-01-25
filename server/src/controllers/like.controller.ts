import { Request, Response, NextFunction } from "express";
import { CustomError } from "@/utils/customError.util";
import * as LikeService from "@services/like.service";
import { validationResult } from "express-validator";
import { validationErrorsUtil } from "@utils/validatorError.util";

export const addLike = async (
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
    const { post_id } = req.body;

    const newLike = await LikeService.addLike({
      user: {
        _id: req.user?.id ?? "",
      },
      post_id,
    });

    res.status(201).json(newLike);
  } catch (error) {
    next(new CustomError((error as Error).message, 500, "LIKE_ADD_ERROR"));
  }
};

export const getLikes = async (
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

    const likes = await LikeService.getLikes(
      post_id,
      limit ? parseInt(limit as string) : 10,
      page ? parseInt(page as string) : 1
    );

    res.status(200).json(likes);
  } catch (error) {
    next(new CustomError((error as Error).message, 500, "LIKE_GET_ERROR"));
  }
};

export const removeLike = async (
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
    const { post_id } = req.body;

    const removedLike = await LikeService.removeLike({
      user: {
        _id: req.user?.id ?? "",
      },
      post_id,
    });

    if (!removedLike) {
      next(new CustomError("Like not found", 404, "LIKE_NOT_FOUND_ERROR"));
      return;
    }

    res.status(200).json(removedLike);
  } catch (error) {
    next(new CustomError((error as Error).message, 500, "LIKE_REMOVE_ERROR"));
  }
};
