import { Request, Response, NextFunction } from "express";
import AppError from "../errors/appError";
const handleErrorMiddleware = async (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
      status: "error",
    });
  }

  return response.status(500).json({
    message: "internal server error",
    status: "error",
  });
};

export default handleErrorMiddleware;
