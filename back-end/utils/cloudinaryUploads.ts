import cloudinary from "../config/cloudinary";
import { AppError } from "./appError";

export const uploadToCloudinary = (file: Express.Multer.File, folder = "locafy/services"): Promise<string> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                transformation: [
                    { width: 1200, height: 800, crop: "limit", quality: "auto" }
                ]
            },
            (error, result) => {
                if (error || !result) {
                    reject(new AppError("Cloudinary upload failed", 500));
                } else {
                    resolve(result.secure_url);
                }
            }
        );

        stream.end(file.buffer);
    });
};

export const uploadToCloudinaryFromUrl = (url: string, folder = "locafy/services"): Promise<string> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            url,
            {
                folder,
                transformation: [
                    { width: 1200, height: 800, crop: "limit", quality: "auto" }
                ]
            },
            (error, result) => {
                if (error || !result) {
                    reject(new AppError("Cloudinary upload from URL failed", 500));
                } else {
                    resolve(result.secure_url);
                }
            }
        );
    });
};