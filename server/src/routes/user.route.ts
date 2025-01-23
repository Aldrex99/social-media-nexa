import { Router } from "express";
import * as userValidator from "../validators/user.validator";
import * as userController from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getUser);
router.put("/", userValidator.updateUser, userController.updateUser);
router.delete("/", userController.deleteUser);

export default router;
