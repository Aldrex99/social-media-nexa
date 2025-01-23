import { Request, Response } from "express";
import * as TodoService from "../services/todo.service";
import { validationResult } from "express-validator";
import { validationErrorsUtil } from "../utils/validatorError.util";

interface IReturnableTodo {
  id: string;
  title: string;
  description: string;
  imageLink: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

function sanitizeTodoData(todo: any): IReturnableTodo {
  return {
    id: todo._id,
    title: todo.title,
    description: todo.description,
    imageLink: todo.imageLink,
    done: todo.done,
    createdAt: todo.createdAt,
    updatedAt: todo.updatedAt,
  };
}

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await TodoService.getTodos(req.user?.id ?? "");

    const sanitizedTodos = todos.map((todo) => sanitizeTodoData(todo));

    res.status(200).json(sanitizedTodos);
  } catch (error) {
    console.error("Error getting Todos:", error);
    res
      .status(500)
      .json({ message: "An error occurred while getting the Todos." });
  }
};

export const getTodo = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await validationErrorsUtil(errors, res);
    return;
  }

  try {
    const { id } = req.params;

    const todo = await TodoService.getTodo(id, req.user?.id ?? "");

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.status(200).json(todo);
  } catch (error) {
    console.error("Error getting Todo:", error);
    res
      .status(500)
      .json({ message: "An error occurred while getting the Todo." });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await validationErrorsUtil(errors, res);
    return;
  }

  try {
    const { title, description, imageLink, done } = req.body;

    const newTodo = await TodoService.createTodo({
      user_id: req.user?.id,
      title,
      description,
      imageLink,
      done,
    });

    const sanitizedTodo = sanitizeTodoData(newTodo);

    res.status(201).json(sanitizedTodo);
  } catch (error) {
    console.error("Error creating Todo:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the Todo." });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await validationErrorsUtil(errors, res);
    return;
  }

  try {
    const { id } = req.params;
    const { title, description, imageLink, done } = req.body;

    const updatedTodo = await TodoService.updateTodo(id, req.user?.id ?? "", {
      title,
      description,
      imageLink,
      done,
    });

    const sanitizedTodo = sanitizeTodoData(updatedTodo);

    res.status(200).json(sanitizedTodo);
  } catch (error) {
    console.error("Error updating Todo:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the Todo." });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await validationErrorsUtil(errors, res);
    return;
  }

  try {
    const { id } = req.params;

    await TodoService.deleteTodo(id, req.user?.id ?? "");

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting Todo:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the Todo." });
  }
};
