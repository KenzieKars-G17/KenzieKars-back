import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import "express-async-errors";

const ensureIsAutorzedUser = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<void> => {
  if (Number(req.params.id) === req.user.sub || req.user.admin) {
    return next();
  } else {
    throw new AppError("Insufficient permission", 403);
  }
};

export default ensureIsAutorzedUser;