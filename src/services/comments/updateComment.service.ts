import { AppDataSource } from "../../data-source";
import { Comment } from "../../entities";
import { AppError } from "../../errors";
import {
  ICommentUpdate,
  ICommentResponse,
} from "../../interfaces/comments.interface";
import {
  updateCommentSchema,
  createCommentSchema,
} from "../../schemas/comments.schema";

const updateCommentService = async (
  data: ICommentUpdate,
  commentId: number
) => {
  const commentRepository = AppDataSource.getRepository(Comment);
  const oldComment = await commentRepository.findOneBy({
    id: commentId,
  });
  if (!oldComment) {
    throw new AppError("Comment not found", 404);
  }
  const newComment = commentRepository.create({
    ...oldComment,
    ...data,
  });
  await commentRepository.save(newComment);
  return createCommentSchema.parse(newComment);
};

export { updateCommentService };
