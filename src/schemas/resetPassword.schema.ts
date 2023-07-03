import { z } from "zod";

const resetPasswordSchema = z.object({
  password: z.string().min(8),
});

export { resetPasswordSchema };
