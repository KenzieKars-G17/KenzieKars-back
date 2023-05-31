import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(3).max(45),
  email: z.string().email().max(45),
  admin: z.boolean().optional().default(false),
  password: z.string().min(4).max(120),
});

const returnUserSchema = userSchema
  .extend({
    id: z.number(),
    admin: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
  })
  .omit({ password: true });

const arrayUserSchema = returnUserSchema.array();

const userUpdateSchema = z
  .object({
    name: z.string().min(3).max(45),
    email: z.string().email().max(45),
    password: z.string().min(4).max(120),
  })
  .partial();

export { userSchema, returnUserSchema, arrayUserSchema, userUpdateSchema }