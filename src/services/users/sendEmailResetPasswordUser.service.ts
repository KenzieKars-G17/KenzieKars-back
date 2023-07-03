import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { randomUUID } from "node:crypto";
import { emailService } from "../../utils/sendEmail.utils";

const sendEmailResetPasswordUserService = async (userEmail: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    email: userEmail,
  });

  if (!user) {
    throw new AppError("user not found", 404);
  }

  const token = randomUUID();

  user.resetToken = token;

  await userRepository.save(user);

  const resetPasswordTemplate = emailService.resetPasswordTemplate(
    user.name,
    userEmail,
    token
  );

  await emailService.sendEmail(resetPasswordTemplate);
};

export default sendEmailResetPasswordUserService;
