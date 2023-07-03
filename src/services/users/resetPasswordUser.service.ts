import { hashSync } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";

const resetPasswordUserService = async (
  newPassword: string,
  resetToken: string
) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      resetToken: resetToken,
    },
  });

  if (!user) {
    throw new AppError("user not found", 404);
  }

  const newHashedPassword = hashSync(newPassword, 10);

  user.password = newHashedPassword;

  user.resetToken = null;

  await userRepository.save(user);
};

export default resetPasswordUserService;
