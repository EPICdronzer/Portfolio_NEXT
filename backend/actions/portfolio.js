"use server";

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
    const portfolio = await Portfolio.create({
      slug,
      title: data.title,
      category: data.category,
      image: data.image || "/portfolio_screenshots.png",
      imgPos: data.imgPos || "object-center",
      href: data.href || "#",
      order: count,
    });
    return { success: true, portfolio: serializePortfolio(portfolio) };
  } catch (error) {
    console.error("addPortfolio error:", error);
    return { success: false, error: error.message };
  }
}

/** Update an existing portfolio project by _id */
export async function updatePortfolio(id, data) {
  try {
    await connect();
    const portfolio = await Portfolio.findByIdAndUpdate(
      id,
      {
        ...(data.slug && { slug: data.slug }),
        ...(data.title && { title: data.title }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.image !== undefined && { image: data.image }),
        ...(data.imgPos !== undefined && { imgPos: data.imgPos }),
        ...(data.href !== undefined && { href: data.href }),
        ...(data.order !== undefined && { order: data.order }),
      },
      { new: true }
    );
    if (!portfolio) return { success: false, error: "Portfolio not found" };
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
    return { success: true };
  } catch (error) {
    console.error("deletePortfolio error:", error);
    return { success: false, error: error.message };
  }
}
