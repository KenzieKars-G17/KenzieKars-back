import { z } from "zod";
import { createLoginSchema } from "../schemas/login.schemas";

type ILogin = z.infer<typeof createLoginSchema>;

interface IJwtPayload {
  expiresIn: string;
  subject: string;
}

export { ILogin, IJwtPayload };