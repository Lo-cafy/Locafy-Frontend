// middleware/upload.ts
import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

// Use memory storage for uploading files
const storage = multer.memoryStorage();

// File filter to allow only images
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};

// Initialize multer
const upload = multer({ storage, fileFilter });

export { upload };
