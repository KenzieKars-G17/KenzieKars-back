// import { Repository } from "typeorm";
// import { AppDataSource } from "../../data-source";
// import { RealEstate } from "../../entities";
// import { listAllRealEstateNoCategoryType } from "../../interfaces/realEstate.interfaces";
// import { returnRealEstateNoCategory } from "../../schemas/realEstate.schemas";

// const listAllRealEstateService =
//   async (): Promise<listAllRealEstateNoCategoryType> => {
//     const realEstateRepository: Repository<RealEstate> =
//       AppDataSource.getRepository(RealEstate);
//     const findRealStates: Array<RealEstate> = await realEstateRepository.find({
//       relations: {
//         address: true,
//       },
//     });

//     const realEstateReturn: listAllRealEstateNoCategoryType =
//       returnRealEstateNoCategory.parse(findRealStates);

//     return realEstateReturn;
//   };

// export { listAllRealEstateService };
