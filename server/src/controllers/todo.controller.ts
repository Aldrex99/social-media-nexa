import { Request, Response, NextFunction } from "express";
import { CustomError } from "@utils/customError.util";
import * as TodoService from "@services/todo.service";
import { validationResult } from "express-validator";
import { validationErrorsUtil } from "@utils/validatorError.util";

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

export const createTodo = async (
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
    next(new CustomError((error as Error).message, 500, "TODO_CREATE_ERROR"));
  }
};

export const getTodo = async (
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
    const { id } = req.params;

    const todo = await TodoService.getTodo(id, req.user?.id ?? "");

    if (!todo) {
      next(new CustomError("Todo not found", 404, "TODO_NOT_FOUND_ERROR"));
      return;
    }

    res.status(200).json(todo);
  } catch (error) {
    next(new CustomError((error as Error).message, 500, "TODO_GET_ERROR"));
  }
};

export const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await TodoService.getTodos(req.user?.id ?? "");

    const sanitizedTodos = todos.map((todo) => sanitizeTodoData(todo));

    res.status(200).json(sanitizedTodos);
  } catch (error) {
    next(new CustomError((error as Error).message, 500, "TODOS_GET_ERROR"));
  }
};

export const updateTodo = async (
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
    next(new CustomError((error as Error).message, 500, "TODO_UPDATE_ERROR"));
  }
};

export const deleteTodo = async (
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
    const { id } = req.params;

    await TodoService.deleteTodo(id, req.user?.id ?? "");

    res.status(204).send();
  } catch (error) {
    next(new CustomError((error as Error).message, 500, "TODO_DELETE_ERROR"));
  }
};
