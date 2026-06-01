import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  slug:     { type: String, required: true, unique: true },
  title:    { type: String, required: true },
  date:     { type: String, default: "" },
  category: { type: String, default: "Development" },
  author:   { type: String, default: "Harsh Vashishth" },
  readTime: { type: String, default: "4 min read" },

  // Primary banner image (backward compat)
  image:   { type: String, default: "/blog_thumbnails.png" },
  imgPos:  { type: String, default: "object-center" },
  // Additional inline images
  images:  [{ type: String }],

  content:     { type: String, default: "" },
  // Optional code snippet displayed on the blog detail page
  codeSnippet: { type: String, default: "" },
  order:   { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
