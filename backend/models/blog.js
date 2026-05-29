import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  // Unique slug used in href="/blog/[id]"
  slug:    { type: String, required: true, unique: true },
  title:   { type: String, required: true },
  // Date displayed on the card, e.g. "January 02, 2025"
  date:    { type: String, required: true },
  // Cloudinary image URL
  image:   { type: String, default: "/blog_thumbnails.png" },
  // Image position for CSS object-position
  imgPos:  { type: String, default: "object-center" },
  // Full blog content (Markdown or plain text)
  content: { type: String, default: "" },
  order:   { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
