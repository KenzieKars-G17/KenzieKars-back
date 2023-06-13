import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Image } from "../../entities";

const deleteImageService = async (imageId: number): Promise<void> => {
  const imageRepostitory: Repository<Image> =
    AppDataSource.getRepository(Image);

  const image: Image | null = await imageRepostitory.findOne({
    where: {
      id: imageId,
    },
  });
  if (!image) {
    throw new AppError("Image does not exists", 404);
  }

  await imageRepostitory.remove(image);
};

export default deleteImageService;
