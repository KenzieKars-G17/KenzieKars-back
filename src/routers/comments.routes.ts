import { Router } from "express";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsvalid.middleware";

import {
  createCommentsController,
  listCommentsController,
  deleteCommentsController,
} from "../controllers/comments.controllers";

const commentsRoute = Router();

commentsRoute.post(
  "/:id/comments",
  ensureTokenIsValidMiddleware,
  createCommentsController
);

commentsRoute.get(
  "/:id/comments",
  ensureTokenIsValidMiddleware,
  listCommentsController
);

commentsRoute.delete(
  "/:id/comments/:id",
  ensureTokenIsValidMiddleware,
  deleteCommentsController
);

export default commentsRoute;
