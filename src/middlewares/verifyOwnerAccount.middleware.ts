import { NextFunction, Request, Response } from "express";

const verifyOwnerAccountMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.params.id === req.user.id) {
    return next();
  }

  return res.status(401).json({
    message: "You're not the owner of this account",
  });
};

export default verifyOwnerAccountMiddleware;
