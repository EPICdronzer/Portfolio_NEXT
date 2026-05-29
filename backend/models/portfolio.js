import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema({
  // Unique slug used in href="/portfolio/[id]"
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },   // e.g. "E-commerce . UI Design"
  // Cloudinary image URL
  image: { type: String, default: "/portfolio_screenshots.png" },
  // Image position for CSS object-position
  imgPos: { type: String, default: "object-center" },
  // External project link
  href: { type: String, default: "#" },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Portfolio || mongoose.model("Portfolio", PortfolioSchema);
