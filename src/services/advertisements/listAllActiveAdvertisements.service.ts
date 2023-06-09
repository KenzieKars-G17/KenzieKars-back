import { AppDataSource } from "../../data-source";
import { Advertisement } from "../../entities";
import { AppError } from "../../errors";

import { TAdvertisementArray } from "../../interfaces/advertisement.interface";
import { advertisementAllSchema } from "../../schemas/advertisement.schema";

const listAllAdvertisementsService = async (): Promise<TAdvertisementArray> => {
  const advertisementRepository = AppDataSource.getRepository(Advertisement);
  const advertisement = await advertisementRepository.find({
    where: {
      is_active: true,
    },
    relations: {
      user: true,
    },
  });
  return advertisementAllSchema.parse(advertisement);
};

export { listAllAdvertisementsService };
