"use server";

import { revalidatePath } from "next/cache";
import connect from "@/backend/dbconfig/config";
import Service from "@/backend/models/service";

function serializeService(doc) {
  const obj = doc.toObject ? doc.toObject() : doc;
  obj._id = obj._id.toString();
  return obj;
}

/** Get all services sorted by order */
export async function getServices() {
  try {
    await connect();
    const services = await Service.find().sort({ order: 1, createdAt: 1 });
    return { success: true, services: services.map(serializeService) };
  } catch (error) {
    console.error("getServices error:", error);
    return { success: false, error: error.message };
  }
}

/** Add a new service */
export async function addService(data) {
  try {
    await connect();
    const slug = data.slug || data.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const count = await Service.countDocuments();

    const images = Array.isArray(data.images) ? data.images.filter(Boolean) : [];
    const image  = images[0] || data.image || "";

    const service = await Service.create({
      category: data.category || "Development",
      slug,
      title:    data.title,
      desc:     data.desc,
      iconName: data.iconName || "code",
      image,
      images,
      order:    count,
    });
    
    // Clear cache on Vercel so new data appears immediately
    revalidatePath("/service");
    revalidatePath("/admin/settings");
    
    return { success: true, service: serializeService(service) };
  } catch (error) {
    console.error("addService error:", error);
    return { success: false, error: error.message };
  }
}

/** Update an existing service by _id
 *  imageMode: 'replace' → overwrite images
 *  imageMode: 'append'  → push new images onto existing
 */
export async function updateService(id, data) {
  try {
    await connect();

    let updateDoc = {
      ...(data.category !== undefined && { category: data.category }),
      ...(data.slug     !== undefined && { slug:     data.slug }),
      ...(data.title    !== undefined && { title:    data.title }),
      ...(data.desc     !== undefined && { desc:     data.desc }),
      ...(data.iconName !== undefined && { iconName: data.iconName }),
      ...(data.order    !== undefined && { order:    data.order }),
    };

    const newImages = Array.isArray(data.images) ? data.images.filter(Boolean) : [];

    if (data.imageMode === "append" && newImages.length > 0) {
      const existing = await Service.findById(id).select("images image");
      const merged = [...(existing?.images || []), ...newImages];
      updateDoc.images = merged;
      updateDoc.image  = merged[0] || existing?.image || "";
    } else if (newImages.length > 0) {
      updateDoc.images = newImages;
      updateDoc.image  = newImages[0];
    }

    const service = await Service.findByIdAndUpdate(id, updateDoc, { new: true });
    if (!service) return { success: false, error: "Service not found" };
    
    // Clear cache on Vercel so updated data appears immediately
    revalidatePath("/service");
    revalidatePath("/admin/settings");
    
    return { success: true, service: serializeService(service) };
  } catch (error) {
    console.error("updateService error:", error);
    return { success: false, error: error.message };
  }
}

/** Delete a service by _id */
export async function deleteService(id) {
  try {
    await connect();
    await Service.findByIdAndDelete(id);
    
    // Clear cache on Vercel so deletion appears immediately
    revalidatePath("/service");
    revalidatePath("/admin/settings");
    
    return { success: true };
  } catch (error) {
    console.error("deleteService error:", error);
    return { success: false, error: error.message };
  }
}

/** Get a service by slug or _id */
export async function getServiceBySlugOrId(slugOrId) {
  try {
    await connect();
    let service = await Service.findOne({ slug: slugOrId });
    if (!service && slugOrId.match(/^[0-9a-fA-F]{24}$/)) {
      service = await Service.findById(slugOrId);
    }
    if (!service) return { success: false, error: "Service not found" };
    return { success: true, service: serializeService(service) };
  } catch (error) {
    console.error("getServiceBySlugOrId error:", error);
    return { success: false, error: error.message };
  }
}
