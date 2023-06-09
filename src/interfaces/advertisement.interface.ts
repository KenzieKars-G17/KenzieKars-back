import { z } from "zod";
import {
  advertisementSchema,
  advertisementReqSchema,
  advertisementAllSchema,
  advertisementResponseSchema,
  updateAdvertisementSchema,
  advertisementStatus,
} from "../schemas/advertisement.schema";
import { DeepPartial } from "typeorm";

type TAdvertisement = z.infer<typeof advertisementSchema>;
type TAdvertisementAll = z.infer<typeof advertisementAllSchema>;
type TAdvertisementReq = z.infer<typeof advertisementReqSchema>;
type TAdvertisementResponse = z.infer<typeof advertisementResponseSchema>;
type TAdvertisementArray = z.infer<typeof advertisementAllSchema>;
type TAdvertisementUpdateRequest = DeepPartial<TAdvertisementReq>;
type TupdateAdvertisement = z.infer<typeof updateAdvertisementSchema>;
type TAdvertisementStatus = z.infer<typeof advertisementStatus>;

export {
  TAdvertisement,
  TAdvertisementAll,
  TAdvertisementReq,
  TAdvertisementResponse,
  TAdvertisementArray,
  TAdvertisementUpdateRequest,
  TupdateAdvertisement,
  TAdvertisementStatus,
};
