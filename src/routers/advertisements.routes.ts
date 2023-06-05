import { Router } from "express";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsvalid.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { advertisementReqSchema, updateAdvertisementSchema } from "../schemas/advertisement.schema";
import { createAdvertisementController, deleteAdvertisementController, listAdvertisementsByIdController, updateAdvertisementController } from "../controllers/advertisements.controller";
import ensureUserIsSeller from "../middlewares/ensureIsSeller.middleware";

const advertisementRoutes = Router();

advertisementRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureUserIsSeller,
  ensureDataIsValidMiddleware(advertisementReqSchema),
  createAdvertisementController
);

advertisementRoutes.get('', ensureTokenIsValidMiddleware,ensureUserIsSeller,listAdvertisementsByIdController)

advertisementRoutes.patch('/:id',ensureTokenIsValidMiddleware, ensureUserIsSeller,ensureDataIsValidMiddleware(updateAdvertisementSchema), updateAdvertisementController)

advertisementRoutes.delete('/:id',ensureTokenIsValidMiddleware,ensureUserIsSeller,deleteAdvertisementController)

export default advertisementRoutes;
