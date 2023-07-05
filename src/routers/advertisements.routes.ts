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
import {
  createImagesController,
  deleteImageController,
  listImagesController,
} from "../controllers/images.controllers";
import ensureUserIsSeller from "../middlewares/ensureIsSeller.middleware";
import upload from "../middlewares/multer.middleware";
import pagination from "../middlewares/pagination.Middleware";

const advertisementRoutes = Router();

advertisementRoutes.post(
  "",
  upload.fields([
    { name: "cover_image", maxCount: 1 },
    { name: "gallery_image_1", maxCount: 1 },
    { name: "gallery_image_2", maxCount: 1 },
    { name: "gallery_image_3", maxCount: 1 },
    { name: "gallery_image_4", maxCount: 1 },
  ]),
  ensureTokenIsValidMiddleware,
  ensureUserIsSeller,
  // ensureDataIsValidMiddleware(advertisementReqSchema),
  createAdvertisementController
);

advertisementRoutes.get(
  "/seller/:id",
  pagination,
  listSellerAdvertisementsController
);

advertisementRoutes.get("", pagination, listAllAdvertisementsController);

advertisementRoutes.get("/:id", listAdvertisementByIdController);

advertisementRoutes.patch(
  "/:id",
  upload.any(),
  ensureTokenIsValidMiddleware,
  ensureUserIsSeller,
  // ensureDataIsValidMiddleware(updateAdvertisementSchema),
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

advertisementRoutes.post(
  "/:id/images",
  upload.single("image"),
  ensureTokenIsValidMiddleware,
  ensureUserIsSeller,
  createImagesController
);

advertisementRoutes.delete(
  "/:id/images",
  ensureTokenIsValidMiddleware,
  ensureUserIsSeller,
  deleteImageController
);

advertisementRoutes.get(
  "/:id/images",

  listImagesController
);

export default advertisementRoutes;
