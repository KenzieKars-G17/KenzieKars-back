import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Comment } from "../../entities";

const deleteCommentService = async (
  commentId: number,
  reqId: number
): Promise<void> => {
  const imageRepostitory: Repository<Comment> =
    AppDataSource.getRepository(Comment);

  const comment: Comment | null = await imageRepostitory.findOne({
    where: {
      id: commentId,
    },
    relations: {
      user: true,
    },
  });
  if (!comment) {
    throw new AppError("Comment does not exists", 404);
  }
  if (comment.user.id !== reqId) {
    throw new AppError("Insuficient permissions!", 404);
  }
  await imageRepostitory.remove(comment);
};

export default deleteCommentService;
