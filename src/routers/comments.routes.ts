import { Router } from "express";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsvalid.middleware";

import {
  createCommentsController,
  listCommentsController,
  deleteCommentsController,
  updateCommentsController,
} from "../controllers/comments.controllers";

const commentsRoute = Router();

commentsRoute.post(
  "/:id/comments",
  ensureTokenIsValidMiddleware,
  createCommentsController
);
commentsRoute.patch(
  "/comments/:id",
  ensureTokenIsValidMiddleware,
  updateCommentsController
);

commentsRoute.get("/:id/comments", listCommentsController);

commentsRoute.delete(
  "/:id/comments/:id",
  ensureTokenIsValidMiddleware,
  deleteCommentsController
);

export default commentsRoute;
