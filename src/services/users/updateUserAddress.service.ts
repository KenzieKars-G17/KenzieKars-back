import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address } from "../../entities";
import {
  IAddressUpdate,
  IAddressResponse,
} from "../../interfaces/address.interface";
import { addressSchema } from "../../schemas/address.schema";

const updateUserAddressService = async (
  newAddressData: IAddressUpdate,
  idUser: number
): Promise<IAddressResponse> => {
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const oldUserData: Address | null = await addressRepository.findOneBy({
    id: idUser,
  });

  const address: Address = addressRepository.create({
    ...oldUserData,
    ...newAddressData,
  });

  await addressRepository.save(address);

  const updatedAddress: IAddressResponse = addressSchema.parse(address);

  return updatedAddress;
};

export default updateUserAddressService;
