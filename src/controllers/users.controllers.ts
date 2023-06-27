import { Request, Response } from "express";
import createUserService from "../services/users/createUsers.service";
import { IUser, IUserUpdate } from "../interfaces/users.interfaces";
import { IAddressUpdate } from "../interfaces/address.interface";
import listAllUsersService from "../services/users/listUsers.service";
import deleteUserService from "../services/users/deleteUser.service";
import updateUserService from "../services/users/updateUser.service";
import updateUserAddressService from "../services/users/updateUserAddress.service";
import { listUserService } from "../services/users/getUser.service";
import sendEmailResetPasswordUserService from "../services/users/sendEmailResetPasswordUser.service";
import resetPasswordUserService from "../services/users/resetPasswordUser.service";

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: IUser = req.body;

  const newUser = await createUserService(userData);

  return res.status(201).json(newUser);
};

const listUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = Number(req.params.id);
  const users = await listUserService(userId);

  return res.json(users);
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteUserService(parseInt(req.params.id));

  return res.status(204).send();
};

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: IUserUpdate = req.body;
  const idUser = parseInt(req.params.id);

  const updatedUser = await updateUserService(userData, idUser);

  return res.json(updatedUser);
};

const updateUserAddressController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const addressData: IAddressUpdate = req.body;
  const idUser = parseInt(req.params.id);

  const updatedAddress = await updateUserAddressService(addressData, idUser);

  return res.json(updatedAddress);
};

const sendEmailResetPasswordController = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;

  await sendEmailResetPasswordUserService(email);

  return res.json({ message: "token enviado" });
};

const resetPasswordController = async (req: Request, res: Response) => {
  const { password } = req.body;
  const { token } = req.params;

  await resetPasswordUserService(password, token);

  return res.json({ message: "password changed with sucess!" });
};

export {
  createUserController,
  deleteUserController,
  updateUserController,
  updateUserAddressController,
  listUsersController,
  sendEmailResetPasswordController,
  resetPasswordController,
};
