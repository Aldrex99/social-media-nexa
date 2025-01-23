import { Router } from "express";
import { checkRefreshToken } from "../middlewares/token.middleware";
import * as authValidator from "../validators/auth.validator";
import * as authController from "../controllers/auth.controller";

const router = Router();

router.post("/register", authValidator.register, authController.register);
router.post("/login", authValidator.login, authController.login);
router.post(
  "/forgot-password",
  authValidator.forgotPassword,
  authController.forgotPassword
);
router.get(
  "/refresh-token",
  checkRefreshToken,
  authController.newAccessTokenFromRefreshToken
);

export default router;
