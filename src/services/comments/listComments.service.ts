import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Advertisement } from "../../entities";
import { User } from "../../entities";
import Comment from "../../entities/comments.entity";

import { IComment, ICommentList } from "../../interfaces/comments.interface";
import { commentSchemaArrays } from "../../schemas/comments.schema";

const listCommentAdvertisementService = async (
  advertisementId: string
): Promise<ICommentList> => {
  const advertisementRepository = AppDataSource.getRepository(Advertisement);
  const userRepository = AppDataSource.getRepository(User);
  const commentRepository = AppDataSource.getRepository(Comment);

  const advertisement: Advertisement | null =
    await advertisementRepository.findOneBy({
      id: +advertisementId,
    });

  if (!advertisement) {
    throw new AppError("Advertisement does not exists", 404);
  }

  const comment: Comment[] = await commentRepository.find({
    where: {
      advertisement: {
        id: +advertisementId,
      },
    },
    relations: {
      user: true,
    },
  });

  if (!comment) {
    throw new AppError("Advertisement not found", 404);
  }

  return commentSchemaArrays.parse(comment);
};

export default listCommentAdvertisementService;
