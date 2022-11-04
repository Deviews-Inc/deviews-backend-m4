import { Request, Response, NextFunction } from "express";
const isActiveMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user.isActive){
    return res.status(403).json({message: "Inactive User"});
  }
  return next();
}

export default isActiveMiddleware;