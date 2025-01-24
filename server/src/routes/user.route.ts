import { Router } from "express";
import { upload } from "@middlewares/file.middleware";
import * as userValidator from "@validators/user.validator";
import * as userController from "@controllers/user.controller";

const router = Router();

router.get("/me", userController.getMe);
router.post("/avatar", upload.single("avatar"), userController.uploadAvatar);
router.put("/", userValidator.updateUser, userController.updateUser);
router.delete("/", userController.deleteUser);

export default router;
