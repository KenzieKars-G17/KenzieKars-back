import { Router } from "express";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsvalid.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { advertisementReqSchema } from "../schemas/advertisement.schema";
import { createAdvertisementController } from "../controllers/advertisements.controller";
import ensureUserIdExist from "../middlewares/ensureUserExists.middleware";
import ensureUserIsSeller from "../middlewares/ensureIsSeller.middleware";

const advertisementRoutes = Router();

advertisementRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureUserIsSeller,
  ensureDataIsValidMiddleware(advertisementReqSchema),
  createAdvertisementController
);

export default advertisementRoutes;
