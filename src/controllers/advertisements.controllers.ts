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

const createAdvertisementController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = req.user.sub;
  const newAdvertisement = await createAdvertisementService(req.body, userId);

  return res.status(201).json(newAdvertisement);
};

const listSellerAdvertisementsController = async (
  req: Request,
  res: Response
) => {
  const userId: number = Number(req.params.id);

  const Advertisements = await listSellerAdvertisementService(userId);

  return res.json(Advertisements);
};

const updateAdvertisementController = async (req: Request, res: Response) => {
  const advertisementId: number = parseInt(req.params.id);

  const updateData: TAdvertisementUpdateRequest = req.body;

  const updateAdvertisement = await updateAdvertisementService(
    updateData,
    advertisementId
  );

  return res.json(updateAdvertisement);
};

const deleteAdvertisementController = async (req: Request, res: Response) => {
  const advertisementId: number = parseInt(req.params.id);
  await deleteAdvertisementService(advertisementId);

  return res.status(204).send();
};

const listAllAdvertisementsController = async (req: Request, res: Response) => {
  const Advertisements = await listAllAdvertisementsService();

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
