import * as userService from "@services/user.service";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "@/utils/customError.util";
import { validationResult } from "express-validator";
import { validationErrorsUtil } from "@utils/validatorError.util";

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.getMe(req.user?.id ?? "");
    res.status(200).json(user);
  } catch (error) {
    next(
      new CustomError(
        "An error occurred while fetching the user.",
        500,
        "GET_ME_ERROR"
      )
    );
  }
};

export const uploadAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const fileName = req.fileName ?? "";

    const profilePictureLink = `${process.env.AWS_S3_BUCKET_LINK}/uploads/${fileName}`;

    await userService.uploadAvatar(req.user?.id ?? "", profilePictureLink);

    res.status(200).json({ link: profilePictureLink });
  } catch (error) {
    next(
      new CustomError(
        "An error occurred while uploading the avatar.",
        500,
        "UPLOAD_AVATAR_ERROR"
      )
    );
  }
};

export const updateUser = async (
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
    const { email, username } = req.body;

    const updatedUser = await userService.updateUser(req.user?.id ?? "", {
      email,
      username,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    next(
      new CustomError(
        "An error occurred while updating the user.",
        500,
        "UPDATE_USER_ERROR"
      )
    );
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userService.deleteUser(req.user?.id ?? "");
    res.status(204).json();
  } catch (error) {
    next(
      new CustomError(
        "An error occurred while deleting the user.",
        500,
        "DELETE_USER_ERROR"
      )
    );
  }
};
