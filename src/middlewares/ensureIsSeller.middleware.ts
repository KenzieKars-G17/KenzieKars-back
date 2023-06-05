import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import "express-async-errors";

const ensureUserIsSeller = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.user.seller) {
    console.log(req.user);
    
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export default ensureUserIsSeller;
