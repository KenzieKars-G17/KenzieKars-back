import { z } from "zod";
import { advertisementAllSchema } from "./advertisement.schema";

const paginationSchema = z.object({
  prevPage: z.string(),
  nextPage: z.string(),
  count: z.number(),
  data: advertisementAllSchema,
});

export default paginationSchema;
