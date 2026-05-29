"use server";

import cloudinary from "@/backend/lib/cloudinary";

/**
 * Uploads a base64 image string to Cloudinary and returns the secure URL.
 * @param {string} base64Image - Base64 encoded image string (e.g. data:image/png;base64,...)
 */
export async function uploadToCloudinary(base64Image) {
  try {
    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      folder: "portfolio_uploads",
    });
    return { success: true, url: uploadResult.secure_url };
  } catch (error) {
    console.error("Cloudinary Server Action Upload Error:", error);
    return { success: false, error: error.message };
  }
}
