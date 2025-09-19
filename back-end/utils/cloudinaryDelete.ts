import cloudinary from "../config/cloudinary";
import { AppError } from "./appError";

export const deleteFromCloudinary = async (imageUrl: string): Promise<void> => {
    try {
        const publicId = extractPublicIdFromUrl(imageUrl);
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error("Failed to delete image from Cloudinary:", error);
        // Don't throw error as we don't want to fail the whole operation
        // if Cloudinary deletion fails
    }
};

const extractPublicIdFromUrl = (url: string): string => {
    const matches = url.match(/\/upload\/.*\/([^\/]+)\./);
    if (!matches || matches.length < 2) {
        throw new AppError("Invalid Cloudinary URL", 400);
    }
    return `locafy/services/${matches[1]}`;
};