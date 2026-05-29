import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema({
  // Unique slug used in href="/portfolio/[id]"
  slug:    { type: String, required: true, unique: true },
  title:   { type: String, required: true },
  category: { type: String, required: true },   // e.g. "E-commerce . UI Design"

  // Short card description (shown on listing page overlay)
  desc:    { type: String, default: "" },
  // Long project overview (shown on detail page)
  details: { type: String, default: "" },
  // Technology/stack tags
  tech:    [{ type: String }],

  // Primary thumbnail (mirrors images[0] for backward compat)
  image:   { type: String, default: "/portfolio_screenshots.png" },
  // Multiple images — gallery shown on detail page
  images:  [{ type: String }],

  // Image position for CSS object-position
  imgPos:  { type: String, default: "object-center" },
  // External project link
  href:    { type: String, default: "#" },
  order:   { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Portfolio || mongoose.model("Portfolio", PortfolioSchema);
