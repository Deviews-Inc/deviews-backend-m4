import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const isLoggedInMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: "Missing Authorization Token",
    });
  }

  token = token.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
    if (error) {
      return res.status(403).json({ message: "Invalid Token." });
    }

    req.user = {
      id: decoded.id,
      isActive: decoded.isActive
    }
    
    return next();
  });
};

export default isLoggedInMiddleware;