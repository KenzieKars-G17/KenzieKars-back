import { AppDataSource } from "../../data-source";
import { Advertisement, Image, User } from "../../entities";
import {
  TAdvertisement,
  TAdvertisementReq,
} from "../../interfaces/advertisement.interface";
import { AppError } from "../../errors";
import {
  advertisementSchema,
} from "../../schemas/advertisement.schema";
import createImagesAdvertisementService from "../images/createImage.service";

const createAdvertisementService = async (
  data: TAdvertisementReq,
  userId: number,
  galleryImages: any
): Promise<TAdvertisement> => {
  const usersRepository = AppDataSource.getRepository(User);
  const advertisementRepository = AppDataSource.getRepository(Advertisement);

  const user: User | null = await usersRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User does not exists", 404);
  }

  const advertisement: Advertisement | null = advertisementRepository.create({
    ...data,
    user: user,
  });

  await advertisementRepository.save(advertisement);

  for (let i = 0; i < galleryImages.length; i++) {
    if (galleryImages[i].image !== "") {
      createImagesAdvertisementService(galleryImages[i], advertisement.id);
    }
  }

  return advertisementSchema.parse(advertisement);
};

export { createAdvertisementService };
