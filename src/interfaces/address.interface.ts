import { DeepPartial } from "typeorm";
import { z } from "zod";
import { addressSchema } from "../schemas/address.schema";

type IAddressResponse = z.infer<typeof addressSchema>;
type IAddressUpdate = DeepPartial<IAddressResponse>;

export { IAddressUpdate, IAddressResponse };
