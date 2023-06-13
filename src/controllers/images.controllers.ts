import { Request, Response } from "express";
import { AppError } from "../errors";
import createImagesAdvertisementService from "../services/images/createImage.service";
import deleteImageService from "../services/images/deleteImage.service";
import { listAdvertisementImagesService } from "../services/images/listAllAdImages.service";

const createImagesController = async (req: Request, res: Response) => {
  const advertisementId = req.body.adId;
  if (!advertisementId) {
    throw new AppError("Advertisement does not exists", 404);
  }
  const newImages = await createImagesAdvertisementService(
    req.body,
    advertisementId
  );

  return res.status(201).json(newImages);
};

const deleteImageController = async (req: Request, res: Response) => {
  const imageId = req.body.id;
  await deleteImageService(imageId);
  return res.status(204).send();
};

const listImagesController = async (req: Request, res: Response) => {
  const adId = +req.params.id;

  const images = await listAdvertisementImagesService(adId);
  console.log(images);
  return res.json(images);
};

export { createImagesController, deleteImageController, listImagesController };
