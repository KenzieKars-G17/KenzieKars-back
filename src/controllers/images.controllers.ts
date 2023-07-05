import { Request, Response } from "express";
import { AppError } from "../errors";
import createImagesAdvertisementService from "../services/images/createImage.service";
import deleteImageService from "../services/images/deleteImage.service";
import { listAdvertisementImagesService } from "../services/images/listAllAdImages.service";
import { v2 as cloudinary } from "cloudinary";

const createImagesController = async (req: Request, res: Response) => {  
  
  const advertisementId = parseInt(req.params.id);

    if (!advertisementId) {
    throw new AppError("Advertisement does not exists", 404);
  }

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME!,
    api_key: process.env.API_KEY!,
    api_secret: process.env.API_SECRET!,
  });

  let data = {
    image: "",
  };

  try {
    const uploadImg = await cloudinary.uploader.upload(
      req.file?.path!,
      { resource_type: "image" },
      (err, result) => {
        if (result) {
          data = {
            image: result.secure_url,
          };
        }
      }
    );

    const newImages = await createImagesAdvertisementService(
      data,
      advertisementId
    );

    return res.status(201).json(newImages);
  } catch (error) {
    console.log(error);
  }
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
