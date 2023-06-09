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
  is_active: z.boolean().optional().default(true),
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
    is_active: z.boolean().optional(),
  })
  .partial();

const advertisementReqSchema = advertisementSchema.omit({ id: true });

const advertisementByIdResponse = advertisementResponseSchema.extend({ user: returnUserAdSchema })

const updateAdvertisementSchema = advertisementSchema
  .omit({
    id: true,
  })
  .partial();

const advertisementAllSchema = advertisementResponseSchema
  .extend({ user: returnUserAdSchema })
  .partial()
  .array();

const advertisementStatus = z.object({
  is_active: z.boolean(),
});

export {
  advertisementSchema,
  advertisementReqSchema,
  advertisementAllSchema,
  advertisementResponseSchema,
  updateAdvertisementSchema,
  advertisementStatus,
   advertisementByIdResponse
};
