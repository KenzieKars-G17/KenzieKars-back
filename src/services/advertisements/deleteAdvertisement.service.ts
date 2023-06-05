import { AppDataSource } from "../../data-source";
import { Advertisement } from "../../entities";
import { AppError } from "../../errors";

const deleteAdvertisementService = async (
  advertisementId: number
): Promise<void> => {
  const advertisementRepository = AppDataSource.getRepository(Advertisement);

  const advertisement: Advertisement | null =
    await advertisementRepository.findOneBy({
      id: advertisementId,
    });

  if (!advertisement) {
    throw new AppError("Advertisement not found", 404);
  }

  advertisementRepository.remove(advertisement);
};

export { deleteAdvertisementService };
