import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IUser, IUserReturn } from "../../interfaces/users.interfaces";
import { returnUserSchema } from "../../schemas/users.schemas";

const createUserService = async (userData: IUser): Promise<IUserReturn> => {
  const { name, email, admin, password } = userData;

  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  let newAdmin = admin;

  if (admin === null || admin === undefined) {
    newAdmin = false;
  }

  const user: User = userRepository.create({
    name,
    email,
    admin: newAdmin,
    password,
  });

  await userRepository.save(user);

  const newUser: IUserReturn = returnUserSchema.parse(user);

  return newUser;
};

export default createUserService;