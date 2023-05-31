import { z } from "zod";
import { DeepPartial } from "typeorm";
import {
  userSchema,
  returnUserSchema,
  arrayUserSchema,
} from "../schemas/users.schemas";

type IUser = z.infer<typeof userSchema>;
type IUserReturn = z.infer<typeof returnUserSchema>;
type IArrayUsers = z.infer<typeof arrayUserSchema>;
type IUserUpdate = DeepPartial<IUser>;

export { IUser, IUserReturn, IArrayUsers, IUserUpdate };