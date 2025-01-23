import * as userService from "../services/user.service";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { validationErrorsUtil } from "../utils/validatorError.util";

export const getUser = (req: Request, res: Response) => {
  try {
    const user = userService.getUser(req.user?.id ?? "");
    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while getting the user." });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await validationErrorsUtil(errors, res);
    return;
  }

  try {
    const { email, password } = req.body;

    const updatedUser = await userService.updateUser(req.user?.id ?? "", {
      email,
      password,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the user." });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await userService.deleteUser(req.user?.id ?? "");
    res.status(204).json();
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the user." });
  }
};
