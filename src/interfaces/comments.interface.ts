import { DeepPartial } from "typeorm";
import { z } from "zod";
import {
  createCommentSchema,
  createCommentResponseSchema,
  commentSchemaArrays,
} from "../schemas/comments.schema";

type ICommentResponse = z.infer<typeof createCommentResponseSchema>;
type IComment = z.infer<typeof createCommentSchema>;
type ICommentList = z.infer<typeof commentSchemaArrays>;
export { ICommentResponse, IComment, ICommentList };
