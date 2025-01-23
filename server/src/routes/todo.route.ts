import { Router } from "express";
import * as todoController from "../controllers/todo.controller";
import * as todoValidator from "../validators/todo.validator";

const router = Router();

router.get("/", todoController.getTodos);
router.get("/:id", todoValidator.getTodo, todoController.getTodo);
router.post("/", todoValidator.createTodo, todoController.createTodo);
router.put("/:id", todoValidator.updateTodo, todoController.updateTodo);
router.delete("/:id", todoValidator.deleteTodo, todoController.deleteTodo);

export default router;
