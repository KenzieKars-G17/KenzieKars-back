import { z } from "zod";

const addressSchema = z.object({
  cep: z.string().min(3).max(45),
  city: z.string().max(45),
  state: z.string().max(2),
  street: z.string().max(45),
  number: z.string().max(45),
  complement: z.string().max(45).nullable().optional().default(null),
});

export { addressSchema };
