import { Request, Response } from "express";
import { createAdvertisementService } from "../services/advertisements/createAdvertisements.service";
import { listAdvertisementByIdService } from "../services/advertisements/listAllAdvertisement.service";
import { deleteAdvertisementService } from "../services/advertisements/deleteAdvertisement.service";
import { TAdvertisementUpdateRequest } from "../interfaces/advertisement.interface";
import { updateAdvertisementService } from "../services/advertisements/updateAdvertisement.service";

const createAdvertisementController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = req.user.sub;
  const newAdvertisement = await createAdvertisementService(req.body, userId);

  return res.status(201).json(newAdvertisement);
};

const listAdvertisementsByIdController = async (
  req: Request,
  res: Response
) => {
  const userId: number = res.locals.sub;

  const Advertisements = await listAdvertisementByIdService(userId);

  return res.json(Advertisements);
};

const updateAdvertisementController = async (req: Request, res: Response) => {
  const advertisementId: number = parseInt(req.params.id);

  const updateData: TAdvertisementUpdateRequest = req.body;

  const updateContact = await updateAdvertisementService(
    updateData,
    advertisementId
  );

  return res.json(updateContact);
};

const deleteAdvertisementController = async (req: Request, res: Response) => {
  const advertisementId: number = parseInt(req.params.id);
  await deleteAdvertisementService(advertisementId);

  return res.status(204).send();
};

export {
  createAdvertisementController,
  listAdvertisementsByIdController,
  updateAdvertisementController,
  deleteAdvertisementController,
};
