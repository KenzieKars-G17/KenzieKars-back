import { Request, Response } from "express";
import { AppError } from "../errors";
import createCommentAdvertisementService from "../services/comments/createComment.service";
import listCommentAdvertisementService from "../services/comments/listComments.service";
import deleteCommentService from "../services/comments/deleteComment.service";
import { updateCommentService } from "../services/comments/updateComment.service";

const createCommentsController = async (req: Request, res: Response) => {
  const advertisementId = req.params.id;
  const userId = req.user.sub + "";
  if (!advertisementId) {
    throw new AppError("Advertisement does not exists", 404);
  }
  const newImages = await createCommentAdvertisementService(
    req.body,
    advertisementId,
    userId
  );

  return res.status(201).json(newImages);
};

const updateCommentsController = async (req: Request, res: Response) => {
  const commentId = +req.params.id;

  const updatedComent = await updateCommentService(req.body, commentId);

  return res.status(201).json(updatedComent);
};

const deleteCommentsController = async (req: Request, res: Response) => {
  const commentId = +req.params.id;
  const reqId = +req.user.sub;

  await deleteCommentService(commentId, reqId);
  return res.status(204).send();
};

const listCommentsController = async (req: Request, res: Response) => {
  const adId = req.params.id;
  const comments = await listCommentAdvertisementService(adId);

  return res.json(comments);
};

export {
  createCommentsController,
  listCommentsController,
  deleteCommentsController,
  updateCommentsController,
};
