import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || "default_cloud_name",
  api_key: process.env.CLOUDINARY_API_KEY || "default_api_key",
  api_secret: process.env.CLOUDINARY_SECRET_KEY || "default_secret_key",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (err) {
    fs.unlinkSync(localFilePath);
    console.log("cloudinary upload error ", err);
    return null;
  }
};

export { uploadOnCloudinary };
