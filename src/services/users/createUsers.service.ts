import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User, Address } from "../../entities";
import { IUser, IUserReturn } from "../../interfaces/users.interfaces";
import { returnUserSchema } from "../../schemas/users.schemas";

const createUserService = async (userData: IUser): Promise<IUserReturn> => {
  const { address: addressData, ...rest } = userData;
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const user: User = userRepository.create(rest);
  await userRepository.save(user);

  const address2 = addressRepository.create({ ...addressData, user: user });
  await addressRepository.save(address2);
  const findUser = await userRepository.findOne({
    where: { id: user.id },
    relations: {
      address: true,
    },
  });
  const newUser: IUserReturn = returnUserSchema.parse(findUser);

  return newUser;
};

export default createUserService;
