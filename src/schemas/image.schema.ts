import { z } from "zod";

const imageSchema = z.object({
  id: z.string().min(3).max(125),
  image: z.string().max(250),
});

const imageSchemaArray = imageSchema.array();

export { imageSchema, imageSchemaArray };
