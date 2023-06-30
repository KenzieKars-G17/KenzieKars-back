import { AppDataSource } from "../../data-source";
import { Advertisement, User } from "../../entities";
import { AppError } from "../../errors";

import { Ipagination } from "../../interfaces/pagination.interfaces";
import { TAdvertisementArray } from "../../interfaces/advertisement.interface";
import { advertisementAllSchema } from "../../schemas/advertisement.schema";

const listSellerAdvertisementService = async (
  userId: number,
  params: any
): Promise<Ipagination> => {
  const advertisementRepository = AppDataSource.getRepository(Advertisement);
  const usersRepository = AppDataSource.getRepository(User);
  const page = params.page;
  const perPage = params.perPage;
  const nextPage = params.nextPage;
  const prevPage = params.prevPage;
  const user: User | null = await usersRepository.findOneBy({
    id: userId,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const [advertisement, count]: [Advertisement[], number] =
    await advertisementRepository.findAndCount({
      skip: perPage * (page - 1),
      take: perPage,
      order: {
        id: "DESC",
      },
      where: {
        user: {
          id: user.id,
        },
      },
      relations: {
        user: true,
      },
    });

  return {
    prevPage: page <= 1 ? null : prevPage,
    nextPage: count - page <= perPage ? null : nextPage,
    count,
    data: advertisement,
  };
};

export { listSellerAdvertisementService };
