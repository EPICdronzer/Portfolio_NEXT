"use server";

import { revalidatePath } from "next/cache";
import connect from "@/backend/dbconfig/config";
import Portfolio from "@/backend/models/portfolio";

function serializePortfolio(doc) {
  const obj = doc.toObject ? doc.toObject() : doc;
  obj._id = obj._id.toString();
  return obj;
}

/** Get all portfolio projects sorted by order */
export async function getPortfolios() {
  try {
    await connect();
    const portfolios = await Portfolio.find().sort({ order: 1, createdAt: 1 });
    return { success: true, portfolios: portfolios.map(serializePortfolio) };
  } catch (error) {
    console.error("getPortfolios error:", error);
    return { success: false, error: error.message };
  }
}

/** Add a new portfolio project */
export async function addPortfolio(data) {
  try {
    await connect();
    const slug = data.slug || data.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const count = await Portfolio.countDocuments();

    // Normalise images array
    const images = Array.isArray(data.images) ? data.images.filter(Boolean) : [];
    // Keep single `image` field synced to images[0] for backward compat
    const image = images[0] || data.image || "/portfolio_screenshots.png";

    // Normalise tech array
    const tech = Array.isArray(data.tech)
      ? data.tech.filter(Boolean)
      : typeof data.tech === "string" && data.tech.trim()
        ? data.tech.split(",").map(t => t.trim()).filter(Boolean)
        : [];

    const portfolio = await Portfolio.create({
      slug,
      title:   data.title,
      category: data.category,
      desc:    data.desc    || "",
      details: data.details || "",
      tech,
      image,
      images,
      imgPos:  data.imgPos  || "object-center",
      href:    data.href    || "#",
      order:   count,
    });
    
    // Clear cache on Vercel
    revalidatePath("/portfolio");
    revalidatePath("/admin/settings");
    
    return { success: true, portfolio: serializePortfolio(portfolio) };
  } catch (error) {
    console.error("addPortfolio error:", error);
    return { success: false, error: error.message };
  }
}

/** Update an existing portfolio project by _id
 *  imageMode: 'replace' → overwrite images array
 *  imageMode: 'append'  → push new images onto existing array
 */
export async function updatePortfolio(id, data) {
  try {
    await connect();

    const tech = Array.isArray(data.tech)
      ? data.tech.filter(Boolean)
      : typeof data.tech === "string" && data.tech.trim()
        ? data.tech.split(",").map(t => t.trim()).filter(Boolean)
        : undefined;

    let updateDoc = {
      ...(data.slug     !== undefined && { slug:     data.slug }),
      ...(data.title    !== undefined && { title:    data.title }),
      ...(data.category !== undefined && { category: data.category }),
      ...(data.desc     !== undefined && { desc:     data.desc }),
      ...(data.details  !== undefined && { details:  data.details }),
      ...(tech          !== undefined && { tech }),
      ...(data.imgPos   !== undefined && { imgPos:   data.imgPos }),
      ...(data.href     !== undefined && { href:     data.href }),
      ...(data.order    !== undefined && { order:    data.order }),
    };

    const newImages = Array.isArray(data.images) ? data.images.filter(Boolean) : [];

    if (data.imageMode === "append") {
      if (newImages.length > 0) {
        // Push new images to existing array
        const existing = await Portfolio.findById(id).select("images image");
        const merged = [...(existing?.images || []), ...newImages];
        updateDoc.images = merged;
        updateDoc.image  = merged[0] || existing?.image || "/portfolio_screenshots.png";
      }
    } else {
      // Replace
      updateDoc.images = newImages;
      updateDoc.image  = newImages[0] || "/portfolio_screenshots.png";
    }

    const portfolio = await Portfolio.findByIdAndUpdate(id, updateDoc, { new: true });
    if (!portfolio) return { success: false, error: "Portfolio not found" };
    
    // Clear cache on Vercel
    revalidatePath("/portfolio");
    revalidatePath("/admin/settings");
    
    return { success: true, portfolio: serializePortfolio(portfolio) };
  } catch (error) {
    console.error("updatePortfolio error:", error);
    return { success: false, error: error.message };
  }
}

/** Delete a portfolio project by _id */
export async function deletePortfolio(id) {
  try {
    await connect();
    await Portfolio.findByIdAndDelete(id);
    
    // Clear cache on Vercel
    revalidatePath("/portfolio");
    revalidatePath("/admin/settings");
    
    return { success: true };
  } catch (error) {
    console.error("deletePortfolio error:", error);
    return { success: false, error: error.message };
  }
}

/** Get a portfolio project by slug or _id */
export async function getPortfolioBySlugOrId(slugOrId) {
  try {
    await connect();
    let portfolio = await Portfolio.findOne({ slug: slugOrId });
    if (!portfolio && slugOrId.match(/^[0-9a-fA-F]{24}$/)) {
      portfolio = await Portfolio.findById(slugOrId);
    }
    if (!portfolio) return { success: false, error: "Portfolio not found" };
    return { success: true, portfolio: serializePortfolio(portfolio) };
  } catch (error) {
    console.error("getPortfolioBySlugOrId error:", error);
    return { success: false, error: error.message };
  }
}
