import { AppDataSource } from "../../data-source";
import { Advertisement } from "../../entities";
import { AppError } from "../../errors";
import { TAdvertisementResponse } from "../../interfaces/advertisement.interface";
import { advertisementByIdResponse } from "../../schemas/advertisement.schema";

const listAdvertisementByIdService = async (
  adId: number
): Promise<TAdvertisementResponse> => {
  const advertisementRepository = AppDataSource.getRepository(Advertisement);

  const advertisement: Advertisement | null =
    await advertisementRepository.findOne({
      where: {
        id: adId,
      },
      relations: {
        user: true,
        images: true,
      },
    });

  if (!advertisement) {
    throw new AppError("Advertisement not found", 404);
  }

  return advertisementByIdResponse.parse(advertisement);
};

export { listAdvertisementByIdService };
