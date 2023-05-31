import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";

const deleteUserService = async (idUser: number): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      id: idUser,
    },
  });

  await userRepository.softRemove(user!);
};

export default deleteUserService;