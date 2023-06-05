import { z } from "zod";
import { imageSchema } from "../schemas/image.schema";

type Timage = z.infer<typeof imageSchema>;

export { Timage };
