import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import "express-async-errors";

const ensureUserIsAdmin = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.user.admin) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export default ensureUserIsAdmin;