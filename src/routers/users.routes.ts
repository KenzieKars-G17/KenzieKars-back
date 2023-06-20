import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  updateUserController,
  listUsersController,
  sendEmailResetPasswordController,
  resetPasswordController,
} from "../controllers/users.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureUserEmailExist from "../middlewares/ensureEmailExist.middleware";
import ensureUserIdExist from "../middlewares/ensureUserExists.middleware";
import { userSchema, userUpdateSchema } from "../schemas/users.schemas";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsvalid.middleware";
import ensureUserIsAdmin from "../middlewares/ensureIsSeller.middleware";
import ensureIsAutorzedUser from "../middlewares/ensureIsAutorzedUser.middleware";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchema),
  ensureUserEmailExist,
  createUserController
);

usersRoutes.post("/resetPassword", sendEmailResetPasswordController);

usersRoutes.get("", ensureTokenIsValidMiddleware, listUsersController);

usersRoutes.patch("/resetPassword/:token", resetPasswordController);

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
