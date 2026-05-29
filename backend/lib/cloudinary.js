import { v2 as cloudinary } from "cloudinary";
import { siteConfig } from "@/app/config";

cloudinary.config({
  cloud_name: siteConfig.cloudinary.cloudName,
  api_key: siteConfig.cloudinary.apiKey,
  api_secret: siteConfig.cloudinary.apiSecret,
});

export default cloudinary;
