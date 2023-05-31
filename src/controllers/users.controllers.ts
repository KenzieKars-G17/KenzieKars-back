import { Request, Response } from "express";
import createUserService from "../services/users/createUsers.service";
import { IUser, IUserUpdate } from "../interfaces/users.interfaces";
import listAllUsersService from "../services/users/listUsers.service";
import deleteUserService from "../services/users/deleteUser.service";
import updateUserService from "../services/users/updateUser.service";

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: IUser = req.body;

  const newUser = await createUserService(userData);

  return res.status(201).json(newUser);
};

const listAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await listAllUsersService();

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

export {
  createUserController,
  listAllUsersController,
  deleteUserController,
  updateUserController,
};