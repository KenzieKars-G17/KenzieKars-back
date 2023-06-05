import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listAllUsersController,
  updateUserController,
} from "../controllers/users.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureUserEmailExist from "../middlewares/ensureEmailExist.middleware";
import ensureUserIdExist from "../middlewares/ensureUserExists.middleware";
import { userSchema, userUpdateSchema } from "../schemas/users.schemas";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsvalid.middleware";
import ensureUserIsAdmin from "../middlewares/ensureIsSeller.middleware";
import ensureIsAutorzedUser from "../middlewares/ensureIsAutorzedUser.middleware";
import ensureUserIsSeller from "../middlewares/ensureIsSeller.middleware";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchema),
  ensureUserEmailExist,
  createUserController
);

usersRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureUserIsSeller,
  listAllUsersController
);

usersRoutes.patch(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserIdExist,
  ensureIsAutorzedUser,
  ensureDataIsValidMiddleware(userUpdateSchema),
  ensureUserEmailExist,
  updateUserController
);

usersRoutes.delete(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserIdExist,
  ensureUserIsAdmin,
  deleteUserController
);

export default usersRoutes;
