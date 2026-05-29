"use server";

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
    // Auto-generate slug if not provided
    const slug = data.slug || data.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const count = await Service.countDocuments();
    const service = await Service.create({
      category: data.category || "Development",
      slug,
      title: data.title,
      desc: data.desc,
      iconName: data.iconName || "code",
      order: count,
    });
    return { success: true, service: serializeService(service) };
  } catch (error) {
    console.error("addService error:", error);
    return { success: false, error: error.message };
  }
}

/** Update an existing service by _id */
export async function updateService(id, data) {
  try {
    await connect();
    const service = await Service.findByIdAndUpdate(
      id,
      {
        ...(data.category && { category: data.category }),
        ...(data.slug && { slug: data.slug }),
        ...(data.title && { title: data.title }),
        ...(data.desc !== undefined && { desc: data.desc }),
        ...(data.iconName && { iconName: data.iconName }),
        ...(data.order !== undefined && { order: data.order }),
      },
      { new: true }
    );
    if (!service) return { success: false, error: "Service not found" };
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
    return { success: true };
  } catch (error) {
    console.error("deleteService error:", error);
    return { success: false, error: error.message };
  }
}
