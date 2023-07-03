import { z } from "zod";
import { returnUserAdSchema } from "./users.schemas";
import { advertisementResponseSchema } from "./advertisement.schema";

const createCommentSchema = z.object({
  comment: z.string(),
});
const updateCommentSchema = z.object({
  comment: z.string().optional(),
});

const createCommentResponseSchema = z.object({
  id: z.number(),
  comment: z.string(),
  advertisement: advertisementResponseSchema,
  user: returnUserAdSchema,
});

const commentSchemaArrays = z
  .object({
    id: z.number(),
    comment: z.string(),
    createdAt: z.date(),
    user: returnUserAdSchema,
  })
  .array();

export {
  createCommentSchema,
  createCommentResponseSchema,
  commentSchemaArrays,
  updateCommentSchema,
};
