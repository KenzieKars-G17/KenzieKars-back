import { z } from "zod";

import { returnUserAdSchema } from "./users.schemas";

const advertisementSchema = z.object({
  id: z.number(),
  brand: z.string().min(3).max(125),
  model: z.string().max(125),
  fuel: z.string().max(125),
  mileage: z.string().max(45),
  color: z.string().max(45),
  table_price: z.number(),
  price: z.number(),
  cover_image: z.string().max(45),
});

const advertisementResponseSchema = z
  .object({
    id: z.number(),
    brand: z.string().min(3).max(125),
    model: z.string().max(125),
    fuel: z.string().max(125),
    mileage: z.string().max(45),
    color: z.string().max(45),
    table_price: z.string(),
    price: z.string(),
    cover_image: z.string().max(45),
  })
  .partial();

const advertisementReqSchema = advertisementSchema.omit({ id: true });


const advertisementAll = advertisementResponseSchema
  .extend({ user: returnUserAdSchema })
  .partial()
  .array();

export {
  advertisementSchema,
  advertisementReqSchema,
  advertisementAll,
  advertisementResponseSchema,
};
