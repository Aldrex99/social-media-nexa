import { Request, Response, NextFunction } from "express";
import logger from "@utils/logger.util";

interface CustomError extends Error {
  message: string;
  status: number;
  code: number;
  isOperational: boolean;
  details: any;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const status = err.status || 500;
  const response = {
    message: err.message || "Internal Server Error",
    code: err.code || "UNKNOWN_ERROR",
    details: err.details || null,
  };

  logger.error(
    `Error: ${response.message}, Status: ${status}, Path: ${req.path}, Operational: ${err.isOperational}`
  );

  res.status(status).json(response);
};
