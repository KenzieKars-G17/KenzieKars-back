import { z } from "zod";
import { addressSchema } from "./address.schema";

const userSchema = z
  .object({
    name: z.string().min(3).max(45),
    email: z.string().email().max(45),
    cpf: z.string().max(11),
    phone: z.string().max(9),
    birthdate: z.string().max(10),
    description: z.string().nullable().default(null),
    seller: z.boolean().optional().default(false),
    password: z.string().min(4).max(120),
  })
  .extend({
    address: addressSchema,
  });

const returnUserSchema = userSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
  })
  .partial()
  .omit({ password: true });

const returnUserAdSchema = z
  .object({
    name: z.string().min(3).max(45),
  })
  .partial();

const arrayUserSchema = returnUserSchema.array();

const userUpdateSchema = z
  .object({
    name: z.string().min(3).max(45).optional(),
    email: z.string().email().max(45).optional(),
    password: z.string().min(4).max(120).optional(),
    phone: z.string().max(9).optional(),
    birthdate: z.string().max(10).optional(),
    description: z.string().optional(),
  })
  .partial();

export {
  userSchema,
  returnUserSchema,
  arrayUserSchema,
  userUpdateSchema,
  returnUserAdSchema,
};
