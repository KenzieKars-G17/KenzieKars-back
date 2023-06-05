import { z } from "zod";
import {
  advertisementSchema,
  advertisementReqSchema,
  advertisementAll,
} from "../schemas/advertisement.schema";

type TAdvertisement = z.infer<typeof advertisementSchema>;
type TAdvertisementAll = z.infer<typeof advertisementAll>;
type TAdvertisementReq = z.infer<typeof advertisementReqSchema>;

export { TAdvertisement, TAdvertisementAll, TAdvertisementReq };
