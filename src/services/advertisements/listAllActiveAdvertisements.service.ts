// import { AppDataSource } from "../../data-source";
// import { Advertisement } from "../../entities";
// import { AppError } from "../../errors";

// import { TAdvertisementArray } from "../../interfaces/advertisement.interface";
// import { advertisementAllSchema } from "../../schemas/advertisement.schema";

// const listAllAdvertisementsService = async (
//   page: any,
//   perPage: any
// ): Promise<TAdvertisementArray> => {
//   const advertisementRepository = AppDataSource.getRepository(Advertisement);
//   const advertisement = await advertisementRepository.find({
//     skip: page,
//     take: perPage,
//     order: {
//       id: "DESC",
//     },
//     where: {
//       is_active: true,
//     },
//     relations: {
//       user: true,
//       images: true,
//     },
//   });
//   return advertisementAllSchema.parse(advertisement);
// };

// export { listAllAdvertisementsService };

import { AppDataSource } from "../../data-source";
import { Advertisement } from "../../entities";
import { AppError } from "../../errors";
import {
  IpaginationParams,
  Ipagination,
} from "../../interfaces/pagination.interfaces";
import paginationSchema from "../../schemas/pagination.schema";
import { TAdvertisementArray } from "../../interfaces/advertisement.interface";
import { advertisementAllSchema } from "../../schemas/advertisement.schema";

const listAllAdvertisementsService = async ({
  nextPage,
  page,
  perPage,
  prevPage,
}: IpaginationParams): Promise<Ipagination> => {
  const advertisementRepository = AppDataSource.getRepository(Advertisement);
  const [advertisement, count]: [Advertisement[], number] =
    await advertisementRepository.findAndCount({
      skip: perPage * (page - 1),
      take: perPage,
      order: {
        id: "DESC",
      },
      where: {
        is_active: true,
      },
      relations: {
        user: true,
        images: true,
      },
    });
  return {
    prevPage: page <= 1 ? null : prevPage,
    nextPage: count - page <= perPage ? null : nextPage,
    count,
    data: advertisement,
  };
};

export { listAllAdvertisementsService };
