import { pool } from "../config/db";
import { ServicePhoto } from "../models/servicePhotoModel";
import { uploadToCloudinary, uploadToCloudinaryFromUrl } from "../utils/cloudinaryUploads";
import { deleteFromCloudinary } from "../utils/cloudinaryDelete";
import { AppError } from "../utils/appError";
import { withTransaction } from "../utils/withTransaction";

// Add multiple photos
export const addPhotosService = async (serviceId: number, files: Express.Multer.File[]): Promise<ServicePhoto[]> => {
  return withTransaction(async (client) => {
    const uploadedPhotos: ServicePhoto[] = [];

    for (const [index, file] of files.entries()) {
      const photoUrl = await uploadToCloudinary(file);

      const { rows } = await client.query(
        `INSERT INTO service_photos (service_id, photo_url) VALUES ($1, $2) RETURNING *`,
        [serviceId, photoUrl]
      );

      uploadedPhotos.push(rows[0]);
    }

    return uploadedPhotos;
  });
};

// Delete Photo
export const deletePhotoService = async (photoId: number): Promise<ServicePhoto> => {
  return withTransaction(async (client) => {
    const { rows } = await client.query(
      "SELECT * FROM service_photos WHERE photo_id = $1 AND deleted_at IS NULL",
      [photoId]
    );

    if (rows.length === 0) {
      throw new AppError("Photo not found", 404);
    }

    const photo = rows[0];
    await deleteFromCloudinary(photo.photo_url);

    const { rows: deletedRows } = await client.query(
      `UPDATE service_photos 
       SET deleted_at = CURRENT_TIMESTAMP 
       WHERE photo_id = $1 
       RETURNING *`,
      [photoId]
    );

    return deletedRows[0];
  });
};

// Get Photos by Service
export const getPhotosService = async (serviceId: number): Promise<ServicePhoto[]> => {
  const { rows } = await pool.query(
    `SELECT * FROM service_photos 
     WHERE service_id = $1 AND deleted_at IS NULL
     ORDER BY created_at DESC`,
    [serviceId]
  );
  return rows;
};

// Update Photo
export const updatePhotoService = async (photoId: number, newUrl: string): Promise<ServicePhoto> => {
  return withTransaction(async (client) => {
    const { rows } = await client.query(
      "SELECT * FROM service_photos WHERE photo_id = $1 AND deleted_at IS NULL",
      [photoId]
    );

    if (rows.length === 0) {
      throw new AppError("Photo not found", 404);
    }

    const currentPhoto = rows[0];
    const photoUrl = await uploadToCloudinaryFromUrl(newUrl);

    // Soft delete old photo
    await client.query(
      "UPDATE service_photos SET deleted_at = CURRENT_TIMESTAMP WHERE photo_id = $1",
      [photoId]
    );

    // Insert new photo
    const { rows: newRows } = await client.query(
      `INSERT INTO service_photos (service_id, photo_url)
       VALUES ($1, $2)
       RETURNING *`,
      [currentPhoto.service_id, photoUrl]
    );

    return newRows[0];
  });
};