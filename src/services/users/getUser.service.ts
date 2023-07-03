import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";

import { IUserReturn } from "../../interfaces/users.interfaces";
import { returnUserSchema } from "../../schemas/users.schemas";

const listUserService = async (userId: number) => {
  const userRepository = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      address: true,
    },
  });
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return returnUserSchema.parse(user);
};

export { listUserService };
