import * as authService from "../services/auth.service";
import { generateAccessToken, generateRefreshToken } from "../utils/token.util";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { validationErrorsUtil } from "../utils/validatorError.util";

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await validationErrorsUtil(errors, res);
    return;
  }

  try {
    const { email, password } = req.body;

    await authService.register({ email, password });
    res.status(201);
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while registering user." });
  }
};

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await validationErrorsUtil(errors, res);
    return;
  }

  try {
    const { email, password } = req.body;

    const user = await authService.login(email, password);

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "An error occurred while logging in." });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await validationErrorsUtil(errors, res);
    return;
  }

  try {
    const { email } = req.body;

    await authService.forgotPassword(email);

    // TODO: Send email with reset password token

    res.status(200);
  } catch (error) {
    console.error("Error forgot password:", error);
    res
      .status(500)
      .json({ message: "An error occurred while forgot password system." });
  }
};

export const newAccessTokenFromRefreshToken = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    console.log("newAccessTokenFromRefreshToken");

    const accessToken = generateAccessToken(req.user?.id);

    res.cookie("accessToken", accessToken, { httpOnly: true });

    res.status(200);
    res.end();
  } catch (error) {
    console.error("Error getting new access token:", error);
    res
      .status(500)
      .json({ message: "An error occurred while getting new access token." });
  }
};
