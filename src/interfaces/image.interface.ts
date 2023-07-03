import { z } from "zod";
import { imageSchema, imageSchemaReq } from "../schemas/image.schema";

type Timage = z.infer<typeof imageSchema>;
type TimageReq = z.infer<typeof imageSchemaReq>;
export { Timage, TimageReq };
