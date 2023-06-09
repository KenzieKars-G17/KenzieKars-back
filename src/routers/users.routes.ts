import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  updateUserController,
  updateUserAddressController,
  listUsersController,
  sendEmailResetPasswordController,
  resetPasswordController,
} from "../controllers/users.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureUserEmailExist from "../middlewares/ensureEmailExist.middleware";
import ensureUserIdExist from "../middlewares/ensureUserExists.middleware";
import { userSchema, userUpdateSchema } from "../schemas/users.schemas";
import { addressSchemaUpdate } from "../schemas/address.schema";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsvalid.middleware";
import ensureUserIsAdmin from "../middlewares/ensureIsSeller.middleware";
import ensureIsAutorzedUser from "../middlewares/ensureIsAutorzedUser.middleware";
import { resetPasswordSchema } from "../schemas/resetPassword.schema";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchema),
  ensureUserEmailExist,
  createUserController
);

usersRoutes.post("/resetPassword", sendEmailResetPasswordController);

usersRoutes.get("/:id", listUsersController);

usersRoutes.patch(
  "/resetPassword/:token",
  ensureDataIsValidMiddleware(resetPasswordSchema),
  resetPasswordController
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

usersRoutes.patch(
  "/:id/address",
  ensureTokenIsValidMiddleware,
  ensureUserIdExist,
  ensureIsAutorzedUser,
  ensureDataIsValidMiddleware(addressSchemaUpdate),
  ensureUserEmailExist,
  updateUserAddressController
);

usersRoutes.delete(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserIdExist,
  deleteUserController
);

export default usersRoutes;
