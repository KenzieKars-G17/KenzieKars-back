import { DeepPartial } from "typeorm";
import { z } from "zod";
import {
  createCommentSchema,
  createCommentResponseSchema,
  commentSchemaArrays,
  updateCommentSchema,
} from "../schemas/comments.schema";

type ICommentResponse = z.infer<typeof createCommentResponseSchema>;
type IComment = z.infer<typeof createCommentSchema>;
type ICommentList = z.infer<typeof commentSchemaArrays>;
type ICommentUpdate = DeepPartial<IComment>;
export { ICommentResponse, IComment, ICommentList, ICommentUpdate };
