import { z } from "zod";

const imageSchema = z.object({
  id: z.number(),
  image: z.string().max(250),
});

const imageSchemaReq = z.object({
  image: z.string().max(250),
});
const imageSchemaArray = imageSchema.array();

export { imageSchema, imageSchemaReq, imageSchemaArray };
