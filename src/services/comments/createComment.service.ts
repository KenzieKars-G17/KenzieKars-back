import moment from "moment";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Advertisement } from "../../entities";
import { User } from "../../entities";
import Comment from "../../entities/comments.entity";

import {
  IComment,
  ICommentResponse,
} from "../../interfaces/comments.interface";
import {
  createCommentSchema,
  createCommentResponseSchema,
} from "../../schemas/comments.schema";

const createCommentAdvertisementService = async (
  data: IComment,
  advertisementId: string,
  userId: string
): Promise<ICommentResponse> => {
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

  const user: User | null = await userRepository.findOneBy({
    id: +userId,
  });

  if (!user) {
    throw new AppError("User does not exists", 404);
  }

  const comment = commentRepository.create({
    ...data,
    advertisement: advertisement,
    user: user,
  });

  await commentRepository.save(comment);

  return createCommentResponseSchema.parse(comment);
};

export default createCommentAdvertisementService;
