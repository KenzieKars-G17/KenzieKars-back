import { Request, Response } from "express";
import { createAdvertisementService } from "../services/advertisements/createAdvertisements.service";

const createAdvertisementController = async (req: Request, res: Response): Promise<Response>  => {
    const userId: number = req.user.sub
    const newAdvertisement = await createAdvertisementService(req.body, userId);
  
    return res.status(201).json(newAdvertisement);
  };


export {createAdvertisementController}