import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";
import { User } from "../entities";
import "express-async-errors";

const ensureUserEmailExist = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  if (req.method === "PATCH" && !req.body.email) {
    return next();
  }

  const findUserEmail: User | null = await userRepository.findOneBy({
    email: req.body.email,
  });

  if (findUserEmail) {
    throw new AppError("Email already exists", 409);
  }

  return next();
};

export default ensureUserEmailExist;