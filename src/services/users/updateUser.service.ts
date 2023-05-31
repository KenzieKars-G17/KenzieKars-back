import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IUserReturn, IUserUpdate } from "../../interfaces/users.interfaces";
import { returnUserSchema } from "../../schemas/users.schemas";

const updateUserService = async (
  newUserData: IUserUpdate,
  idUser: number
): Promise<IUserReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldUserData: User | null = await userRepository.findOneBy({
    id: idUser,
  });

  const user: User = userRepository.create({
    ...oldUserData,
    ...newUserData,
  });

  await userRepository.save(user);

  const updatedUser: IUserReturn = returnUserSchema.parse(user);

  return updatedUser;
};

export default updateUserService;