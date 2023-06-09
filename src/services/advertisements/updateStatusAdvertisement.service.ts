import { AppDataSource } from "../../data-source";
import { Advertisement } from "../../entities";
import { AppError } from "../../errors";
import {
  TAdvertisementStatus,
  TupdateAdvertisement,
} from "../../interfaces/advertisement.interface";
import {
  advertisementStatus,
  updateAdvertisementSchema,
} from "../../schemas/advertisement.schema";

const updateStatusAdvertisementService = async (
  data: TAdvertisementStatus,
  advertisementId: number
): Promise<TupdateAdvertisement> => {
  const AdvertisementRepository = AppDataSource.getRepository(Advertisement);
  const oldAdvertisement: Advertisement | null =
    await AdvertisementRepository.findOneBy({
      id: advertisementId,
    });

  if (!oldAdvertisement) {
    throw new AppError("Advertisement not found", 404);
  }

  const newAdvertisementData = AdvertisementRepository.create({
    ...oldAdvertisement,
    ...data,
  });

  await AdvertisementRepository.save(newAdvertisementData);

  return advertisementStatus.parse(newAdvertisementData);
};

export { updateStatusAdvertisementService };
