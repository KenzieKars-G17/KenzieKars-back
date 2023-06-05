import { z } from "zod";
import {
  advertisementSchema,
  advertisementReqSchema,
  advertisementAll,
  advertisementResponseSchema,
} from "../schemas/advertisement.schema";

type TAdvertisement = z.infer<typeof advertisementSchema>;
type TAdvertisementAll = z.infer<typeof advertisementAll>;
type TAdvertisementReq = z.infer<typeof advertisementReqSchema>;
type TAdvertisementResponse = z.infer<typeof advertisementResponseSchema>

export { TAdvertisement, TAdvertisementAll, TAdvertisementReq, TAdvertisementResponse };
