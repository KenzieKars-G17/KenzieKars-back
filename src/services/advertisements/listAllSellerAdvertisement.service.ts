import { AppDataSource } from "../../data-source";
import { Advertisement, User } from "../../entities";
import { AppError } from "../../errors";

import { TAdvertisementArray } from "../../interfaces/advertisement.interface";
import { advertisementAllSchema } from "../../schemas/advertisement.schema";

const listSellerAdvertisementService = async (
  userId: number
): Promise<TAdvertisementArray> => {
  const advertisementRepository = AppDataSource.getRepository(Advertisement);
  const usersRepository = AppDataSource.getRepository(User);

  const user: User | null = await usersRepository.findOneBy({
    id: userId,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const advertisements: Advertisement[] = await advertisementRepository.find({
    where: {
      user: {
        id: user.id,
      },
    },
    relations: {
      user: true,
    },
  });

  return advertisementAllSchema.parse(advertisements);
};

export { listSellerAdvertisementService };
