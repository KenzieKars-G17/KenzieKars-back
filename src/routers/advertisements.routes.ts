import { Router } from "express";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsvalid.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import {
  advertisementReqSchema,
  updateAdvertisementSchema,
} from "../schemas/advertisement.schema";
import {
  createAdvertisementController,
  deleteAdvertisementController,
  listSellerAdvertisementsController,
  updateAdvertisementController,
  listAllAdvertisementsController,
  updateAdvertisementStatusController,
  listAdvertisementByIdController,
} from "../controllers/advertisements.controllers";
import ensureUserIsSeller from "../middlewares/ensureIsSeller.middleware";

const advertisementRoutes = Router();

advertisementRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureUserIsSeller,
  ensureDataIsValidMiddleware(advertisementReqSchema),
  createAdvertisementController
);

advertisementRoutes.get(
  "/seller",
  ensureTokenIsValidMiddleware,
  ensureUserIsSeller,
  listSellerAdvertisementsController
);

advertisementRoutes.get("", listAllAdvertisementsController);

advertisementRoutes.get("/:id", listAdvertisementByIdController);

advertisementRoutes.patch(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserIsSeller,
  ensureDataIsValidMiddleware(updateAdvertisementSchema),
  updateAdvertisementController
);

advertisementRoutes.delete(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserIsSeller,
  deleteAdvertisementController
);


advertisementRoutes.patch(
  "/status/:id",
  ensureTokenIsValidMiddleware,
  ensureUserIsSeller,
  updateAdvertisementStatusController
);

export default advertisementRoutes;
