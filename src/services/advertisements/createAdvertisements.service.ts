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

const createAdvertisementService = async (  data: TAdvertisementReq,  userId: number, galleryImages: any): Promise<TAdvertisement> => {

  console.log('***********************************************************************************************')
  console.log('*BODY QUE VIROU DATA NO SERVICE**********************************************************************************************')
  console.log(data)
  console.log('***********************************************************************************************')
  console.log('***********************************************************************************************')
  console.log('***********************************************************************************************')
  console.log('GALLERY IMAGES***********************************************************************************************')
  console.log(galleryImages)
  console.log('***********************************************************************************************')

  const usersRepository = AppDataSource.getRepository(User);
  const advertisementRepository = AppDataSource.getRepository(Advertisement);

  const user: User | null = await usersRepository.findOneBy({    id: userId,  });

  if (!user) {    throw new AppError("User does not exists", 404);  }

  const advertisement: Advertisement | null = advertisementRepository.create({    ...data,    user: user,  });

  await advertisementRepository.save(advertisement);

  if (galleryImages[0].image !== "") {
    createImagesAdvertisementService(galleryImages[0], advertisement.id)
  }
  if (galleryImages[1].image !== "") {
    createImagesAdvertisementService(galleryImages[1], advertisement.id)
  }
  if (galleryImages[2].image !== "") {
    createImagesAdvertisementService(galleryImages[2], advertisement.id)
  }
  if (galleryImages[3].image !== "") {
    createImagesAdvertisementService(galleryImages[3], advertisement.id)
  }

  return advertisementSchema.parse(advertisement);


};

export { createAdvertisementService };
