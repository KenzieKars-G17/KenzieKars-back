import { Request, Response } from "express";
import { createAdvertisementService } from "../services/advertisements/createAdvertisements.service";
import { listSellerAdvertisementService } from "../services/advertisements/listAllSellerAdvertisement.service";
import { deleteAdvertisementService } from "../services/advertisements/deleteAdvertisement.service";
import {
  TAdvertisementUpdateRequest,
  TAdvertisementStatus,
} from "../interfaces/advertisement.interface";

import { updateAdvertisementService } from "../services/advertisements/updateAdvertisement.service";
import { listAllAdvertisementsService } from "../services/advertisements/listAllActiveAdvertisements.service";
import { updateStatusAdvertisementService } from "../services/advertisements/updateStatusAdvertisement.service";
import { listAdvertisementByIdService } from "../services/advertisements/listAdvertisementById.service";
import { v2 as cloudinary } from "cloudinary";

const createAdvertisementController = async (req: Request, res: Response) => {
  const userId: number = req.user.sub;

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME!,
    api_key: process.env.API_KEY!,
    api_secret: process.env.API_SECRET!,
  });

  let uploadedFiles = Object.values(req.files!);
  const cover_image_path = uploadedFiles[0] ? uploadedFiles[0][0].path : null;
  const gallery_image_1_path = uploadedFiles[1]
    ? uploadedFiles[1][0].path
    : null;
  const gallery_image_2_path = uploadedFiles[2]
    ? uploadedFiles[2][0].path
    : null;
  const gallery_image_3_path = uploadedFiles[3]
    ? uploadedFiles[3][0].path
    : null;
  const gallery_image_4_path = uploadedFiles[4]
    ? uploadedFiles[4][0].path
    : null;

  const galleryImages = [
    { image: "" },
    { image: "" },
    { image: "" },
    { image: "" },
  ];

  try {
    if (cover_image_path) {
      const uploadCoverImage = await cloudinary.uploader.upload(
        cover_image_path,
        { resource_type: "image" },
        (err, result) => {
          if (result) {
            req.body.cover_image = result.secure_url;
            req.body.price = +req.body.price;
            req.body.table_price = +req.body.table_price;
          }
        }
      );
    }

    if (gallery_image_1_path) {
      const uploadGalleryImage1 = await cloudinary.uploader.upload(
        gallery_image_1_path,
        { resource_type: "image" },
        (err, result) => {
          if (result) {
            galleryImages[0].image = result.secure_url;
          }
        }
      );
    }

    if (gallery_image_2_path) {
      const uploadGalleryImage2 = await cloudinary.uploader.upload(
        gallery_image_2_path,
        { resource_type: "image" },
        (err, result) => {
          if (result) {
            galleryImages[1].image = result.secure_url;
          }
        }
      );
    }

    if (gallery_image_3_path) {
      const uploadGalleryImage3 = await cloudinary.uploader.upload(
        gallery_image_3_path,
        { resource_type: "image" },
        (err, result) => {
          if (result) {
            galleryImages[2].image = result.secure_url;
          }
        }
      );
    }

    if (gallery_image_4_path) {
      const uploadGalleryImage4 = await cloudinary.uploader.upload(
        gallery_image_4_path,
        { resource_type: "image" },
        (err, result) => {
          if (result) {
            galleryImages[3].image = result.secure_url;
          }
        }
      );
    }

    const newAdvertisement = await createAdvertisementService(
      req.body,
      userId,
      galleryImages
    );

    return res.status(201).json(newAdvertisement);
  } catch (error) {
    console.log(error);
  }
};

const listSellerAdvertisementsController = async (
  req: Request,
  res: Response
) => {
  const userId: number = Number(req.params.id);

  const Advertisements = await listSellerAdvertisementService(
    userId,
    res.locals.pagination
  );

  return res.json(Advertisements);
};

const updateAdvertisementController = async (req: Request, res: Response) => {
  const advertisementId: number = parseInt(req.params.id);

  const updateData: TAdvertisementUpdateRequest = req.body;

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME!,
    api_key: process.env.API_KEY!,
    api_secret: process.env.API_SECRET!,
  });

  try {
    const uploadImg = await cloudinary.uploader.upload(
      req.file?.path!,
      { resource_type: "image" },
      (err, result) => {
        if (result) {
          updateData.cover_image = result.secure_url;

          if (updateData.price) {
            updateData.price = +updateData.price;
          }
          if (updateData.table_price) {
            updateData.table_price = +updateData.table_price;
          }
        }
      }
    );

    const updateAdvertisement = await updateAdvertisementService(
      updateData,
      advertisementId
    );

    return res.status(201).json(updateAdvertisement);
  } catch (error) {
    console.log(error);
  }
};

const deleteAdvertisementController = async (req: Request, res: Response) => {
  const advertisementId: number = parseInt(req.params.id);
  await deleteAdvertisementService(advertisementId);

  return res.status(204).send();
};

const listAllAdvertisementsController = async (req: Request, res: Response) => {
  const Advertisements = await listAllAdvertisementsService(
    res.locals.pagination
  );

  return res.json(Advertisements);
};

const listAdvertisementByIdController = async (req: Request, res: Response) => {
  const advertisementId: number = parseInt(req.params.id);

  const advertisement = await listAdvertisementByIdService(advertisementId);

  return res.json(advertisement);
};

const updateAdvertisementStatusController = async (
  req: Request,
  res: Response
) => {
  const advertisementId: number = parseInt(req.params.id);

  const updateData: TAdvertisementStatus = req.body;

  const updateAdvertisement = await updateStatusAdvertisementService(
    updateData,
    advertisementId
  );

  return res.json(updateAdvertisement);
};

export {
  createAdvertisementController,
  listSellerAdvertisementsController,
  updateAdvertisementController,
  deleteAdvertisementController,
  listAllAdvertisementsController,
  listAdvertisementByIdController,
  updateAdvertisementStatusController,
};
