import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IArrayUsers } from "../../interfaces/users.interfaces";
import { arrayUserSchema } from "../../schemas/users.schemas";

const listAllUsersService = async (): Promise<IArrayUsers> => {
  const usersRepository: Repository<User> = AppDataSource.getRepository(User);

  const listUsers: Array<User> = await usersRepository.find();

  const users: IArrayUsers = arrayUserSchema.parse(listUsers);

  return users;
};

export default listAllUsersService;