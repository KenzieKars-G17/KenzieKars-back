import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Advertisement, Image } from "../../entities";
import { imageSchema } from "../../schemas/image.schema";
import { Timage, TimageReq } from "../../interfaces/image.interface";

const createImagesAdvertisementService = async (
  data: TimageReq,
  advertisementId: string
): Promise<Timage> => {
  const advertisementRepository = AppDataSource.getRepository(Advertisement);
  const imagesRepository = AppDataSource.getRepository(Image);

  const advertisement: Advertisement | null =
    await advertisementRepository.findOneBy({
      id: +advertisementId,
    });

  if (!advertisement) {
    throw new AppError("Advertisement does not exists", 404);
  }

  const image = imagesRepository.create({
    ...data,
    advertisement: advertisement,
  });

  await imagesRepository.save(image);

  return imageSchema.parse(image);
};

export default createImagesAdvertisementService;
