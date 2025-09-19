import { Request, Response } from "express";
import {addPhotosService,deletePhotoService,getPhotosService,updatePhotoService} from "../services/servicePhotoServices";
import { asyncHandler } from "../middleware/asyncHandler";
import { AppError } from "../utils/appError";

// Add photos controller
export const addPhoto = asyncHandler(async (req: Request, res: Response) => {
  const { serviceId } = req.body;
  const files = req.files as Express.Multer.File[];

  if (!serviceId || !files || files.length === 0) {
    throw new AppError("Service ID and at least one file required", 400);
  }

  const uploadedPhotos = await addPhotosService(Number(serviceId), files);
  res.status(201).json({
    success: true,
    message: "Photos uploaded successfully",
    data: uploadedPhotos
  });
});

// Delete photo
export const deletePhoto = asyncHandler(async (req: Request, res: Response) => {
  const photoId = parseInt(req.params.photoId);
  const deletedPhoto = await deletePhotoService(photoId);

  res.json({
    success: true,
    message: "Photo deleted successfully",
    data: deletedPhoto
  });
});

// Get photos by service
export const getServicePhotos = asyncHandler(async (req: Request, res: Response) => {
  const serviceId = parseInt(req.query.serviceId as string);

  if (!serviceId) {
    throw new AppError("Service ID required", 400);
  }

  const photos = await getPhotosService(serviceId);
  res.json({
    success: true,
    data: { photos }
  });
});

// Update photo
export const updatePhoto = asyncHandler(async (req: Request, res: Response) => {
  const photoId = parseInt(req.params.photoId);
  const { photoUrl } = req.body;

  if (!photoUrl) {
    throw new AppError("New photo URL required", 400);
  }

  const updatedPhoto = await updatePhotoService(photoId, photoUrl);
  res.json({
    success: true,
    message: "Photo updated successfully",
    data: updatedPhoto
  });
});