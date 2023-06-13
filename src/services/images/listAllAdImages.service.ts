import { AppDataSource } from "../../data-source";
import { Image, Advertisement } from "../../entities";
import { AppError } from "../../errors";
import { Timage } from "../../interfaces/image.interface";
import { imageSchemaArray } from "../../schemas/image.schema";

const listAdvertisementImagesService = async (
  adId: number
): Promise<Timage[]> => {
  const imageRepository = AppDataSource.getRepository(Image);
  const advertisementRepository = AppDataSource.getRepository(Advertisement);
  const advertisement1: Advertisement | null =
    await advertisementRepository.findOne({
      where: {
        id: adId,
      },
    });

  if (!advertisement1) {
    throw new AppError("Advertisement not found", 404);
  }

  const image: Image[] = await imageRepository.find({
    where: {
      advertisement: {
        id: advertisement1.id,
      },
    },
  });

  if (!image) {
    throw new AppError("Advertisement not found", 404);
  }

  return imageSchemaArray.parse(image);
};

export { listAdvertisementImagesService };
